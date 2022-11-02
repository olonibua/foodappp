import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore"
import { firestore } from "../firebase.config"

//saving new item
export const saveItem = async (data) => {
    await setDoc( doc(firestore, "foodItems", `${Date.now()}`,), data , {
            merge: true,
        });
}

export const getAllFoodItems = async () => {
    const items = await getDocs(
      query(collection(firestore, "foodItems"), orderBy("id", "desc"))
    );
  
    return items.docs.map((doc) => doc.data());
  };

  export const saveCart = async (data) => {
    await setDoc( doc(firestore, "cartItem", `${Date.now()}`,), data , {
            merge: true,
        });
}

export const getAllCartItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "cartItem"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};