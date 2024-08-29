import qs from "query-string"

import { Product } from "@/types"


//inteface for eventual filters
interface Query {
  sizeId?: string,
  colorId?: string,
  brandId?: string,
  categoryId?: string,
  childcategoryId?: string,
  isFeatured?: boolean,
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`

const getProducts = async ( query: Query ): Promise<Product[]> => {
  const BASE_URL = qs.stringifyUrl({
    url: URL,
    query: {
      sizeId: query.sizeId,
      colorId: query.colorId,
      brandId: query.brandId,
      categoryId: query.categoryId,
      childcategoryId: query.childcategoryId,
      isFeatured: query.isFeatured,
    }
  })
    const res = await fetch(BASE_URL)

  return res.json();
}

export default getProducts