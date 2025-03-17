import { axiosInstance } from "@/config/axios";
import { ISession, IUser } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";