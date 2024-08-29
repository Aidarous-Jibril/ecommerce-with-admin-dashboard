// import Link from "next/link";

import getSubCategory from "@/actions/get-subcategory";

import CategoryCard from "@/components/CategoryCard";
import Container from "@/components/ui/container";


export const revalidate = 0;

interface SubCategoryPageProps {
  params: {
    subcategoryId: string;
  }
}


const SubCategoryPage: React.FC<SubCategoryPageProps> = async ({ params }) => {

  const subcategory = await getSubCategory(params.subcategoryId);
  console.log("SUBCATS", subcategory);

 

  return (
    <div className="bg-white">
      <Container>
        <section className="text-gray-700 body-font">
          <div className="container px-5 pt-8 pb-24 mx-auto">
            <div className="flex flex-wrap -m-4 text-center">
              {subcategory?.childcategory?.map((item) => (
                // <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                //   <div 
                //     className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 cursor-pointer ">
                //     <Link href={`/category/subcategory/${item.id}`}>
                //         <Image
                //           src={item?.imageUrl}
                //           width={100}
                //           height={80}
                //           alt="image"
                //           // fill
                //           className="h-auto w-full aspect-square object-cover  rounded-lg shadow-md shadow-black/5 dark:shadow-black/30"
                //         />
                //     </Link>
                
                //     <h2 className="title-font font-medium text-2xl text-gray-900 mt-4">
                //       {subcategory.name}{" "}
                //     </h2>
                //     <p className="leading-relaxed">{item.name}</p>
                //   </div>
                // </div>
                <CategoryCard item={item} />
              ))}
            </div>
          </div>
        </section>
        
      </Container>
    </div>
  );
};


  
export default SubCategoryPage