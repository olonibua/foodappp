import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import Navbar from '../component/Navbar'
import { useStateValue } from '../context/StateProvider'
import { DrinksRowContainer } from './DrinksRowContainer';
import CartContainer from './CartContainer'

const Product = () => {

  const [{ foodItems, cartShow }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);


  useEffect(() => {}, [scrollValue]);

  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
        

        <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-xl sm:text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-[#cb4e4e] to-[#d12424] transition-all ease-in-out duration-100">
            Our fresh & healthy Drinks
          </p>
          

          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-green-300 hover:bg-green-500 cursor-pointer  hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(-400)}
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-green-300 hover:bg-green-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(400)}
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>
      
        <DrinksRowContainer
          scrollValue={scrollValue}
          flag={true}
          data={foodItems?.filter((n) => n.category === "10")}
        />
      </section>
    {cartShow && (
        <CartContainer />
    )}
    </div>
  )
}

export default Product