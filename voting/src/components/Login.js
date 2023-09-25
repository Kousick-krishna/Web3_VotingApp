import React from 'react'

const Login = (props) => {
  return (
    <div className='flex flex-col items-center'>
        <p className='text-3xl text-center pt-72'>You are Welcome, Connect to Metamask</p>
        <button type='submit'onClick={props.connectWallet} className='bg-blue-500 rounded-md p-4 m-2' >Login</button>
    </div>
  )
}

export default Login
