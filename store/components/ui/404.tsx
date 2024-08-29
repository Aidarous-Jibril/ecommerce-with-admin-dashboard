"use client"

import { useRouter } from "next/navigation"

const NoResult = () => {
  const router = useRouter()
  return (
    <>
      <button onClick={() => router.push("/") } type="button" className="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
        <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>
        <span>Go back</span>
      </button>
      <div className="bg-white border border-gray-200 flex flex-col mt-48 items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-md">
          {/* <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300">404</p> */}
          <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">No Results Found</p>
          <p className="text-gray-500 mt-4 pb-4 border-b-2 text-center">Sorry, what you are looking for could not be found.</p>
          
      </div>
    </>
  )
}

export default NoResult