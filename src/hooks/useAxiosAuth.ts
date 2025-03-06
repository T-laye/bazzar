import { axiosAuth } from "@/config/axios";
import { useEffect } from "react";
// import { useSelector } from "react-redux";
import useRefreshToken from "./useRefreshToken";
import { useSessionStore } from "@/store/SessionStore";

export default function useAxiosAuth() {
  const { session } = useSessionStore()
  const refresh = useRefreshToken();
  // console.log(auth);
  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = session?.accessToken;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessoken = await refresh();
          prevRequest.headers["Authorization"] = newAccessoken;
          return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.response.eject(responseIntercept);
      axiosAuth.interceptors.request.eject(requestIntercept);
    };
  }, [session, refresh]);

  return axiosAuth;
}
