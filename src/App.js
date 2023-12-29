import React, { Fragment } from 'react';
import { Route, Routes, Router } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

import AppContext from './context';
// ====

import AppRouter from './components/adimMB/AppRouter';
import Admin from './components/adimMB/Admin';
import Login from './components/adimMB/Login';

function App() {
   const [items, setItems] = React.useState([]);
   const [cartItem, setCartItem] = React.useState([]);
   const [favorites, setFavorites] = React.useState([]);

   const [searchValue, setSearchValue] = React.useState('');
   const [isCartOpened, setIsCartOpened] = React.useState(false);
   const [isLoading, setIsLoading] = React.useState(true);

   React.useEffect(() => {
      async function fetchData() {
         try {
            const [itemsResponse, cartResponse, favoritesResponse] = await Promise.all([
               axios.get('https://63a826327989ad3286fb1b90.mockapi.io/items'),
               axios.get('https://63a826327989ad3286fb1b90.mockapi.io/cart'),
               axios.get('https://63ca4346d0ab64be2b4f3f3c.mockapi.io/Favorite'),
            ]);

            setIsLoading(false);

            setFavorites(favoritesResponse.data);
            setCartItem(cartResponse.data);
            setItems(itemsResponse.data);
         } catch (err) {
            alert('ошибка при получении данных ;(');
         }
      }

      fetchData();
   }, []);

   const onAddToCart = async (obj) => {
      try {
         const filtredItem = cartItem.find((item) => Number(item.parentId) == Number(obj.id));
         if (filtredItem) {
            setCartItem((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
            await axios.delete(
               `https://63a826327989ad3286fb1b90.mockapi.io/cart/${filtredItem.id}`,
            );
         } else {
            setCartItem((prev) => [...prev, obj]);
            const { data } = await axios.post(
               'https://63a826327989ad3286fb1b90.mockapi.io/cart',
               obj,
            );
            setCartItem((prev) =>
               prev.map((item) => {
                  if (item.parentId === data.parentId) {
                     return {
                        ...item,
                        id: data.id,
                     };
                  }
                  return item;
               }),
            );
         }
      } catch (err) {
         alert('неудалось добавить в корзину :(');
         console.error(err);
      }
   };

   const onAddToFavorite = async (obj) => {
      try {
         if (favorites.find((favObj) => favObj.id == obj.id)) {
            axios.delete(`https://63ca4346d0ab64be2b4f3f3c.mockapi.io/Favorite/${obj.id}`);
            setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
         } else {
            const { data } = await axios.post(
               'https://63ca4346d0ab64be2b4f3f3c.mockapi.io/Favorite',
               obj,
            );
            setFavorites((prev) => [...prev, data]);
         }
      } catch (err) {
         alert('Не удалось добавить в закладки');
         console.error(err);
      }
   };

   const onRemuveItem = (id) => {
      try {
         axios.delete(`https://63a826327989ad3286fb1b90.mockapi.io/cart/${id}`);
         setCartItem((prev) => prev.filter((item) => item.id !== id));
      } catch (err) {
         alert('неудалось удалить из корзины :(');
         console.error(err);
      }
   };

   const onChangeSearchInput = (event) => {
      setSearchValue(event.target.value);
   };

   const isAddedToCart = (id) => {
      return cartItem.some((obj) => +obj.parentId === +id);
   };

   const user = true;

   return (
      <AppContext.Provider
         value={{
            items,
            cartItem,
            favorites,
            isAddedToCart,
            onAddToFavorite,
            setIsCartOpened,
            setCartItem,
            isLoading,
         }}>
         <div className="wrapper clear">
            <Drawer
               cartItem={cartItem}
               onClickClose={() => setIsCartOpened(false)}
               onRemuve={onRemuveItem}
               opened={isCartOpened}
            />
            {
               //changed  {user ? '/' : '/Admin'}
            }
            <Header onClickCart={() => setIsCartOpened(true)} />

            <Routes>
               <Route
                  path="/"
                  element={
                     <Home
                        cartItem={cartItem}
                        items={items}
                        searchValue={searchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        setSearchValue={setSearchValue}
                        onAddToCart={onAddToCart}
                        onAddToFavorite={onAddToFavorite}
                        isLoading={isLoading}
                     />
                  }></Route>
               <Route path="favorites" element={<Favorites />}></Route>

               <Route path="orders" element={<Orders />}></Route>

               <Route exact path="/" element={<AppRouter />}></Route>

               <Route path="Admin" element={<Admin />}></Route>
               <Route path="Login" element={<Login />}></Route>

               {/* <AppRouter /> */}
            </Routes>
         </div>
      </AppContext.Provider>
   );
}

export default App;
