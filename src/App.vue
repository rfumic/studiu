<template>
  <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
  <Navbar :key="navKey" />
  <router-view />
</template>

<script>
import Navbar from "./components/Navbar.vue";
import store from "@/store";
import { firebase } from "@/firebase";
console.log("App.vue prije pozivanja funkcijed: ", store.currentUser);

export default {
  name: "app",
  data() {
    return {
      store,
      navKey: store.currentUser,
      //isAdmin: false,
    };
  },
  components: {
    Navbar,
  },
  mounted() {
    console.log("App.vue store:", store.currentUser);
  },
  watch: {
    navKey: function () {
      return store.currentUser;
    },
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
