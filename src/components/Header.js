import React from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../hooks/useCart'

function Header(props) {
   const { priceSum } = useCart()

   return (
      <header className="d-flex justify-between align-center p-40">
         <Link to="/">
            <div className="align-center d-flex">
               <img width={40} height={40} src="img/h001.png" alt="Logopng" />
               <div>
                  <h3>REACT SNEAKERS</h3>
                  <p className="opacity-5">Магазин лучших кроссовок</p>
               </div>
            </div>
         </Link>
         <ul className="d-flex">
            <li className="mr-30 cu-p" onClick={props.onClickCart}>
               <img width={18} height={17} src="img/h02.svg" alt="Cart" />
               <span>{priceSum} руб.</span>
            </li>
            <li className="mr-10 cu-p">
               <Link to="/favorites">
                  <img onClick={props.onClickFavorite} width={21} height={19} src="img/h03.svg" alt="Закладки" />
               </Link>
            </li>
            <li>
               <Link to="/orders">
                  <img className="img-mr0" width={20} height={20} src="img/h04.svg" alt="User" />
               </Link>
            </li>
         </ul>
      </header>
   );
}

export default Header;