<template>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div> -->
  <div class="bg-gray-100 mx-[5%] h-screen text-center">
    <div
      class="w-[59.66%] h-[49.2%] relative left-[20%] top-[12.5%] flex flex-col"
    >
      <h1 class="text-5xl">Dobro došli na</h1>
      <img
        src="@/assets/Studiu_Logo.png"
        alt="Studiu"
        class="w-[50%] mx-[25%]"
      />
      <h2 class="text-4xl mx-[15%]">
        Razgovaraj s drugim studentima, pomozi drugima i nauči nešto novo!
      </h2>

      <button
        @click="$router.push('signup')"
        class="bg-orange-500 rounded-full h-[15%] w-[29%] my-5 ml-[35%]"
      >
        <h2 class="text-2xl text-white">Pridruži se razgovoru!</h2>
      </button>

      <a
        href="#"
        @click="$router.push('login')"
        class="text-gray-500 hover:text-gray-700 underline"
        >Imaš račun? Prijavi se!</a
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
