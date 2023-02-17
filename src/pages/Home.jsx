import React from 'react';
import Card from '../components/Card';

function Home({
   items,
   searchValue,
   onChangeSearchInput,
   setSearchValue,
   onAddToCart,
   onAddToFavorite,
   isLoading
}) {
   const renderItm = () => {
      const filtredItm = items.filter((item) =>
         item.title.toLowerCase().includes(searchValue.toLowerCase()),
      );
      return (isLoading ? [...Array(8)] : filtredItm).map((item, index) => (
         <Card
            key={index}
            onFavorite={(obj) => onAddToFavorite(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            loading={isLoading}
            {...item}
         />
      ));
   };

   return (
      <div className="content p-40">
         <div className="d-flex align-center justify-between mb-40">
            <h1>{searchValue == '' ? 'Все кроссовки' : 'Поиск по запросу: ' + "'" + searchValue + "'"}</h1>
            <div className="serch-block d-flex">
               <img src="img\serch.svg" alt="Serch" />
               <input onChange={onChangeSearchInput} value={searchValue} type="text" placeholder="Поиск..." />
               {searchValue &&
                  <img className='clear'
                     onClick={() => setSearchValue('')}
                     src="img\btn-remove.svg"
                     alt="Clear" />}
            </div>
         </div>

         <div className="d-flex flex-wrap">
            {renderItm()}
         </div>
      </div>
   )

}

export default Home;