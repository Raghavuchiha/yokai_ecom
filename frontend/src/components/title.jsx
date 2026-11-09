import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className='inline-flex gap-3 items-center mb-3'>
      <p className='font-display text-4xl sm:text-5xl text-ink'>
        {text1} <span className='text-burgundy'>{text2}</span>
      </p>
      <p className='w-8 sm:w-14 h-[3px] bg-burgundy'></p>
    </div>
  )
}

export default Title
