import React from 'react';
import styles from './Card.module.scss'

import AppContext from '../../context';

import ContentLoader from "react-content-loader"

function Card({
   loading = false,
   id,
   imgUrl,
   title,
   price,
   onPlus,
   onFavorite = false,
   favorited = false
}) {


   const { isAddedToCart } = React.useContext(AppContext);
   const [isOnFavorite, setIsOnFavorite] = React.useState(favorited);
   const dataProps = { id, parentId: id, imgUrl, title, price }

   const onClickPlus = () => {
      onPlus(dataProps)
   }

   const onClickFavorite = () => {
      onFavorite(dataProps)
      setIsOnFavorite(!isOnFavorite);
   }


   // React.useEffect(() => { }, [isOnPlus])
   React.useEffect(() => { }, [isOnFavorite])


   return (
      <div className={styles.card}>
         {loading ? (<ContentLoader
            speed={2}
            width={210}
            height={230}
            viewBox="0 0 210 230"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
         >
            <rect x="0" y="0" rx="10" ry="10" width="150" height="127" />
            <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
            <rect x="0" y="146" rx="5" ry="5" width="150" height="15" />
            <rect x="0" y="166" rx="5" ry="5" width="90" height="15" />
            <rect x="0" y="203" rx="5" ry="5" width="80" height="24" />
            <rect x="118" y="195" rx="3" ry="3" width="32" height="32" />
         </ContentLoader>) :
            <>
               {onFavorite && <div className={styles.favorite} >
                  <img
                     onClick={onClickFavorite}
                     src={isOnFavorite ?
                        "img/liked.svg" :
                        "img/unliked.png"}
                     alt="Unliked" />
               </div>}
               <img width={133} height={112} src={imgUrl} alt="Sneakers" />
               <h5>{title}</h5>
               <div className="d-flex justify-between align-center">
                  <div className="d-flex flex-column">
                     <span>Цена:</span>
                     <b>{price} руб.</b>
                  </div>
                  {onPlus && <img
                     className={styles.plus}
                     onClick={onClickPlus}
                     src={isAddedToCart(id) ?
                        "img/btn-cheked.svg" :
                        "img/btn-plus.svg"
                     } alt="Plus"
                  />}
               </div>
            </>}

      </div>
   );
}

export default Card;