import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import Products from "./admin/Products";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";

function Layout() {
  return(
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "/admin/products/add", element: <AddProduct /> },
      { path: "/admin/products", element: <Products /> },
      { path: "/admin/products/update/:id", element: <EditProduct /> },
      {path: "/cart" , element: <Cart/>}
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
