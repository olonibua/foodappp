import React, { useState } from 'react'
import { MdAttachMoney, MdCloudUpload, MdDelete, MdFastfood, MdFoodBank } from 'react-icons/md';
import { TbCurrencyNaira, TbH3 } from 'react-icons/tb';
import Navbar from '../component/Navbar';
import { useStateValue } from '../context/StateProvider';
import { motion } from "framer-motion";
import { categories } from '../utils/Data';
import { locations } from '../utils/Data';
import Loader from '../component/Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { getAllFoodItems, saveItem } from '../utils/FirebaseFunctions';
import { actionType } from '../context/Reducer';
import  Order  from './Order';
import { BiComment, BiCommentAdd, BiRestaurant } from 'react-icons/bi';

const NewItem = () => {

    const [title, setTitle] = useState("");
    const [restaurant, setRestaurant] = useState("");
    const [comment, setComment] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState(null);
    const [location, setLocation] = useState(null);
    const [imageAsset, setImageAsset] = useState(null);
    const [fields, setFields] = useState(false);
    const [alertStatus, setAlertStatus] = useState("danger");
    const [msg, setMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [{ foodItems, cartItem }, dispatch] = useStateValue();
    const [showComponent, setShowComponent] = useState('New item')

    const uploadImage = (e) => {
        setIsLoading(true);
        const imageFile = e.target.files[0];
        const storageRef = ref(storage, `Images/${Date.now()} -${imageFile.name}`)
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on("state_changed", (snapshot) => {
            const uploadProgress =
             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
            console.log(error);
            setFields(true);
            setMsg("Error while uploading : try Again ");
            setAlertStatus("danger")
            setTimeout(() => {
                setFields(false);
                setIsLoading(false);
            }, 4000);
        },
       () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => {
            setImageAsset(downloadUrl);
            setIsLoading(false);
            setFields(true);
            setMsg("Image uploaded successfully");
            setAlertStatus("success");
            setTimeout(() => {
                setFields(false);
            }, 4000);
        });
      })
    };

    const deleteImage = () => {
        setIsLoading(true);
        const deleteRef = ref(storage, imageAsset);
        deleteObject(deleteRef).then(() => {
          setImageAsset(null);
          setIsLoading(false);
          setFields(true);
          setMsg("Image deleted successfully 😊");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      };
    
    const saveDetails = () => {
        setIsLoading(true);
        try {
            if((!restaurant || !imageAsset  || !category || !location)){
                setFields(true);
                setMsg("Required fields can't be empty");
                setAlertStatus("danger")
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false);
                }, 4000);
            } else{
                const data = {
                    id : `${Date.now()}`,
                    title : title,
                    restaurant : restaurant,
                    imagesURL : imageAsset,
                    category : category,
                    location : location,
                    comment : comment,
                    qty : 1,
                    price : price
                }
                saveItem(data)
                setIsLoading(false);
                setFields(true);
                setMsg("Data uploaded successfully 😊");
                clearData();
                setAlertStatus("success");
                setTimeout(() => {
                   setFields(false);
                }, 4000);
            }
        } catch (error) {
            console.log(error);
            setFields(true);
            setMsg("Error while uploading : try Again ");
            setAlertStatus("danger");
            setTimeout(() => {
                setFields(false);
                setIsLoading(false);
            }, 4000);

        }

        fetchData();
    };

    const clearData = () => {
        setTitle("");
        setRestaurant("");
        setImageAsset(null);
        setComment("");
        setPrice("");
        setCategory("Select Category");
        setLocation("Select Location");
    }; 

    const fetchData = async () => {
        await getAllFoodItems().then((data) => {
          dispatch({
            type : actionType.SET_FOOD_ITEMS,
            foodItems: data,
          });
        });
      };

  return (
    <div className='w-full'>
        <Navbar />
        
        <div className='mx-auto max-w-[350px] sm:max-w-[480px] md:max-w-[700px] py-7'>
            <div className='flex gap-3 py-6'>
            <button className='border-2 p-2 rounded' onClick={() => setShowComponent('New item')}>Add New Item</button>
            <button className='border-2 p-2 rounded' onClick={() => setShowComponent('view order')}>View Order</button>
            </div>
            { showComponent === 'New item' && <div className='border border-gray-300 rounded-lg p-4 gap-4'>

            {
            fields && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`w-full p-2 rounded-lg text-center ${
                    alertStatus === "danger"
                    ? 'bg-red-400 text-white '
                    : 'bg-emerald-400 text-white '
                }`}
                >
                 {msg}
              </motion.p>
            )}

            <div className="w-ful py-2 border-b border-gray-300 flex
            items-center gap-2">
                <MdFastfood  className="text-xl text-grey-700" />
                <input
                type="text"
                required value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Item title.."
                className='w-full h-full text-[12px] sm:text-lg bg-transparent font-[500]
                outline-none border-none placholder:text-gray-400
                text-gray-500'  
                />
        </div>

        <div className="w-ful py-2 border-b border-gray-300 flex
            items-center gap-2">
                <BiRestaurant  className="text-xl text-grey-700" />
                <input
                type="text"
                required value={restaurant}
                onChange={(e) => setRestaurant(e.target.value)}
                placeholder="Restaurant name.."
                className='w-full h-full text-[12px] sm:text-lg bg-transparent font-[500]
                outline-none border-none placholder:text-gray-400
                text-gray-500'  
                />
        </div>

        <div className="w-full py-2">
           <select onChange={(e) => setCategory(e.target.value)}
           className="outline-none w-full text-base border-b-2
           border-gray-200 p-2 rounded-md cursor-pointer"
            >
            <option value="other" className="bg-white">Select Category
            </option>
            {categories && categories.map(item => (
                <option key={item.id} className="text-base border-0
                outline-none capitalize bg-white text-headingColor"
                value={item.urlParamName}
                >
                {item.name}
                </option>
            ))}
           </select>
        </div>

        <div className="w-full py-2">
           <select onChange={(e) => setLocation(e.target.value)}
           className="outline-none w-full text-base border-b-2
           border-gray-200 p-2 rounded-md cursor-pointer"
            >
            <option value="other" className="bg-white">Select Location
            </option>
            {locations && locations.map(value => (
                <option key={value.id} className="text-base border-0
                outline-none capitalize bg-white text-headingColor"
                value={value.urlLocation}
                >
                {value.name}
                </option>
            ))}
           </select>
        </div>
           
           
           <div className='group flex justify-center items-center flex-col
           border-2 border-dotted border-gray-300 w-full h-[225px] md:h-[220px]
           cursor-pointer rounded-lg'>
                    {isLoading ? 
                    <Loader /> 
                      : <>
                       {!imageAsset ? 
                       <>
                       <label className="w-full h-full flex flex-col items-center
                       justify-center cursor-pointer">
                        <div className='w-full h-full flex flex-col items-center
                       justify-center'>
                        <MdCloudUpload className="text-gray-500 text-3xl
                        hover:text-gray-700" />
                        <p className="text-gray-500 hover:text-gray-700">
                            click here to upload
                        </p>

                        </div>
                        <input 
                        type="file" 
                        name="uploadimage"
                        accept='image/*'
                        onChange={uploadImage} 
                        className='w-0 h-0'
                        />
                       </label>
                   
                    
                    
                       </> : 
                       <><div className='relative h-full'>
                        <img 
                        src={imageAsset} 
                        alt='upload image'
                        className='w-ful h-full object-cover' 
                        />
                        <button type='button' className='absolute bottom-3
                         right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer
                         outline-none hover:shadow-md duration-500 transition-all
                         ease-in-out'
                         onClick={deleteImage}>
                            <MdDelete className='text-white' />
                         </button>
                        </div>
                        </>
                       }
                    </>
                    }
                </div>

                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
                    <div className='w-full py-2 border-b border-gray-300 items-center gap-'>
                        <BiCommentAdd className='text-gray-700 text-2xl' />
                        <input 
                        type="text" 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required placeholder="Comment"
                        className='w-full h-full text-lg bg-transparent outline-none
                        border-none placeholder:text-gray-400'
                        />
                    </div>

                    <div className='w-full py-2 border-b border-gray-300 items-center gap-'>
                        <TbCurrencyNaira className='text-gray-700 text-2xl' />
                        <input 
                        type="text" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required placeholder="Price"
                        className='w-full h-full text-lg bg-transparent outline-none
                        border-none placeholder:text-gray-400'
                        />
                    </div>
                </div>

                <div className='flex items-center w-full'>
                    <button 
                    type="button" 
                    className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none
                    bg-emerald-500 px-12 py-2 rounded-lg text-md
                    sm:text-lg text-white font-[500]" onClick={saveDetails}>
                        save
                    </button>

                </div>
            </div>
            }
             
            
            {showComponent === 'view order' && ( <Order 
             data={cartItem?.filter((n) => n.price)}

             />
            )
           }
        </div>
        
    </div>
  )
}

export default NewItem