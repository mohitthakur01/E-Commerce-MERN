import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ProductDetail from "./pages/ProductDetail"


const router = createBrowserRouter([
  {index: true , element: <Home/>},
  {path: '/login', element: <Login/>},
  {path: '/signup', element: <Signup/>},
  {path: '/product/:id', element: <ProductDetail/>}
])

const App = () => {
  return <RouterProvider router={router}/>
} 

export default App;