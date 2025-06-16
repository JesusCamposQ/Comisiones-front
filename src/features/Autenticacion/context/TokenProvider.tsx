import React, { createContext, useEffect, useState } from 'react'

interface tokenContextI {
  isAunteticacion: boolean
  token: string | null
  asignarToken: (token: string) => void
  logout: () => void
}

export const TokenContext = createContext<tokenContextI>({
  isAunteticacion: false,
  token: null,
  asignarToken: () => {},
  logout: () => {},
})

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [isAunteticacion, setIsAunteticacion] = useState<boolean>(false)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    
    if (storedToken) {
      setToken(storedToken)
      setIsAunteticacion(true)
    } else {
      setToken(null)
      setIsAunteticacion(false)
    }
  }, [])

  const asignarToken = (newToken: string) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    setIsAunteticacion(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setIsAunteticacion(false)
  } 
  return (
    <TokenContext.Provider value={{ token, isAunteticacion, asignarToken, logout }}>
      {children}
    </TokenContext.Provider>
  )
}
