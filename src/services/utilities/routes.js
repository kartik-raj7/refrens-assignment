import { lazy } from "react";

const routes = [
  {
    path: "/",
    component: lazy(() => import("../../pages/Homepage")),
    exact: true,
  },
  {
    path: "/home",
    component: lazy(() => import("../../pages/Homepage")),
    exact: true,
  },
  {
    path: "/viewprofile/:characterName",
    component: lazy(() => import("../../pages/Viewprofile")),
    exact: true,
  },
  {
    path: "/viewlocations",
    component: lazy(() => import("../../pages/viewlocations")),
    exact: true,
  },
  {
    path: "/viewepisodes",
    component: lazy(() => import("../../pages/viewepisodes")),
    exact: true,
  },
];

export default routes;
