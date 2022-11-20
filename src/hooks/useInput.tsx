import React, { useState } from 'react'

export const useInput = <T,>(data: T) => {
  const [inputData, setInputData] = useState<T>(data)

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    })
  }

  return {
    inputData,
    onInput,
    setInputData,
  }
}
