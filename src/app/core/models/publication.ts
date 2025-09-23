export type PublicationType = 'TEXT' | 'MEDIA' | 'PODCAST';
export type MediaType = 'IMAGE' | 'VIDEO' | 'AUDIO';
export type PublicationStatus = 'DRAFT' | 'PUBLISHED' | 'SUSPENDED';

export interface Attachment {
  id: string;
  name: string;
  url: string;
  extension: 'pdf'|'pptx'|'mp4'|'mp3'|'webp'|'png';
  mediaType: MediaType;
  bytes: number;
  folder?: string;
  createdAt?: string; // ISO
}

export interface Publication {
  id: string;
  publicationDate: string; // ISO
  publicationContent: string;
  status: PublicationStatus;
  publicationType: PublicationType;
  author?: any;
  attachment?: Attachment | null;
}
