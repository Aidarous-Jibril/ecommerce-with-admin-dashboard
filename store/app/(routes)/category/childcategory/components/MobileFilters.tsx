"use client"
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { Brand, Color, Size } from "@/types";
import { Plus, X } from "lucide-react";
import IconButton from "@/components/ui/iconButton";
import Filter from "./Filter";

interface MobileFiltersProps {

    sizes: Size[],
    colors: Color[],
    brands: Brand[]
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ sizes, colors, brands}) => {
    const [isOpen, setIsOpen] = useState(true)

    return (
      <>
        <button 
            onClick={() => setIsOpen(true)}
            className="lg:hidden flex justify-center items-center gap-x-2 h-10 px-5 text-white transition-colors duration-150 bg-indigo-700 rounded-full focus:shadow-outline hover:bg-indigo-800">
          Filters <Plus size={20} />
        </button>

        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-40 lg:hidden" >
        
        {/* Background color and opacity */}
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        
        {/* Dialog position */}
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            
            {/* Close button */}
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15} />} onClick={() => setIsOpen(false)} />
            </div>

            <div className="p-4">
              <Filter
                valueKey="sizeId" 
                name="Sizes" 
                data={sizes}
              />
              <Filter 
                valueKey="colorId" 
                name="Colors" 
                data={colors}
              />
              <Filter 
                valueKey="brandI" 
                name="Brands" 
                data={brands}
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      </>
    );
}

export default MobileFilters