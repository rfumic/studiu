<template>
  <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from "./components/Navbar.vue";
import store from "@/store";
import { firebase } from "@/firebase";
console.log("App.vue prije pozivanja funkcijed: ", store.currentUser);

firebase.auth().onAuthStateChanged((user) => {
  console.log("app.vue pozvana je firebase fubkcija");
  if (user) {
    // User is signed in.
    console.log("app.vue iz firebase auth funkcije: ", user.email);
    store.currentUser = user.email;
  } else {
    // User is not signed in.
    console.log("No user");
    store.currentUser = null;
  }
  console.log("Iz app.vue", store.currentUser);
});

export default {
  name: "app",
  data() {
    return {
      store,
    };
  },
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
</style>
