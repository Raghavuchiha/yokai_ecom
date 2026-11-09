import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className='group block cursor-pointer text-ink' to={`/product/${id}`}>
      <div className='overflow-hidden rounded-sm bg-sage/30'>
        <img
          className='w-full transition duration-500 ease-out group-hover:scale-105'
          src={image?.[0]}
          alt={name || ""}
        />
      </div>
      <p className='pt-3 pb-1 text-sm text-ink/80 line-clamp-1'>{name}</p>
      <p className='text-sm font-semibold text-burgundy'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
