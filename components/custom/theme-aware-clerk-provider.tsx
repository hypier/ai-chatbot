'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from "next-themes"
import { ReactNode } from 'react'

type ThemeAwareClerkProviderProps = {
  children: ReactNode;
}

export default function ThemeAwareClerkProvider({ children }: ThemeAwareClerkProviderProps) {
  const { theme } = useTheme();
  const clerkTheme = theme === 'dark' ? dark : undefined;
  return (
    <ClerkProvider
      appearance={{
        baseTheme: clerkTheme,
      }}
    >
      {children}
    </ClerkProvider>
  );
}