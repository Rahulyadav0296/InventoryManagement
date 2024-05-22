import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BrandCreate from "./components/Brands/BrandCreate";
import BrandUpdate from "./components/Brands/BrandUpdate";
import BrandView from "./components/Brands/BrandView";
import BrandList from "./components/Brands/Brands";
import CustomerCreate from "./components/Customers/CustomerCreate";
import CustomerUpdate from "./components/Customers/CustomerUpdate";
import CustomerView from "./components/Customers/CustomerView";
import Customer from "./components/Customers/Customers";
import ProductCreate from "./components/Products/ProductCreate";
import ProductUpdate from "./components/Products/ProductUpdate";
import Products from "./components/Products/Products";
import ProductCategoryCreate from "./components/ProductsCategory/ProductCategoryCreate";
import ProductCategoryUpdate from "./components/ProductsCategory/ProductCategoryUpdate";
import ProductCategoryView from "./components/ProductsCategory/ProductCategoryView";
import ProductCategory from "./components/ProductsCategory/ProductsCategory";
import UserCreate from "./components/Users/UserCreate";
import UserList from "./components/Users/UserList";
import UserUpdate from "./components/Users/UserUpdate";
import UserView from "./components/Users/UserView";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Root from "./pages/Root";
import { AuthProvider } from "./utils/AutheContext";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
      {
        path: "users",
        element: <UserList />,
        children: [
          { path: "create", element: <UserCreate /> },
          { path: "view/:id", element: <UserView /> },
          { path: "update/:id", element: <UserUpdate /> },
        ],
      },
      {
        path: "products",
        element: <Products />,
        children: [
          { path: "create", element: <ProductCreate /> },
          { path: "view/:id", element: <ProductCategoryView /> },
          { path: "update/:id", element: <ProductUpdate /> },
        ],
      },
      {
        path: "brands",
        element: <BrandList />,
        children: [
          { path: "create", element: <BrandCreate /> },
          { path: "view/:id", element: <BrandView /> },
          { path: "update/:id", element: <BrandUpdate /> },
        ],
      },
      {
        path: "product-categories",
        element: <ProductCategory />,
        children: [
          { path: "create", element: <ProductCategoryCreate /> },
          { path: "view/:id", element: <ProductCategoryView /> },
          { path: "update/:id", element: <ProductCategoryUpdate /> },
        ],
      },
      {
        path: "customers",
        element: <Customer />,
        children: [
          { path: "create", element: <CustomerCreate /> },
          { path: "view/:id", element: <CustomerView /> },
          { path: "update/:id", element: <CustomerUpdate /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
}

export default App;
