import { createBrowserRouter, Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import App from "../layout/App";
import ServerError from "../../features/errors/Server/ServerError";
import NotFound from "../../features/errors/NotFound/NotFound";
import HomePage from "../../features/pages/HomePage";
import ProductListPage from "../../features/pages/ProductListPage";
import ProductsTablePage from "../../features/pages/ProductsTablePage";
import CreateProductPage from "../../features/pages/CreateProductPage";
import EditProductPage from "../../features/pages/EditProductPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      { path: "products/list", element: <ProductListPage /> },
      { path: "products/table", element: <ProductsTablePage /> },
      { path: "products/create", element: <CreateProductPage /> },
      { path: "products/edit/:id", element: <EditProductPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="/not-found" /> }
    ]
  }
];

export const Router = createBrowserRouter(routes);