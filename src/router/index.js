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
    props: true,
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
    path: "/Forum/:id",
    name: "Forum",
    component: () => import("../views/Forum.vue"),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/Post/:id",
    name: "PostView",
    component: () => import("../views/PostView.vue"),
    meta: { requiresAuth: true },
    props: true,
  },

  // Redirect
  {
    path: "/forumi",
    redirect: "/forums",
  },
  {
    path: "/prijava",
    redirect: "/login",
  },
  {
    path: "/registracija",
    redirect: "/signup",
  },
  {
    path: "/post",
    redirect: "/PostView",
  },
  {
    path: "/objava",
    redirect: "/PostView",
  },

  // 404
  {
    path: "/:catchAll(.*)",
    name: "NePostoji",
    component: () => import("@/views/NePostoji.vue"),
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
