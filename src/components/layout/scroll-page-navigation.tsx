'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

import {
  adjacentPage,
  atPageEdge,
  ScrollGesture,
  type ScrollDirection,
} from '@/lib/scroll-navigation'

type PendingNavigation = {
  href: string
  direction: ScrollDirection
  resolve: () => void
}

export function ScrollPageNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const pending = useRef<PendingNavigation | null>(null)
  const lockedUntil = useRef(0)
  const gesture = useRef(new ScrollGesture())

  useEffect(() => {
    const navigation = pending.current
    if (navigation) {
      if (navigation.href === pathname) {
        // Let Next finish committing the route and restoring scroll before
        // capturing the new page. Timers work while View Transitions pause frames.
        window.setTimeout(function settle() {
          if (pending.current !== navigation) return
          const main = document.getElementById('hauptinhalt')
          const loading = main?.querySelector('[aria-busy="true"]')
          if (loading?.getClientRects().length) {
            window.setTimeout(settle, 16)
            return
          }
          window.scrollTo({
            top:
              navigation.direction === 1
                ? 0
                : document.documentElement.scrollHeight,
            behavior: 'instant',
          })
          main?.focus({ preventScroll: true })
          pending.current = null
          lockedUntil.current = performance.now() + 800
          navigation.resolve()
        }, 32)
      } else {
        pending.current = null
        navigation.resolve()
      }
    }

    const next = adjacentPage(pathname, 1)
    const previous = adjacentPage(pathname, -1)
    if (!next && !previous) return
    if (next) router.prefetch(next)
    if (previous) router.prefetch(previous)

    function isEdge(direction: ScrollDirection) {
      return atPageEdge(
        direction,
        window.scrollY,
        document.documentElement.scrollHeight,
        window.innerHeight,
      )
    }

    function isProtected(target: EventTarget | null) {
      if (document.querySelector('dialog[open], header details[open]'))
        return true
      if (!(target instanceof Element)) return false
      if (
        target.closest(
          'a, button, input, textarea, select, summary, [contenteditable="true"], [role="dialog"]',
        )
      )
        return true
      // Leave nested scrollable controls and panels to their own scroll behavior.
      for (
        let element: Element | null = target;
        element && element !== document.body;
        element = element.parentElement
      ) {
        if (
          /(auto|scroll)/.test(getComputedStyle(element).overflowY) &&
          element.scrollHeight > element.clientHeight + 3
        )
          return true
      }
      return false
    }

    function navigate(direction: ScrollDirection) {
      const href = adjacentPage(pathname, direction)
      if (!href || pending.current || performance.now() < lockedUntil.current)
        return
      lockedUntil.current = performance.now() + 1200
      const root = document.documentElement
      const update = () =>
        new Promise<void>((resolve) => {
          // Never leave the browser waiting indefinitely if a route fails to load.
          const timeout = window.setTimeout(() => {
            pending.current = null
            resolve()
          }, 5000)
          pending.current = {
            href,
            direction,
            resolve: () => {
              window.clearTimeout(timeout)
              resolve()
            },
          }
          router.push(href, { scroll: false })
        })
      if (
        document.startViewTransition &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        root.dataset.scrollDirection = direction === 1 ? 'next' : 'previous'
        const transition = document.startViewTransition(update)
        void transition.finished
          .catch(() => {})
          .finally(() => {
            delete root.dataset.scrollDirection
          })
      } else {
        void update().then(() => {
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
            return
          root.dataset.scrollDirection = direction === 1 ? 'next' : 'previous'
          const animation = document.querySelector('.site-shell')?.animate(
            [
              {
                transform: `translateX(${direction * window.innerWidth}px)`,
              },
              { transform: 'translateX(0)' },
            ],
            { duration: 560, easing: 'cubic-bezier(0.65, 0, 0.35, 1)' },
          )
          void Promise.resolve(animation?.finished)
            .catch(() => {})
            .finally(() => {
              delete root.dataset.scrollDirection
            })
        })
      }
    }

    function wheel(event: WheelEvent) {
      if (
        event.ctrlKey ||
        Math.abs(event.deltaX) >= Math.abs(event.deltaY) ||
        isProtected(event.target)
      )
        return
      const direction: ScrollDirection = event.deltaY > 0 ? 1 : -1
      const edge = isEdge(direction)
      const locked =
        !!pending.current || performance.now() < lockedUntil.current
      const delta =
        event.deltaY *
        (event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? window.innerHeight
            : 1)
      const shouldNavigate = gesture.current.update(
        delta,
        performance.now(),
        edge,
        locked,
      )
      if (locked || (edge && adjacentPage(pathname, direction)))
        event.preventDefault()
      if (shouldNavigate) navigate(direction)
    }

    let touch: { x: number; y: number; top: boolean; bottom: boolean } | null =
      null
    function touchStart(event: TouchEvent) {
      touch = null
      if (
        event.touches.length !== 1 ||
        isProtected(event.target) ||
        pending.current ||
        performance.now() < lockedUntil.current
      )
        return
      touch = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
        top: isEdge(-1),
        bottom: isEdge(1),
      }
    }
    function touchMove(event: TouchEvent) {
      if (!touch || event.touches.length !== 1) {
        touch = null
        return
      }
      const delta = touch.y - event.touches[0].clientY
      const direction = delta > 0 ? 1 : -1
      if (
        Math.abs(delta) > Math.abs(touch.x - event.touches[0].clientX) &&
        (direction === 1 ? touch.bottom : touch.top) &&
        adjacentPage(pathname, direction)
      )
        event.preventDefault()
    }
    function touchEnd(event: TouchEvent) {
      const start = touch
      touch = null
      if (!start || !event.changedTouches.length) return
      const delta = start.y - event.changedTouches[0].clientY
      const direction = delta > 0 ? 1 : -1
      if (
        Math.abs(delta) >= 70 &&
        Math.abs(delta) > Math.abs(start.x - event.changedTouches[0].clientX) &&
        (direction === 1 ? start.bottom : start.top) &&
        isEdge(direction)
      )
        navigate(direction)
    }
    function touchCancel() {
      touch = null
    }
    function keyDown(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.metaKey ||
        event.ctrlKey ||
        isProtected(event.target)
      )
        return
      const direction =
        event.key === 'PageDown' || (event.key === ' ' && !event.shiftKey)
          ? 1
          : event.key === 'PageUp' || (event.key === ' ' && event.shiftKey)
            ? -1
            : null
      if (direction && isEdge(direction) && adjacentPage(pathname, direction)) {
        event.preventDefault()
        if (!event.repeat) navigate(direction)
      }
    }

    window.addEventListener('wheel', wheel, { passive: false })
    window.addEventListener('touchstart', touchStart, { passive: true })
    window.addEventListener('touchmove', touchMove, { passive: false })
    window.addEventListener('touchend', touchEnd)
    window.addEventListener('touchcancel', touchCancel)
    window.addEventListener('keydown', keyDown)
    return () => {
      window.removeEventListener('wheel', wheel)
      window.removeEventListener('touchstart', touchStart)
      window.removeEventListener('touchmove', touchMove)
      window.removeEventListener('touchend', touchEnd)
      window.removeEventListener('touchcancel', touchCancel)
      window.removeEventListener('keydown', keyDown)
    }
  }, [pathname, router])

  return null
}
