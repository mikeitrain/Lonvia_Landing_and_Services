export type TranslateFn = (key: string) => string;

function capitalizeFirstLetter(input: string): string {
  if (!input) return '';
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

/**
 * Translate a backend document type into a localized label using i18n.
 * Known types: offer, invoice. Falls back to a humanized value.
 */
export function translateDocumentType(docType: string | undefined | null, t: TranslateFn): string {
  if (!docType) return '';
  const normalized = String(docType).trim().toLowerCase();
  switch (normalized) {
    case 'offer':
      return t('documents.offer') || 'Offer';
    case 'invoice':
      return t('documents.invoice') || 'Invoice';
    default:
      return capitalizeFirstLetter(normalized);
  }
}


