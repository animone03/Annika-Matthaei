import type { StructureResolver } from 'sanity/structure'

function singletonItem(
  S: Parameters<StructureResolver>[0],
  title: string,
  schemaType: string,
  documentId = schemaType,
) {
  return S.listItem()
    .id(documentId.replace('.', '-'))
    .title(title)
    .child(
      S.document().schemaType(schemaType).documentId(documentId).title(title),
    )
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website')
    .items([
      singletonItem(S, 'Startseite', 'homePage'),
      singletonItem(S, 'Über mich', 'aboutPage'),
      singletonItem(S, 'Kontakt', 'contactPage'),
      S.divider(),
      S.documentTypeListItem('project').title('Projekte'),
      S.documentTypeListItem('post').title('Blog'),
      S.divider(),
      S.listItem()
        .title('Rechtliches')
        .child(
          S.list()
            .title('Rechtliches')
            .items([
              singletonItem(S, 'Impressum', 'legalPage', 'legalPage.impressum'),
              singletonItem(
                S,
                'Datenschutz',
                'legalPage',
                'legalPage.datenschutz',
              ),
            ]),
        ),
      S.divider(),
      singletonItem(S, 'Website-Einstellungen', 'siteSettings'),
    ])
