import {
  generateLegalMetadata,
  LegalPageView,
} from '@/components/pages/legal-page'

export function generateMetadata() {
  return generateLegalMetadata('legalPage.impressum', 'Impressum', '/impressum')
}

export default function ImprintPage() {
  return <LegalPageView id="legalPage.impressum" fallbackTitle="Impressum" />
}
