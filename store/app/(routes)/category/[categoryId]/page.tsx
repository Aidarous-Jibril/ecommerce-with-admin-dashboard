import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/Billboard";
import Container from "@/components/ui/container";
import NoResult from "@/components/ui/404";
import ProductCard from "@/components/ProductCard";
import Filter from "./components/Filter";
import MobileFilters from "./components/MobileFilters";
import getBrands from "@/actions/get-brands";
import Image from "next/image";

import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";


export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    sizeId: string;
    colorId: string;
    brandId: string;
  };
}


const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {

    // const router = useRouter()
  const sizes = await getSizes();
  const colors = await getColors();
  const brands = await getBrands();
  // console.log("BRANDS", brands)
  const category = await getCategory(params.categoryId);
  console.log("CATS", category);

  const products = await getProducts({
    categoryId: params.categoryId,
    sizeId: searchParams.sizeId,
    colorId: searchParams.colorId,
    brandId: searchParams.brandId,
  });


  return (
    <div className="bg-white">
      <Container>
        <Billboard data={category?.billboard} />
        <section className="text-gray-700 body-font">
          <div className="container px-5 pt-8 pb-24 mx-auto">
            <div className="flex flex-wrap -m-4 text-center">
             {category?.subcategory?.map((item) => (
                <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                    <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 cursor-pointer ">
                      <Link href={`/category/subcategory/${item.id}`}>
                          <Image
                            src={item?.imageUrl}
                            width={100}
                            height={80}
                            alt="image"
                            // fill
                            className="h-auto w-full aspect-square object-cover  rounded-lg shadow-md shadow-black/5 dark:shadow-black/30"
                          />
                      </Link>
                
                    <h2 className="title-font font-medium text-2xl text-gray-900 mt-4">
                      {category.name}{" "}
                    </h2>
                    <p className="leading-relaxed">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filters */}
        {/* <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            Mobile filters 
            <MobileFilters sizes={sizes} colors={colors} brands={brands} />

            Desktop filters *
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
              <Filter valueKey="brandId" name="Brands" data={brands} />
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
        </div> */}
      </Container>
    </div>
  );
};


  
export default CategoryPage;
