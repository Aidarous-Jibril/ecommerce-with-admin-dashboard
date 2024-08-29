"use client"

import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import Container from '@/components/ui/container'
// import IconButton from '@/components/ui/iconButton'
// import { X } from 'lucide-react'
import useCartStore from '@/hooks/useCartStore'
import toast from 'react-hot-toast'

const CartPage = () => {
    const searchParams = useSearchParams();
    const [isMounted, setIsMounted] = useState(false)
    const cartItems = useCartStore()
    const removeAllItems = useCartStore((state) => state.removeAllItems )
    console.log("CART-ITEMS", cartItems) 
    
    useEffect(() => {
        setIsMounted(true)
        if (searchParams.get('success')) {
            toast.success('Payment completed.');
            removeAllItems();
          }
      
          if (searchParams.get('canceled')) {
            toast.error('Something went wrong.');
          }
    }, [searchParams, removeAllItems]);


    if(!isMounted){
        return null
    }

    //checkout 
    const handleCheckout = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
            productIds: cartItems.items.map((item) => item.id)
        })
        window.location = response.data.url
    }

    const handleRemove = (id: string) => {
        cartItems.removeItem(id)
    }
    // calculate  price 
    const subTotal = cartItems.items.reduce((total, item) => total + Number(item.price), 0 )
    const shipping =( subTotal * 0.002).toFixed();
    const totalPrice = subTotal + shipping;

  return (
    <div className="h-screen bg-gray-100 pt-20">
        <Container>
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
                {cartItems.items.map(item => (
                    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                        <div className="relative h-64 w-64 sm:h-48 rounded-md overflow-hidden  mr-8">
                            <Image
                                src={item.images?.[0]?.url}
                                alt=""
                                fill
                                className="aspect-square object-cover rounded-md w-"
                                />
                        </div>
                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                            <div className="mt-5 sm:mt-0">
                            <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                            <p className="mt-1 text-xs text-gray-700">{item.size.name}</p>
                            </div>
                            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                            <div className="flex items-center border-gray-100">
                                <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                                <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="1" min="1" />
                                <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="text-sm font-semibold">${item.price}</p>
                                {/* <IconButton icon={<X size={15} /> } /> */}
                                <svg 
                                    onClick={() => handleRemove(item.id)}
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            </div>
                        </div>
                    </div>
                ))}
                
            </div>
            {/* <!-- Sub total --> */}
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">${subTotal}</p>
                </div>
                <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">${shipping}</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                    <p className="mb-1 text-lg font-bold">${totalPrice}</p>
                    <p className="text-sm text-gray-700">including VAT</p>
                </div>
                </div>
                <button 
                     onClick={handleCheckout}
                    className="mt-6 w-full rounded-md bg-indigo-600 hover:bg-indigo-700 py-1.5 font-medium text-blue-50">
                        Check out
                    </button>
            </div>
            </div>
        </Container>
  </div>
  )
}

export default CartPage