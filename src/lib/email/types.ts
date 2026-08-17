export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface EmailTransport {
  send(msg: EmailMessage): Promise<{ success: boolean; messageId?: string }>;
}

export interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface QuoteEmailData {
  serviceType: string;
  serviceLabel: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  location: string;
  volume: string;
  deliveryDate: string;
  message: string;
  reference: string;
  timestamp: string;
}

export interface ConfirmationData {
  name: string;
  email: string;
}
