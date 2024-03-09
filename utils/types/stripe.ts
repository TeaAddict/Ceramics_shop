export type LineItem =
  | {
      amount_discount: number;
      amount_tax: number;
      amount_subtotal: number;
      amount_total: number;
      quantity: number | null;
      description: string;
      price: {
        product: { metadata: { itemId: string } };
        unit_amount: number;
      } | null;
    }
  | undefined;

export type SoldItem = {
  amountDiscount: number;
  amountTax: number;
  amountSubtotal: number;
  amountTotal: number;
  unitAmount: number;
  quantity: number | null;
  name: string;
  price: { product: { metadata: { itemId: string } } };
  itemId: string;
};

export type Address = {
  city: string | null;
  country: string | null;
  line1: string | null;
  line2: string | null;
  postal_code: string | null;
  state: string | null;
};

export type CustomerDetails = {
  name: string | null;
  email: string | null;
  phone: string | null;
  tax_exempt: string | null;
  address: Address | null;
};

export type Transaction = {
  paymentStatus: string;
  status: string | null;
  customerDetails: CustomerDetails | null;
  currency: string | null;
  amountSubtotal: number | null;
  amountTotal: number | null;
  sessionId: string;
};

export type PaymentData = {
  paymentStatus: string;
  status: string | null;
  customerDetails: CustomerDetails | null;
  currency: string | null;
  amountSubtotal: number | null;
  amountTotal: number | null;
  sessionId: string;
  soldItems: SoldItem[];
};
