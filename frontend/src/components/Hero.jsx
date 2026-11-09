import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import pp_img0 from "../assets/pp_img0.png";
import p_img0_4 from "../assets/p_img0_4.webp";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    img: p_img0_4,
    title: ["HARRY", "POTTER"],
    subtitle: "THE MARAUDER'S MAP",
    tag: "NEVER SEEN BEFORE",
    word: "DROP",
  },
  {
    img: pp_img0,
    title: ["SOLAR", "PRINT"],
    subtitle: "LIMITED EDITION",
    tag: "NEW DROP",
    word: "SUN",
  },
];

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-sage">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="mySwiper"
      >
        {slides.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-[560px] sm:h-[78vh] min-h-[520px] w-full bg-sage">
              {/* diagonal layers: burgundy edge, cream band, product photo */}
              <div
                className="hidden md:block absolute inset-y-0 right-0 w-[64%] bg-burgundy"
                style={{ clipPath: "polygon(28% 0, 100% 0, 100% 100%, 0% 100%)" }}
              />
              <div
                className="hidden md:block absolute inset-y-0 right-0 w-[64%] bg-cream"
                style={{ clipPath: "polygon(32% 0, 100% 0, 100% 100%, 4% 100%)" }}
              />
              <div
                className="absolute inset-y-0 right-0 w-full md:w-[64%] overflow-hidden"
                style={{ clipPath: "var(--hero-clip)" }}
              >
                <img
                  src={item.img}
                  alt={item.title.join(" ")}
                  className="h-full w-full object-cover object-top"
                />
              </div>

              {/* text */}
              <div className="relative z-10 flex h-full max-w-7xl mx-auto items-center px-6 sm:px-10">
                <div className="max-w-[520px] bg-paper/85 md:bg-transparent p-5 md:p-0 rounded-md">
                  <p className="text-xs sm:text-sm tracking-[0.35em] text-burgundy font-semibold mb-4">
                    {item.tag}
                  </p>
                  <h1 className="font-display text-6xl sm:text-8xl md:text-[6.5rem] lg:text-[8rem] leading-[0.88] text-ink">
                    {item.title[0]}
                    <br />
                    <span className="text-burgundy">{item.title[1]}</span>
                  </h1>
                  <p className="mt-5 text-sm sm:text-base tracking-[0.25em] text-ink/80">
                    {item.subtitle}
                  </p>
                  <Link
                    to="/collection"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-burgundy px-8 py-3.5 text-sm font-semibold tracking-widest text-cream transition hover:bg-burgundy-light"
                  >
                    SHOP THE DROP <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
