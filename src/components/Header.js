import React from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../hooks/useCart';

function Header(props) {
   const { priceSum } = useCart();

   return (
      <header className="d-flex justify-between align-center p-40">
         <Link to="/">
            <div className="align-center d-flex">
               <img
                  width={80}
                  height={60}
                  src="https://raw.githubusercontent.com/SayFu11a/-/main/chrome_yD1kImMOnf.png"
                  alt="Logopng"
               />
               <div>
                  <h3>RentRooms</h3>
                  <p className="opacity-5">система для бронирования номеров в гостиницах</p>
               </div>
            </div>
         </Link>
         <ul className="d-flex">
            <li className="mr-30 cu-p" onClick={props.onClickCart}>
               <img
                  width={18}
                  height={17}
                  src="https://sayfu11a.github.io/react_sneakers-deploy/img/h02.svg"
                  alt="Cart"
               />
               <span>{priceSum} руб.</span>
            </li>
            <li className="mr-10 cu-p">
               <Link to="/favorites">
                  <img
                     onClick={props.onClickFavorite}
                     width={21}
                     height={19}
                     src="https://sayfu11a.github.io/react_sneakers-deploy/img/h03.svg"
                     alt="Закладки"
                  />
               </Link>
            </li>
            <li>
               <Link to="/orders">
                  <img
                     className="img-mr0"
                     width={20}
                     height={20}
                     src="https://sayfu11a.github.io/react_sneakers-deploy/img/h04.svg"
                     alt="User"
                  />
               </Link>
            </li>
         </ul>
      </header>
   );
}

export default Header;
