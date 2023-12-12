import React from 'react'
import { Logo } from './_components/logo'

export default function AuthLayout({children}:{
    children: React.ReactNode
}) {
  return (
    <div className='h-full flex-col space-y-6 flex items-center justify-center'>
        <Logo />
      {children}
    </div>
  )
}
