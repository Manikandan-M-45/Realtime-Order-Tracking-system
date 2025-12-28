import React from 'react'

const InfoCard = ({ icon, status, count, styles }) => {
  return (
    <div className='flex justify-between px-5 py-8 flex-1 lg:flex-2 rounded-2xl hover:cursor-pointer font-bold hover:-translate-y-4 transition-transform' style={styles}>
      <div>
        <p className='font-mono text-4xl font-extrabold'>{count}</p>
        <h2 className='text-2xl'>{status}</h2>
      </div>
      <div>
        <span>{icon}</span>
      </div>
    </div>
  )
}

export default InfoCard