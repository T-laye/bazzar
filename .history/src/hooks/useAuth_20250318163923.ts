import { authAxios, axiosInstance } from "@/config/axios";
import { ICreateUser, ISession, IUser } from "@/types";
import { signInRoute } from "@/utilities/Routes";
// import { OtpVerificationRoute } from "@/utilities/Routes";
// import { toast } from "@/utilities/Helpers";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface RegisterResponse {
  user?: { email: string };
}

interface OtpData {
  email: string;
  otp: string;
}
interface loginData {
  email: string;
  password: string;
}

interface ErrorResponse {
  error: string;
}

export const useCreateCustomer = () => {
  // const router = useRouter();

  // Define the function to handle the registration API call
  const handleRegister = async (data: ICreateUser) => {
    const response = await axiosInstance.post<RegisterResponse>(
      "/customer/create",
      {
        name: {
          first_name: data.name?.first_name || "",
          last_name: data.name?.last_name,
          middle_name: data.name?.middle_name,
        },
        address: {
          street: data.address?.street || "",
          city: data.address?.city || "",
          state: data.address?.state || "",
          zip_code: data.address?.zip_code || "",
          country: data.address?.country || "",
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
    ICreateUser
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

export const useVerifyEmail = () => {
  const router = useRouter();
  const handleVerifyEmail = async (data: OtpData) => {
    const response = await axiosInstance.post<RegisterResponse>(
      "/auth/verify-email",
      {
        email: data.email,
        otp: data.otp,
      }
    );
    return response.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<
    RegisterResponse,
    AxiosError<ErrorResponse>,
    OtpData
  >({
    mutationFn: handleVerifyEmail,
    onSuccess: (data) => {
      if (data) {
        toast.success("Email Verification Successful");
        router.push(signInRoute); // Redirect after successful registration
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
  const router = useRouter();
  const handleLogin = async (data: loginData) => {
    const response = await axiosInstance.post<ISession>(
      "/auth/login-customer",
      {
        email: data.email,
        password: data.password,
      }
    );
    return response.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<ISession, AxiosError<ErrorResponse>, loginData>({
    mutationFn: handleLogin,
    onSuccess: (data) => {
      if (data) {
        const accessToken = data?.accessToken;
        const refreshToken = data?.refreshToken;
        const user = data?.user;
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        sessionStorage.setItem("user", JSON.stringify(user));
        toast.success("Login Successful");
        // console.log(data);
        router.push("/"); // Redirect after successful registration
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


const logout = async () => {
  await authAxios.post('/auth/logout', {}, { withCredentials: true });
};

export const useLogout = () => {
  const router = useRouter();
  
  return useMutation({
      mutationFn: logout,
      onSuccess: () => {
          // Redirect to login page after logout
           // Clear session storage on logout
           sessionStorage.removeItem('user');
           sessionStorage.removeItem('refreshToken');
           sessionStorage.removeItem('accessToken');

            // Refresh the page first
            router.refresh();

            // Redirect to homepage after a slight delay
            setTimeout(() => {
                router.push('/');
            }, 100); 
      },
      onError: (error) => {
          console.error("Logout failed:", error);
      },
  });
};