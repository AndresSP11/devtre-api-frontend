import React from 'react'

type ErrorMessageProps={
  children: React.ReactNode
}


export default function ErrorMessage({children}:ErrorMessageProps) {
  return (
    <p className=' w-full py-2 font-bold uppercase text-yellow-50 bg-red-600 text-center rounded-xl'>{children}</p>
  )
}
