import type { ComponentPropsWithoutRef } from 'react'

export function Section({
  className = '',
  ...props
}: ComponentPropsWithoutRef<'section'>) {
  return <section className={`py-14 sm:py-20 ${className}`} {...props} />
}
