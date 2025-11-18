  // Document interface based on DocumentModel
  export interface Document {
    id?: number;
    doc_type: string;
    doc_no: string;
  }
  
  // DocumentList interface based on DocumentListModel
  export type DocumentList = Document[];