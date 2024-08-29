"use client"

import { Subcategory } from '@/types';
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/navigation';

interface CategoryCardProps {
    item: Subcategory;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ item }) => {
    const router = useRouter();
  return (
    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
        <div 
            className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 cursor-pointer ">
            <Link href={`/category/childcategory/${item.id}`}>
                <Image
                    src={item?.imageUrl}
                    width={100}
                    height={80}
                    alt="image"
                    className="h-auto w-full aspect-square object-cover  rounded-lg shadow-md shadow-black/5 dark:shadow-black/30"
                />
            </Link>

            <h2 className="title-font font-medium text-2xl text-gray-900 mt-4">
                {item.name}{" "}
            </h2>
            <p className="leading-relaxed">{item.name}</p>
        </div>
    </div>
  )
}

export default CategoryCard