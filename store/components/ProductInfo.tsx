"use client";

import { MouseEventHandler } from "react";
import useCartStore from "@/hooks/useCartStore";
import { Product } from "@/types"

interface ProductInfoProps {
    product: Product
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    const cart = useCartStore()

    //Add to card handler
    const handleAddToCard: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        cart.addItem(product)
    };

  return (
    <div className="flex bg-white rounded-lg shadow dark:bg-gray-800">
              
    <form className="flex-auto p-6">
        <div className="flex flex-wrap">
            <h1 className="flex-auto text-xl font-semibold dark:text-gray-50">{product.name}</h1>
            <div className="text-xl font-semibold text-gray-500 dark:text-gray-300">${product.price}</div>
            <div className="flex-none w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">In stock
            </div>
        </div>
        <div className="flex flex-col mt-4">
        <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-4">
                <span className="font-semibold text-md text-black">Color</span>
                <p>{product?.color.name}</p>
            </div>
        </div>

        <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-4">
                <span className="font-semibold text-md text-black">Size</span>
                <p >{product?.size.name}</p>
            </div>
        </div>
        <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-4">
                <span className="font-semibold text-md text-black">Brand</span>
                <p>{product?.brand.name}</p>
            </div>
        </div>
    </div>
        <div className="flex items-baseline mt-4 mb-6 text-gray-700 dark:text-gray-300">

            <a href="#"
                className="hidden ml-auto text-sm text-gray-500 underline md:block dark:text-gray-300">Size
                Guide
            </a>
        </div>
        <div className="flex mb-4 text-sm font-medium">
            <button 
                onClick={handleAddToCard}
                type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Buy now
            </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-300">Free shipping on all orders above $50.</p>
    </form>
</div>
  )
}

export default ProductInfo