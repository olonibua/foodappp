import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Simple from './component/Simple';
import NewItem from './Black/NewItem';
import { getAllCartItems, getAllFoodItems } from './utils/FirebaseFunctions';
import { useEffect } from 'react';
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/Reducer';
// import Abulaspot from './Resturants/Abulaspot';
// import Awesome from './Resturants/Awesome';
// import Frostbite from './Resturants/Frostbite';
// import Sharwama from './Resturants/Sharwama';
// import Iyanspot from './Resturants/Iyanspot';
// import Twilight from './Resturants/Twilight';
// import Oriental from './Resturants/Sharwama';
// import Chickenarena from './Resturants/Chickenarena';

function App() {

  const [{ foodItems, cartItem }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type : actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
    await getAllCartItems().then((data) => {
      dispatch({
        type : actionType.SET_CART_ITEM,
        cartItem: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route  path="Simple" element={<Simple />} />
      <Route  path="newitem" element={<NewItem />} />
      {/* <Route  path="abulaspot" element={<Abulaspot />} />
      <Route  path="awesome" element={<Awesome />} />
      <Route  path="frostbite" element={<Frostbite />} />
      <Route  path="iyanspot" element={<Iyanspot />} />
      <Route  path="twilight" element={<Twilight />} />
      <Route  path="sharwama" element={<Sharwama />} /> */}
      {/* <Route  path="oriental" element={<Oriental />} />
      <Route  path="chickenarena" element={<Chickenarena />} /> */}
    
    </Routes>
  );
}

export default App;
