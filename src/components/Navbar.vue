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
        <form>
          <input
            type="search"
            placeholder="Pretraži Studiu"
            class="container border border-gray-400 px-2 focus:outline-none focus:ring-2"
          />
        </form>
      </div>
      <div class=""></div>
      <div class="bg-white h-[48px] w-[48px]">
        <!-- <img
            src="@/assets/pfp.png"
            alt="PFP"
            class="h-[90%] w-[90%] place-content-center"
          /> -->
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
};
</script>
