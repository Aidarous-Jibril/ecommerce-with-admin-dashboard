"use client";

import qs from "query-string";

import { Brand, Color, Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utilis";

interface FilterProps {
  valueKey: string;
  name: string;
  data: (Size | Color | Brand )[];
}

const Filter: React.FC<FilterProps> = ({ valueKey, name, data }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const currrentValue = qs.parse(searchParams.toString());
    const query = { ...currrentValue, [valueKey]: id };

    if (currrentValue[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <>
   
    <div className="my-12">
      <h3 className="font-semibold text-lg">{name}</h3>
      <hr className="my-4" />

      <div className="flex flex-wrap gap-4 ">
        {data.map((item) => (
          <div key={item.id} className="flex items-center ">
            <button
              className={cn(
                "bg-blue border-2 border-neutral-400 text-black text-sm py-1 px-3 rounded",
                selectedValue === item.id && "bg-black text-white"
              )}
              onClick={() => onClick(item.id)}
            >
              {item.name}
            </button>
          </div>
        ))}
      </div>
    </div>
    <div className="my-12">
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">{name}:</h3>
            <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {data.map((item) => (
                <li key={item.id} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                    <div className="flex items-center pl-3">
                        <input id="vue-checkbox" type="checkbox" value={item.id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        <label htmlFor="vue-checkbox" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item.name}</label>
                    </div>
                </li>
                ))}
            </ul>
    </div>



    </>
  );
};

export default Filter;
