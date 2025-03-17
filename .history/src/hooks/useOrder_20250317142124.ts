import { authAxios, axiosAuth, axiosInstance } from "@/config/axios";
import { IOrder, IOrderTracking, IUserOrder } from "@/types";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axios,{ AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Define the order interface (adjust fields as needed for your application)


// Define the create order payload


interface ErrorResponse{
    error:string
}

export const useCreateOrder = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<IOrder, AxiosError<ErrorResponse>,IOrder>({
    mutationFn: async (orderData: IOrder) => {
      const response = await authAxios.post<IOrder>('/orders/create', orderData);
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
        console.log(error)
        const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "An unknown error occurred.";
      toast.error(errorMessage);
    }
  });
};

// get user order

export const useGetUserOrders = () => {
  return useQuery<IUserOrder[], AxiosError<ErrorResponse>>({
    queryKey: ["userOrders"],
    queryFn: async () => {
      const response = await authAxios.get<IUserOrder[]>("/orders/user-orders");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 2, // Retry twice on failure
  });
};

// one order


export const useGetOrderById = (orderId: string) => {
  return useQuery<IOrder, AxiosError<ErrorResponse>>({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const response = await authAxios.get<IOrder>(`/orders/order?orderId=${orderId}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 2, // Retry twice on failure
  });
};

// order tracking endpoint
export const useOrderTracking = (trackingId: string) => {
  return useQuery<IOrderTracking, AxiosError<ErrorResponse>>({
    queryKey: ["order-tracking", trackingId],
    queryFn: async () => {
      const response = await authAxios.get<IOrderTracking>(`/orders/tracking?trackingId=${trackingId}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 2, // Retry twice on failure
  });
};