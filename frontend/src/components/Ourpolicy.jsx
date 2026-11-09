import React from 'react';
import { assets } from '../assets/assets';

const items = [
  { icon: assets.exchange_icon, title: 'Easy Exchange Policy', text: 'Free exchanges, no questions asked.' },
  { icon: assets.quality_icon, title: '7 Day Return Policy', text: 'Return any order within 7 days.' },
  { icon: assets.support_img, title: 'Best Customer Support', text: 'We are here for you, 24/7.' },
];

const OurPolicy = () => {
  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 my-20 grid grid-cols-1 sm:grid-cols-3 gap-5'>
      {items.map((it) => (
        <div key={it.title} className='rounded-sm border border-sage bg-paper p-8 text-center'>
          <img src={it.icon} className='w-10 mx-auto mb-5' alt='' />
          <p className='font-semibold tracking-wide text-ink'>{it.title}</p>
          <p className='mt-1 text-sm text-ink/60'>{it.text}</p>
        </div>
      ))}
    </section>
  )
}
export default OurPolicy;
