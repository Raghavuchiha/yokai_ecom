import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./productitem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const latestProducts = products.slice(0, 10);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-20">
      <div className="text-center mb-10">
        <h2 className="font-display text-5xl sm:text-6xl">
          LATEST <span className="text-burgundy">COLLECTIONS</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-ink/60">
          Fresh drops, made to be worn on repeat.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-10">
        {latestProducts.map((item, index) => (
          <div
            key={item._id ?? index}
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 0.06}s` }}
          >
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestCollection;
