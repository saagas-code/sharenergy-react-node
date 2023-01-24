import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";

interface ProviderProps {
  children: ReactNode;
}

export const Providers = ({children}: ProviderProps) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}