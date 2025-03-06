import {axiosInstance} from "@/config/axios";
import { useSessionStore } from "@/store/SessionStore";

export default function useRefreshToken() {
  const { session, setSession } = useSessionStore();

  console.log(session);

  const refresh = async () => {
    if (!session?.refreshToken) {
      console.error("No refresh token available.");
      return;
    }

    try {
      const { data } = await axiosInstance.post(
        "/auth/refresh",
        { refreshToken: session.refreshToken },
        { headers: { Authorization: `Bearer ${session.refreshToken}` } } // Ensure correct format
      );

      // Handle the response data
      const newAccessToken = data?.data?.authorizationToken;
      if (!newAccessToken) {
        console.error("Failed to get new access token.");
        return;
      }

      sessionStorage.setItem("accessToken", newAccessToken);

      setSession({
        ...session, // Preserve other session details
        accessToken: newAccessToken,
      });
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  return refresh;
}

// // import { useDispatch, useSelector } from "react-redux";
// import axios from "@/config/axios";
// import { useSessionStore } from "@/store/SessionStore";
// // import { setCredentials } from "@/redux/slices/authSlice";

// export default function useRefreshToken() {
//   const { session, setSession } = useSessionStore();

//   console.log(session);

//   const refresh = async () => {
//     try {
//       const { data } = await axios.post(
//         "/auth/refresh",
//         {
//           refreshToken: session?.refreshToken || "",
//         },
//         { headers: { Authorization: session?.refreshToken } }
//       );

//       // Handle the response data
//       const newAccessToken = data?.data?.authorizationToken;
//       sessionStorage.setItem("accessToken", newAccessToken);

//       if (session) {
//         setSession({
//           accessToken: newAccessToken,
//           refreshToken: session?.refreshToken,
//           user: session?.user,
//         });
//       }

//       //   console.log("new:", newAccessToken);
//     } catch (error) {
//       console.error("Error refreshing token:", error);
//     }
//   };

//   return refresh;
// }
