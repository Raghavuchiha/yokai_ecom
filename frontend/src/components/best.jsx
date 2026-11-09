import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './title';
import ProductItem from './productitem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const bestseller = products.filter((item) => item.bestseller).slice(0, 5);

  return (
    <section className='bg-cream/60 py-16 my-20'>
      <div className='text-center mb-10 px-4'>
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className='max-w-xl mx-auto text-sm sm:text-base text-ink/60'>
          The pieces everyone keeps coming back for.
        </p>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-5'>
        {bestseller.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </section>
  );
}
export default BestSeller;
