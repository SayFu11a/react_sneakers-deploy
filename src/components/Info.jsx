import React from 'react'
import AppContext from '../context'

export const Info = ({ title, image, discription }) => {
   const { setIsCartOpened } = React.useContext(AppContext)

   return (
      <div className="cartEmpty d-flex align-center justify-center flex-column flex">
         <img className="mb-20"
            width="120px"
            src={image}
            alt="Empty"
         />
         <h2>{title}</h2>
         <p className="opacity-6">{discription}</p>
         <button onClick={() => setIsCartOpened(false)} className="greenButton">
            <img src="img/arrow.svg" alt="Arrow" />
            Вернуться назад
         </button>
      </div>
   )
}


export default Info

