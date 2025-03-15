export interface IUser {
  name?: {
    first_name: string;
    last_name: string;
    middle_name: string;
    _id: string;
  };
  address?: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    default_address: boolean;
    _id: string;
  };
  email?: string;
  password?: string;
  phoneNumber?: string;
  picture?: string;
  user_id?: string;
  otp?: string;
}

export interface ISession {
  user: IUser;
  message?: string;
  accessToken: string;
  refreshToken: string;
}

export interface Product {
  _id: string;
  product_id: string;
  product_name: string;
  product_description: string;
  product_condition: string;
  product_status: string;
  product_reviews: number;
  product_tags: string[];
  product_category: string[];
  product_media: string[];
  inventory: {
    sku: string;
    quantity: number;
  };
  pricing: {
    unit_price: number;
    discount_type: string;
    discount_percentage: number;
    tax_class: string;
    vat_amount: number;
  };
  shipping: {
    product_length: number;
    height: number;
    width: number;
    weight: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}
