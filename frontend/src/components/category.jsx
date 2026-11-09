import React from "react";
import { Link } from "react-router-dom";
import men from "../assets/men.png";
import wmn from "../assets/wmn.jpg";
import kd from "../assets/kd.jpg";

const cats = [
  { to: "/men", label: "MEN", img: men },
  { to: "/women", label: "WOMEN", img: wmn },
  { to: "/kid", label: "KIDS", img: kd },
];

const Categories = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-20">
      <h2 className="font-display text-5xl sm:text-6xl text-center mb-10">
        SHOP BY <span className="text-burgundy">CATEGORY</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {cats.map((c) => (
          <Link key={c.label} to={c.to} className="group block">
            <div className="relative h-72 overflow-hidden rounded-sm bg-sage">
              <img
                src={c.img}
                alt={c.label}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-cream">
                <h3 className="font-display text-4xl leading-none">{c.label}</h3>
                <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
