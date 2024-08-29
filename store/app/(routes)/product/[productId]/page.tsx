import getSingleProduct from "@/actions/get-product"
import getProductImages from "@/actions/get-product-images"
import getProducts from "@/actions/get-products"
import ProductInfo from "@/components/ProductInfo"

import ProductList from "@/components/ProductList"
import Gallery from "@/components/gallery/Gallery"
import Container from "@/components/ui/container"

export const revalidate = 0;

interface ProductPageProps {
    params: {
        productId: string
    }
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
    console.log("SINGLE_ID", params.productId)
    const product  = await getSingleProduct(params.productId)
    //fetch suggested products with same category
    const suggestProducts =  await getProducts({
        childcategoryId: product.childcategory?.id
    })
    console.log("SINGLE-P", product)
  return (
    <div className="bg-white">
        <Container >
            <div className="px-4 py-10 sm:px-6 lg:py-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    {/* Gallery images */}
                    <Gallery images={product.images} />
                    <div className="mt-10 px-0 sm:mt-12 lg:mt-0">
                        {/* Info */}
                        <ProductInfo product={product} />
                    </div>
                </div>

                {/* Suggested items */}
                <hr className="mt-20 mb-10" />
                <ProductList title="Related Items" data={suggestProducts} />
            </div>
        </Container>
    </div>
  )
}

export default ProductPage