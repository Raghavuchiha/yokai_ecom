import React from 'react';

const About = () => {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center px-16 py-20">
      <img
        src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"
        alt="fashion"
        className="w-[450px] h-[480px] rounded-xl shadow-md object-cover"
      />
      <div className="md:ml-12 mt-8 md:mt-0 max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">
          ABOUT <span className="text-pink-500">US</span>
        </h2>
        <p className="text-gray-700 leading-relaxed">
          YOKAI started as a self-driven project to build a real, full-stack e-commerce
          platform from the ground up — not a tutorial clone, but a product built with
          production-grade practices: secure authentication, a proper database layer,
          and a smooth shopping experience end to end.
        </p>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Every part of this platform — from the backend architecture to the UI you're
          browsing right now — was designed and built with attention to detail, security,
          and scalability in mind.
        </p>
        <h3 className="font-bold mt-6 mb-2">Our Mission</h3>
        <p className="text-gray-700">
          To build software that doesn't just work, but works the way real products do —
          reliable, secure, and genuinely usable.
        </p>
      </div>
    </section>
  );
};

export default About;
