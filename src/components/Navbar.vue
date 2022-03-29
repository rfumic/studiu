<template>
  <nav class="bg-orange-500 h-[64px] drop-shadow-xl">
    <div
      class="mx-[5%] h-[64px] grid grid-cols-12 gap-[0.75%] place-items-center"
    >
      <div class="col-span-2 h-[64px]">
        <router-link to="/">
          <img
            src="@/assets/Studiu_Logo_White.png"
            alt="STUDIU"
            class="h-[64px]"
          />
        </router-link>
      </div>
      <div class="col-span-2"></div>
      <div class="col-span-4 container h-[50%]"></div>
      <div></div>
      <router-link
        to="/forums"
        v-show="loggedIn"
        class="flex text-white hover:text-gray-200 hover:scale-110 hover:-rotate-1 transition ease-in-out"
        >{{ username }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          v-show="isAdmin"
        >
          <path
            fill-rule="evenodd"
            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
      </router-link>
      <router-link
        v-show="!loggedIn"
        to="/login"
        class="text-white hover:text-gray-200 hover:scale-110 hover:-rotate-1 transition ease-in-out"
      >
        Prijava
      </router-link>
      <a
        v-show="loggedIn"
        href="#"
        @click.prevent="logout()"
        class="text-white hover:text-gray-200 hover:scale-110 transition ease-in-out hover:rotate-1"
      >
        Odjava
      </a>

      <router-link
        v-show="!loggedIn"
        to="/signup"
        class="text-white hover:text-gray-200 hover:scale-110 transition ease-in-out hover:rotate-1"
      >
        Registracija
      </router-link>
    </div>
  </nav>
</template>

<script>
import { firebase } from "@/firebase";
import store from "@/store";

export default {
  name: "navbar",
  data() {
    return {
      loggedIn: false,
      username: "",
      isAdmin: false,
    };
  },

  watch: {
    $route(to, from) {
      this.isAdmin = store.currentUser ? store.currentUser.isAdmin : false;
      this.loggedIn = !!store.currentUser;
      this.username = store.currentUser ? store.currentUser.userName : "";
    },
  },

  methods: {
    async logout() {
      try {
        const data = await firebase.auth().signOut();
        store.currentUser = null;
        this.$router.replace({ name: "Login" });
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
