"use client";

import { MouseEventHandler } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Expand, ShoppingCart } from "lucide-react";

import { Product } from "@/types";
import { formatter } from "@/lib/utilis";


import IconButton from "@/components/ui/iconButton";
import usePreviewModal from "@/hooks/usePreviewModal";
import useCartStore from "@/hooks/useCartStore";

interface ProductCardProps {
  item: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const router = useRouter();
  const previewModal = usePreviewModal()
  const cart = useCartStore()

  const handleClick = () => {
    router.push(`/product/${item.id}`)
  };

  const handlePreview: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    previewModal.onOpen(item)
  };

  const handleAddToCard: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    cart.addItem(item)
  };


  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      {/* Image & actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={item.images?.[0]?.url}
          alt=""
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={handlePreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={handleAddToCard}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>

      {/* item desc */}
      <div className="mt-4 pl-2 mb-2 flex justify-between ">
        <div>
          <div>
            <p className="text-lg font-semibold text-gray-900 mb-0">
              {item.name}
            </p>
            <p className="text-sm text-gray-400 mb-2">{item?.childcategory?.name}</p>
          </div>
          <p className="text-md text-gray-800 mt-0">
            {formatter.format(Number(item.price))}
          </p>
        </div>
        <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 group-hover:opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="gray"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
