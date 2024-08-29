
import Container from "@/components/ui/container";
import NoResult from "@/components/ui/404";
import ProductCard from "@/components/ProductCard";
import getSizes from "@/actions/get-sizes";
import getColors from "@/actions/get-colors";
import getBrands from "@/actions/get-brands";
import getProducts from "@/actions/get-products";
import MobileFilters from "../components/MobileFilters";
import Filter from "../components/Filter";
// import Filter from "./components/Filter";
// import MobileFilters from "./components/MobileFilters";



export const revalidate = 0;

interface ChildCategoryPageProps {
  params: {
    childcategoryId: string;
  };
  searchParams: {
    sizeId: string;
    colorId: string;
    brandId: string;
  };
}


const ChildCategoryPage: React.FC<ChildCategoryPageProps> = async ({
  params,
  searchParams,
}) => {

  // const router = useRouter()
  const sizes = await getSizes();
  const colors = await getColors();
  const brands = await getBrands();
  // console.log("BRANDS", brands)

  const products = await getProducts({
    childcategoryId: params.childcategoryId,
    sizeId: searchParams.sizeId,
    colorId: searchParams.colorId,
    brandId: searchParams.brandId,
  });


  return (
    <div className="bg-white">
      <Container>
        {/* <section className="text-gray-700 body-font">
          <div className="container px-5 pt-8 pb-24 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
             {products?.map((item) => (
                <ProductCard item={item} />
              ))}
            </div>
          </div>
        </section> */}

        {/* Filters */}
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            {/* Mobile filters  */}
            { products && 
              <MobileFilters sizes={sizes} colors={colors} brands={brands} />
            }

            {/* Desktop filters * */}
            <div className="hidden lg:block">
              { products.length > 0 ? (<Filter valueKey="sizeId" name="Sizes" data={sizes} />) : null   }
              { products.length > 0 ? (<Filter valueKey="colorId" name="Colors" data={colors} />) : null   }
              { products.length > 0 ? (<Filter valueKey="brandId" name="Brands" data={brands} />) : null   }
            </div>

            <div className="mt-6 lg:col-span-4 lg:mt-4">
              {products.length === 0 && <NoResult />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 my-12">
                {products.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div> 
      </Container>
    </div>
  );
};


  
export default ChildCategoryPage;
