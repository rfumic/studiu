<template>
  <nav class="bg-orange-500 h-[64px] drop-shadow-xl">
    <!-- div za grid vvvv -->
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
      <div class="col-span-4 container h-[50%]">
        <!-- <div class="flex items-center" v-show="loggedIn">
          <form class="pr-2 w-full">
            <input
              type="search"
              placeholder="Pretraži Studiu"
              class="container border border-gray-400 rounded-md px-2 focus:outline-none focus:ring-1"
            />
          </form>
          <svg
            class="text-gray-600 h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            style="enable-background: new 0 0 56.966 56.966"
            xml:space="preserve"
            width="512px"
            height="512px"
          >
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
            />
          </svg>
        </div> -->
      </div>
      <div></div>
      <!-- <div class="bg-white h-[48px] w-[48px]">
        
      </div>
       -->

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

console.log("Iz navbara: ", firebase.auth().currentUser);

export default {
  // props: ["isAdmin"],
  name: "navbar",
  /*  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.loggedIn = !!user;
      console.log("navbar CREATED", this.loggedIn);
      //if (user) {
      this.username = firebase.auth().currentUser
        ? firebase.auth().currentUser.displayName
        : null;
      console.log("TU GLEDAJ", store.currentUser.isAdmin);
      //this.isAdmin = store.currentUser.isAdmin;
      console.log("Is logged in?", this.loggedIn);
      //}
    });

    // console.log("isAdmin? ", this.isAdmin);
    console.log("CREATED U NAVBAR", store.currentUser);
  }, */

  mounted() {
    //this.loggedIn = !!store.currentUser;
    //  this.username = store.currentUser.userName;
    console.log("Mounta li se ovo?");
  },

  data() {
    return {
      loggedIn: false,
      username: "",
      isAdmin: false,
    };
  },

  /*  computed: {
    isAdmin: function () {
      console.log("Pokrenuo se izadmincomoputed");
      return store.currentUser ? store.currentUser.isAdmin : false;
    },
    loggedIn: function () {
      return !!store.currentUser;
    },
    username: function () {
      return store.currentUser ? store.currentUser.userName : "";
    },
  }, */
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
        console.log(data);
        store.currentUser = null;
        this.$router.replace({ name: "Login" });
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
