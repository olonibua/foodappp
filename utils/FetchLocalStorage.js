export const fetchUser = () => {
    const userInfo =
     localStorage.getItem('user') !== 'undefined' 
       ? JSON.parse(localStorage.getItem('user'))
       : localStorage.clear();

 return userInfo;
};

export const fetchCart = () => {
  const userInfo =
   localStorage.getItem('user') !== 'undefined' 
     ? JSON.parse(localStorage.getItem('Cart'))
     : localStorage.clear();

return userInfo;
};