import Vue from "vue";
import Router from "vue-router";

import Search from "../pages/Search";
import Provider from "../pages/Provider";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "Search",
    component: Search
  },
  {
    path: "/provider",
    name: "Provider",
    component: Provider,
    props: true
  }
];

export default new Router({
  routes
});
