import Image from "next/image";

export default function PlantCards() {

    return (
      <div className="flex space-x-5  w-full my-5">
        {/* First Card */}
        <div className={`bg-[url(/background1.png)] relative w-full md:w-1/2 h-72 rounded-xl overflow-hidden shadow-md bg-cover bg-center `}>
          <div className="absolute inset-0 bg-black/20 flex flex-col justify-center px-6">
            <h2 className="text-white text-2xl font-semibold mb-4">
              The Ultimate Guide to <br /> Low-Maintenance Houseplants
            </h2>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-fit">
              Shop Now
            </button>
          </div>
        </div>
  
        {/* Second Card */}
        <div className={`bg-[url(/bg2.jpg)] relative w-full md:w-1/2 h-72 rounded-xl overflow-hidden shadow-md bg-cover bg-center`}>
          <div className="absolute inset-0 bg-black/20 flex flex-col justify-center px-6">
            <h2 className="text-white text-2xl font-semibold mb-4">
              Best Plants for Improving <br /> Air Quality in Your Home
            </h2>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-fit">
              Shop Now
            </button>
  

            <div className="flex gap-2 mt-4">
              <Image src="/bg4.jpg" alt="Plant 1" width={100} height={100} className="w-28 h-20 object-cover rounded" />
              <Image src="/bg5.jpg" alt="Plant 2" width={100} height={100} className="w-28 h-20 object-cover rounded" />
              <Image src="/bg-6.jpg" alt="Plant 3" width={100} height={100} className="w-28 h-20 object-cover rounded" />
            </div>
          </div>
        </div>
       
        
      </div>
    );
  }
  