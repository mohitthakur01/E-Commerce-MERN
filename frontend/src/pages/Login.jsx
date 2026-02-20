import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios.js";


const Login = () => {
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form)
      
      // save token
      localStorage.setItem('token', res.data.token);

      setMessage('Login Successfully. Home page is Loading...')
      // Redirect to homepage
      setTimeout(() => {
        navigate('/')
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error Occurred')
    }
  };

  return (
    <div className="flex items-center flex-col gap-10 justify-center w-full h-[100vh] bg-[#FOFOFO]">
      <div className=" flex flex-col justify-center items-center gap-5 w-[60%] rounded-2xl shadow-2xl  h-auto p-10">
        <h2 className="text-2xl ">Login </h2>
        {message && <div>{message}</div>}

        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-5 "
        >
          <input
            type="text"
            name="identifier"
            placeholder="username or email"
            onChange={handleChange}
            required
            className="w-full outline-blue-500 border rounded border-gray-500 p-2"
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            required
            className="w-full outline-blue-500 border rounded border-gray-500 p-2"
          />
          <button className="w-full py-2 bg-blue-400 rounded text-white text-xl cursor-pointer hover:bg-blue-300 duration-[1000ms] hover:translate-y-[-1px]">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
