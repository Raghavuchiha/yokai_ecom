import React from 'react'

const Newsletter = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  }

  return (
    <section className='bg-burgundy text-cream py-16 px-4 text-center'>
      <p className='font-display text-4xl sm:text-5xl'>SUBSCRIBE NOW & GET 20% OFF</p>
      <p className='mt-3 text-cream/70'>Early access to drops, straight to your inbox.</p>
      <form
        onSubmit={onSubmitHandler}
        className='w-full sm:w-1/2 max-w-xl flex items-center gap-3 mx-auto mt-8 rounded-full bg-cream p-1.5'
      >
        <input
          className='w-full flex-1 bg-transparent px-5 text-ink placeholder:text-ink/50 outline-none'
          type='email'
          placeholder='Enter your email'
        />
        <button
          type='submit'
          className='rounded-full bg-burgundy px-8 py-3 text-xs font-semibold tracking-widest text-cream transition hover:bg-burgundy-light'
        >
          SUBSCRIBE
        </button>
      </form>
    </section>
  )
}
export default Newsletter;
