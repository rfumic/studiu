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
    user
      .getIdTokenResult()
      .then((idTokenResult) => {
        // console.log("ONAJ TOKEN ONO", idTokenResult.claims);
        // User is signed in.
        console.log(
          "app.vue iz firebase auth funkcije: ",
          user.email,
          user.uid
        );
        user.admin = idTokenResult.claims.admin;
        store.currentUser = {
          userEmail: user.email,
          userId: user.uid,
          userName: user.displayName,
          //isAdmin: idTokenResult.claims.admin,
        };
      })
      .catch((err) => console.error(err));
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
      //isAdmin: false,
    };
  },
  components: {
    Navbar,
  },
  mounted() {},
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
