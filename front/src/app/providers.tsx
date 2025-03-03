'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <ChakraProvider>
        {children}
        <ToastContainer />
      </ChakraProvider>
  )
}