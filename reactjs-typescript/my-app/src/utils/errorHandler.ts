import useNotification from "antd/es/notification/useNotification";
import axios, { AxiosError } from "axios";
import { use } from "react";
import { useCustomNotification } from "../components/Notification";

export function handleAxiosError(
  error: unknown,
  notify: (type: "error" | "success", title: string, message: string) => void,
  defaultMessage: string,
  title = "Lỗi"
) {
  let errorMessage = defaultMessage;

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    errorMessage =
      axiosError.response?.data?.message || "Lỗi kết nối đến server.";
  }

  notify("error", title, errorMessage);
  console.error(`${title}:`, error);
}
