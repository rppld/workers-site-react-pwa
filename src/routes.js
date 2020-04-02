import Dogs from "./dogs";
import Home from "./home";

export default [
  {
    exact: true,
    path: "/",
    component: Home
  },
  {
    path: "/dogs/",
    component: Dogs
  }
];
