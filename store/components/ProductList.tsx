import { Product } from "@/types"
import ProductCard from "./ProductCard"
import NoResult from "@/components/ui/404"

interface ProductListProps  {
    title: string,
    data: Product[]
}

const ProductList = ({ title, data }: ProductListProps) => {
  // console.log("DATA", data)
  return (
    <div className="space-y-4">
        <h3 className="font-bold text-3xl">{title}</h3>
        
        { data.length === 0 && < NoResult /> }
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((item) => (
                <ProductCard key={item.id} item={item} />
            )
            )}
        </div>
    </div>
  )
}

export default ProductList