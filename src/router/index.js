import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import { firebase } from "@/firebase";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
  },
  {
    path: "/forums",
    name: "Forums",
    meta: { requiresAuth: true },

    component: () => import("../views/Forums.vue"),
  },
  {
    path: "/ForumPosts",
    name: "ForumPosts",
    component: () => import("../views/ForumPosts.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/PostView",
    name: "PostView",
    component: () => import("../views/PostView.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (!requiresAuth && isAuthenticated) {
    next("/forums");
  } else {
    next();
  }
});

export default router;
