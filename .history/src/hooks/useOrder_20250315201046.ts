import { axiosInstance } from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios,{ AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Define the order interface (adjust fields as needed for your application)
export interface IOrder {
  id?: string;
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the create order payload
export interface CreateOrderPayload {
  products: Array<{
    productId: string;
    quantity: number;
  }>;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
}

interface ErrorResponse{
    error:string
}

export const useCreateOrder = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<IOrder, AxiosError<ErrorResponse>, CreateOrderPayload>({
    mutationFn: async (orderData: CreateOrderPayload) => {
      const response = await axiosInstance.post<IOrder>('/orders/create', orderData);
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate orders query to refetch the list if you have one
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      
      // Show success message
      toast.success('Order created successfully');
      
      // Redirect to the order details page
    //   router.push(`/orders/${data.id}`);
    },
    onError: (error) => {
        const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "An unknown error occurred.";
      toast.error(errorMessage);
    }
  });
};