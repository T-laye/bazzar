import { axiosInstance } from "@/config/axios";
import { IUser } from "@/types";
// import { OtpVerificationRoute } from "@/utilities/Routes";
// import { toast } from "@/utilities/Helpers";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface RegisterResponse {
  user?: { email: string };
}

interface ErrorResponse {
  error: string;
}


export const useCreateCustomer = () => {
    // const router = useRouter();

  // Define the function to handle the registration API call
  const handleRegister = async (data: IUser) => {
    const response = await axiosInstance.post<RegisterResponse>(
      "/customer/create",
      {
        name: {
          first_name: data.name.first_name,
          last_name: data.name.last_name,
          middle_name: data.name.middle_name,
        },
        address: {
          street: data.address.street,
          city: data.address.city,
          state: data.address.state,
          zip_code: data.address.zip_code,
          country: data.address.country,
          default_address: true,
        },
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
      }
    );
    return response.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<
    RegisterResponse,
    AxiosError<ErrorResponse>,
    IUser
  >({
    mutationFn: handleRegister,
    onSuccess: (data) => {
      toast.success("Otp Sent Successfully");
      if (data) {
        // const email = data.user.email;
        console.log(data);
        // router.push(
        //   `${OtpVerificationRoute}?email=${encodeURIComponent(email)}`
        // ); // Redirect after successful registration
      }
    },
    onError: (error) => {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "An unknown error occurred.";
      toast.error(errorMessage);
    },
  });

  return mutation;
};

export const useLogin = () => {
  //   const login = async () => {
  //     try {
  //     } catch (error) {
  //     }
  //     // '/auth/login-customer'
  //   };
};
