import { useState } from 'react';

const BASE_URL = "https://fakestoreapi.com"

const useFetch = () => {
  const fetchProducts = async () => {
    try {
      const resp = await fetch(`${BASE_URL}/products`)
      const data = await resp.json()
      return data
    } catch (error) {
      console.log('error : ', error)
      return error
    }
  }

  const addProduct = async (payload: any) => {
    try {
      const resp = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        body: JSON.stringify(payload)
      })
      const data = await resp.json()
      return data
    } catch (error) {
      console.log('error : ', error)
      return error
    }
  }

  return { fetchProducts, addProduct }
}

export default useFetch