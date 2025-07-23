import React from "react";
import { notification } from "antd";
import type { NotificationArgsProps } from "antd";

type NotificationPlacement = NotificationArgsProps["placement"];

export const useCustomNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const notify = (
    type: "success" | "error" | "info" | "warning",
    message: string,
    description?: string,
    placement: NotificationPlacement = "topRight"
  ) => {
    api[type]({
      message,
      description,
      placement,
    });
  };

  return { api, contextHolder, notify };
};
