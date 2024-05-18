import { lazy } from "react";
const Default = lazy(() => import("pages/default"));
const Analysis = lazy(() => import("pages/analysis"));
const User = lazy(() => import("pages/admin"));
const Blog = lazy(() => import("pages/blogs"));
const Client = lazy(() => import("pages/clients"));
const Filial = lazy(() => import("pages/filials"));
const NotFound = lazy(() => import("pages/notFound"));
const LocalizationPanel = lazy(() => import("pages/localizationPanel"));
// const Login = lazy(() => import("pages/login"));

export interface IRoute {
  path: string;
  access?: string[] | "*";
  element: JSX.Element;
  inner?: IRoute[];
  index?: boolean;
  title: string;
}

const privateRoutes: IRoute[] = [
  {
    path: "/",
    access: ["admin", "user"],
    title: "Welcome",
    element: <Default />,
  },
  {
    path: "/profile",
    access: ["admin"],
    title: "Profile",
    element: <User />,
  },
  {
    path: "/analysis",
    access: ["admin"],
    title: "Analizlar",
    element: <Analysis />,
  },
  {
    path: "/blogs",
    access: ["admin"],
    title: "Bloglar",
    element: <Blog />,
  },
  {
    path: "/clients",
    access: ["admin"],
    title: "Mijozlar",
    element: <Client />,
  },
  {
    path: "/filials",
    access: ["admin"],
    title: "Filiallar",
    element: <Filial />,
  },
  {
    path: "/translations",
    access: ["admin"],
    title: "Translations",
    element: <LocalizationPanel />,
  },
  {
    path: "*",
    access: ["admin"],
    title: "",
    element: <NotFound />,
  },
];

const publicRoutes: IRoute[] = [
  // {
  //   path: "/login",
  //   access: [],
  //   title: "Login",
  //   element: <Login />,
  // },
];

export { privateRoutes, publicRoutes };
