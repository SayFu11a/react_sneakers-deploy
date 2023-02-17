import React from "react";
import axios from "axios";

import Info from "../Info";
import { useCart } from '../../hooks/useCart'

import styles from "./Drawer.module.scss"
//===

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ onClickClose, onRemuve, cartItem = [], opened }) {
   const [orderId, setOrderId] = React.useState(null)
   const [isOrdered, setIsOrdered] = React.useState(false)
   const [isLoading, setIsLoading] = React.useState(false)

   const { priceSum, setCartItem } = useCart()

   console.log(opened);

   const onClickToOrderButt = async () => {
      try {
         setIsLoading(true)
         const { data } = await axios.post('https://63ca4346d0ab64be2b4f3f3c.mockapi.io/Orders', {
            items: cartItem,
         });
         setOrderId(data.id)
         setIsOrdered(true);
         setCartItem([]);

         for (let i = 0; i < cartItem.length; i++) {
            const item = cartItem[i];
            await axios.delete('https://63a826327989ad3286fb1b90.mockapi.io/cart/' + item.id)
            await delay(1000)
         }

      } catch (error) {
         alert('Не удалось выполнить заказ :(')
      }
      setIsLoading(false);
   }

   return (
      <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`} >
         <div className={styles.drawer}>

            <h2 className="mb-30 d-flex justify-between">
               Корзина
               <img onClick={onClickClose} className="removeBtn cu-p" src="img/btn-remove.svg" alt="Close" />
            </h2>

            {cartItem.length > 0 ? (
               <div className="d-flex flex-column flex">
                  <div className="items">
                     {cartItem.map((obj) => (
                        <div key={obj.id} className="cartItem d-flex align-center mb-20">
                           <div style={{ backgroundImage: `url(${obj.imgUrl})` }} className="cartItemImg"></div>
                           <div className="mr-20 flex">
                              <p className="mp-5">{obj.title}</p>
                              <b>{obj.price} руб.</b>
                           </div>
                           <img onClick={() => onRemuve(obj.id)} className="removeBtn" src="img/btn-remove.svg" alt="Remove" />
                        </div>
                     ))}
                  </div>
                  <div className="cartTotlaBlock">
                     <ul>
                        <li>
                           <span>Итого: </span>
                           <div></div>
                           <b>{priceSum} руб.</b>
                        </li>
                        <li >
                           <span>Налог 5%:</span>
                           <div></div>
                           <b>{Math.round(priceSum * 0.05)} руб.</b>
                        </li>
                     </ul>
                     {
                        // chenged----------------- 2:50:23
                     }
                     <button disabled={isLoading} onClick={onClickToOrderButt} className="greenButton">
                        Оформить заказ
                        <img src="img/arrow.svg" alt="Arrow" />
                     </button>
                  </div>
               </div>
            ) : (
               <Info
                  title={isOrdered ? "Заказ оформлен!" : "Корзина пустая"}
                  image={isOrdered ? "img/ordered.jpg" : "img/empty-cart.jpg"}
                  discription={isOrdered ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
               />
            )}

         </div>
      </div >
   );
}

export default Drawer;