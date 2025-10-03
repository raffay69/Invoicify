export interface Company {
  name: string;
  logo?: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

export interface Customer {
  name: string;
  company: string;
  address: string;
  email: string;
  phone: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PaymentInfo {
  bankDetails: string;
  terms: string;
}

export interface InvoiceData {
  company: Company;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  customer: Customer;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountRate: number;
  discountAmount: number;
  grandTotal: number;
  paymentInfo: PaymentInfo;
}
