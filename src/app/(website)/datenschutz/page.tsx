import {
  generateLegalMetadata,
  LegalPageView,
} from '@/components/pages/legal-page'

export function generateMetadata() {
  return generateLegalMetadata(
    'legalPage.datenschutz',
    'Datenschutz',
    '/datenschutz',
  )
}

export default function PrivacyPage() {
  return (
    <LegalPageView id="legalPage.datenschutz" fallbackTitle="Datenschutz" />
  )
}
