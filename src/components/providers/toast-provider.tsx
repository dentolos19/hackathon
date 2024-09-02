"use client";

import { Alert, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

type ToastSeverity = "info" | "warning" | "error" | "success";

type ToastContextProps = {
  show: (message: string, severity: ToastSeverity) => void;
};

const ToastContext = createContext<ToastContextProps>({
  show: function (message: string, severity: ToastSeverity): void {
    throw new Error("Function not implemented.");
  },
});

export function useToast() {
  return useContext(ToastContext);
}

export default function ToastProvider(props: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [severity, setSeverity] = useState<ToastSeverity>("info");

  function show(message: string, severity: ToastSeverity) {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  }

  return (
    <ToastContext.Provider value={{ show }}>
      {props.children}
      <Snackbar open={open} onClose={() => setOpen(false)} autoHideDuration={5000}>
        <Alert variant={"filled"} severity={severity} onClose={() => setOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}