// Frontend helper to map filenames/URLs to backend attachment type names

export type AttachmentTypeName =
  | 'PNG'
  | 'JPG'
  | 'JPEG'
  | 'DICOM'
  | 'NIfTI-1 / NIfTI-2'
  | 'Analyze 7.5'
  | 'Aperio SVS'
  | 'Zeiss CZI'
  | 'Zeiss LSM'
  | 'EDF / EDF+'
  | 'WFDB (PhysioNet)'
  | 'PDF'
  | 'Link';

interface AttachmentTypeSpec {
  name: AttachmentTypeName;
  extensions: string[]; // lowercased, include dot (e.g., .pdf)
  patterns?: RegExp[]; // for matching URLs/links
}

const ATTACHMENT_TYPES: AttachmentTypeSpec[] = [
  { name: 'PNG', extensions: ['.png'] },
  { name: 'JPG', extensions: ['.jpg'] },
  { name: 'JPEG', extensions: ['.jpeg'] },
  { name: 'DICOM', extensions: ['.dcm', '.dicom', '.dic', '.ima', '.acr', '.dc3'] },
  { name: 'NIfTI-1 / NIfTI-2', extensions: ['.nii', '.nii.gz'] },
  { name: 'Analyze 7.5', extensions: ['.hdr', '.img'] },
  { name: 'Aperio SVS', extensions: ['.svs'] },
  { name: 'Zeiss CZI', extensions: ['.czi'] },
  { name: 'Zeiss LSM', extensions: ['.lsm'] },
  { name: 'EDF / EDF+', extensions: ['.edf'] },
  { name: 'WFDB (PhysioNet)', extensions: ['.dat', '.hea'] },
  { name: 'PDF', extensions: ['.pdf'] },
  {
    name: 'Link',
    extensions: ['.url'],
    patterns: [
      /^https?:\/\/.+/i,
      /^ftp:\/\/.+/i,
      /^sftp:\/\/.+/i,
      /^file:\/\/.+/i,
      /^mailto:.+/i,
      /^tel:.+/i,
      /^www\..+/i,
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}/i,
    ],
  },
];

/**
 * Returns the attachment type name for a given filename or URL, or null if unsupported.
 */
export function getAttachmentTypeNameForFilename(input: string): AttachmentTypeName | null {
  if (!input) return null;
  const lower = input.toLowerCase();

  // Special-case multi-part extensions like .nii.gz first
  if (lower.endsWith('.nii.gz')) return 'NIfTI-1 / NIfTI-2';

  // Exact extension match (with dot)
  for (const type of ATTACHMENT_TYPES) {
    for (const ext of type.extensions) {
      if (lower.endsWith(ext)) {
        return type.name;
      }
    }
  }

  // If input is just the extension (with or without dot)
  const normalizedExt = lower.startsWith('.') ? lower : `.${lower}`;
  for (const type of ATTACHMENT_TYPES) {
    if (type.extensions.includes(normalizedExt)) {
      return type.name;
    }
  }

  // Pattern-based matching (links)
  for (const type of ATTACHMENT_TYPES) {
    if (type.patterns && type.patterns.some((re) => re.test(input))) {
      return type.name;
    }
  }

  return null;
}

/** Returns true if the given filename looks like a supported file upload (non-link). */
export function isSupportedFileByExtension(filename: string): boolean {
  const type = getAttachmentTypeNameForFilename(filename);
  return type !== null && type !== 'Link';
}

/** Builds an accept attribute string for HTML file inputs from all supported extensions. */
export function buildAcceptStringForAllFiles(): string {
  // Include multi-part .nii.gz explicitly
  const unique = new Set<string>(['.nii.gz']);
  for (const spec of ATTACHMENT_TYPES) {
    for (const ext of spec.extensions) {
      unique.add(ext);
    }
  }
  // Exclude Link's .url
  unique.delete('.url');
  return Array.from(unique).join(',');
}

/** Minimal accept string for QR-image uploads. */
export function buildAcceptStringForQrImages(): string {
  return ['.png', '.jpg', '.jpeg', '.svg'].join(',');
}

export const AttachmentTypeSpecs = ATTACHMENT_TYPES;


