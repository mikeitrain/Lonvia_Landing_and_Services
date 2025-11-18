// AttachmentType interface based on AttachmentTypeModel
export interface AttachmentType {
  id?: number;
  name: string;
}

// Attachment interface based on AttachmentModel
export interface Attachment {
  id?: number;
  originalName?: string | null;
  description?: string | null;
  bucketName?: string | null;
  bucketKey?: string | null;
  url?: string | null;
  is_diagnosis?: boolean;
  type: AttachmentType;
  createdAt?: string;
  updatedAt?: string;
}

export type AttachmentId = number;

// AttachmentList interface based on AttachmentListModel
export type AttachmentList = Attachment[];