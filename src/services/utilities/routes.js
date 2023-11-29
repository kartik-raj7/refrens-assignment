import { lazy } from "react";

const routes = [
  {
    path: "/",
    component: lazy(() => import("../../pages/homepage")),
    exact: true,
  },
  {
    path: "/home",
    component: lazy(() => import("../../pages/homepage")),
    exact: true,
  },
  {
    path: "/viewprofile/:characterName",
    component: lazy(() => import("../../pages/viewprofile")),
    exact: true,
  },
];

export default routes;
