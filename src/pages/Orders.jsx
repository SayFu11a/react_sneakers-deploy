import React from 'react';
import axios from 'axios';

import AppContext from '../context';
import Card from '../components/Card';

function Orders() {
   const { onAddToCart, onAddToFavorite } = React.useContext(AppContext);
   const [isLoading, setIsLoading] = React.useState(true)
   const [orders, setOrders] = React.useState([])

   React.useEffect(() => {
      (async () => {
         try {
            const { data } = await axios.get('https://63ca4346d0ab64be2b4f3f3c.mockapi.io/Orders')
            setOrders(data.map((obj) => obj.items).flat());
            // setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
            setIsLoading(false)
         } catch (err) {
            alert('Ошибка при загрузке заказов')
            console.error(err)
         }

      })();
   })

   return (
      <div className="content p-40">
         <div className="d-flex align-center justify-between mb-40">
            <h1>Мои покупки</h1>
         </div>

         <div className="d-flex flex-wrap">
            {(isLoading ? [...Array(8)] : orders).map((item, index) =>
               <Card
                  key={index}
                  loading={isLoading}
                  {...item}
               />
            )}
         </div>
      </div>
   );
}

export default Orders;