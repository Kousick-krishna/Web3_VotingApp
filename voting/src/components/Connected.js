import React from 'react'

const Connected = (props) => {
  return (
    <div className='flex flex-col items-center'>
      <p className='text-3xl text-center pt-72'>You are connected to metamask</p>
      <p className='text-center'>Metamask account : {props.account}</p>
      <p className='text-center'>Remianining Time : {props.time}</p>
      { props.showButton ? (<p>You have already voted</p> ): 
      (
        <div>
        <input type='number' value={props.number} placeholder='Enter Canditate number' onChange={props.handleNumberChange}/>
        <button onClick={props.voteFunction} className='bg-blue-500 rounded-md p-4 m-2'>Vote</button>
        </div>
      )}

      <table className='border border-collapse w-96 border-blue-700 border-4'>
        <thead>
          <tr>
          <tr className='p-3 border border-b-2 border-black'>Index</tr>
          <tr className='p-3 border border-b-2 border-black'>Canditate name</tr>
          <tr className='p-3 border border-b-2 border-black'>Canditate votes</tr>
          </tr>
        </thead>
        <tbody>
          {props.canditates.map((canditate,index)=>{
            <tr key={index}>
              <td className='p-3 border border-b-2 border-black'>{canditate.index}</td>
              <td className='p-3 border border-b-2 border-black'>{canditate.name}</td>
              <td className='p-3 border border-b-2 border-black'>{canditate.voteCount}</td>
            </tr>
          })}
        </tbody>
      </table>
      
    </div>
  )
}

export default Connected
