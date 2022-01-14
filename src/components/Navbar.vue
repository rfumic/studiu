<template>
  <nav class="bg-orange-500 h-[64px] drop-shadow-xl">
    <!-- div za grid vvvv -->
    <div
      @click="test()"
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
        <div class="flex items-center">
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
        </div>
      </div>
      <div></div>
      <!-- <div class="bg-white h-[48px] w-[48px]">
        
      </div>
       -->
      <router-link
        v-if="!currentUser"
        to="/login"
        class="text-white hover:text-gray-200 hover:scale-110 hover:-rotate-1 transition ease-in-out"
      >
        Prijava
      </router-link>
      <router-link
        v-if="!currentUser"
        to="/signup"
        class="text-white hover:text-gray-200 hover:scale-110 transition ease-in-out hover:rotate-1"
      >
        Registracija
      </router-link>
      <router-link to="/forums" v-if="currentUser">Forumi</router-link>
      <a
        v-if="currentUser"
        href="#"
        @click.prevent="logout()"
        class="text-white hover:text-gray-200 hover:scale-110 transition ease-in-out hover:rotate-1"
      >
        Odjava
      </a>
    </div>
  </nav>
</template>

<script>
import { firebase } from "@/firebase";
import store from "@/store";
//console.log("iz navbara prva", currentUser);

export default {
  name: "navbar",
  props: ["currentUser"],
  data() {
    return {
      store,
      cUser: this.currentUser,
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "Login" });
        });
    },
    test() {
      console.log("Sa navbar komponente user:", this.cUser);
    },
  },
};
</script>
