import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { actionType } from "../context/Reducer";
import { useStateValue } from "../context/StateProvider";
import jollof from '../img/jollof.jpg'

export const DrinksRowContainer = ({flag, data, scrollValue }) => {

    const [items, setItems] = useState([])
    
    const rowContainer = useRef()
    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue;
    }, [scrollValue]);

    const [{ cartItems }, dispatch] = useStateValue()

    const addToCart = () => {
        dispatch({
            type : actionType.SET_CARTITEMS,
            cartItems : items,
        });
        localStorage.setItem("cartItem", JSON.stringify(items))
    };

    useEffect(() => {
        addToCart();
    }, [items])

    return (
        <div
        ref={rowContainer}
         className={`w-full flex items-center my-12 scroll-smooth ${
            flag 
            ? "overflow-x-scroll scrollbar-none" 
            : "overflow-x-hidden flex-wrap"
         }`}
        > 
         {data &&
           data.map((item) => (
            <div 
            key={item.id} 
            className="w-full min-w-[200px] md:w-[200px] md:min-w-[200px] h-auto">

             <div className='m-2 p-1 rounded-[10px] bg-[#fff] shadow-lg'>
            <img className="w-40 h-40 rounded-[6px] border-[#21d187] border-2"
             src={item?.imagesURL} 
             alt=''
             />
            <p className='text-[12px] sm:text-[14px] font-[600]'>{item?.title}</p>
            <p className=' text-[10px] sm:text-[13px] font-[400]'><span>₦</span>{item?.price}</p>
            <button className='shadow-lg my-2 rounded-[3px] bg-[#21d187] h-[30px] text-white font-[500] w-full' onClick={()=>  setItems([...cartItems, item])}>
            <p className='mx-auto font-[600]'>Add to cart</p></button>
            </div>

          </div>
         ))}
            

        </div>
    )
}