'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface BookingContextType {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const BookingContext = createContext<BookingContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
})

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <BookingContext.Provider value={{ isOpen, openModal: () => setIsOpen(true), closeModal: () => setIsOpen(false) }}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => useContext(BookingContext)
