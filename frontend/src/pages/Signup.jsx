import {useState, useEffect} from 'react'
import api from '../api/axios.js'

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  })

  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/signup', form)
      setMessage(response.data.message)
    } catch (err) {
      setMessage(err.response?.data?.message|| 'An error occur')
    }
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  return (
    
      <div className=' flex items-center flex-col gap-10 justify-center w-full h-[100vh] bg-[#FOFOFO] '>
        <div>
          <h1 className='text-5xl'>
            Create Your Account
          </h1>
        </div>
      <div className='w-[50%]  bg-white rounded-2xl shadow-2xl  h-auto  p-10 flex flex-col items-center justify-center gap-5'>
        {
        message &&
        <div className='text-red-500 text-xl  '>
          {message}
          </div> 
          }
          <div>
            <h2 className='text-2xl'>
              Sign In
            </h2>
          </div>
          <form action="" 
          onSubmit={(e)=> {
            handleSubmit(e)
          }}
          className='flex flex-col gap-4 w-full'
           >
            <input 
            value={form.name}
            name="name" 
            type= 'text'
            placeholder=' Enter Your Name'
            onChange={handleChange}
            required
            className='w-full outline-blue-500 border rounded border-gray-500 p-2'
            />
            <input 
            value={form.username}
            name="username" 
            type="text"
            placeholder=' Enter Username'
            onChange={handleChange}
            required
            className='w-full outline-blue-500 border rounded border-gray-500 p-2'
            />
            <input 
            value={form.email}
            name="email" 
            type="email"
            placeholder='example@eg.com'
            onChange={handleChange}
            required
            className='w-full outline-blue-500 border rounded border-gray-500 p-2'
            />
            <input 
            value={form.password}
            name="password" 
            type="password"
            placeholder='Enter Your Password'
            onChange={handleChange}
            required
            className='w-full outline-blue-500 border rounded border-gray-500 p-2'
            />
            <button className='w-full py-2 bg-blue-400 rounded text-white text-xl cursor-pointer hover:bg-blue-300 duration-[1000ms] hover:translate-y-[-1px]'> 
              Create Account
            </button>

          </form>

      </div>

    </div>
  )
}

export default Signup