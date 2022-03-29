<template>
  <Navbar :key="navKey" />
  <router-view />
</template>

<script>
import Navbar from "./components/Navbar.vue";
import store from "@/store";

export default {
  name: "app",
  components: {
    Navbar,
  },

  data() {
    return {
      store,
      navKey: store.currentUser,
    };
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
  color: #2c3e50;
}
</style>
