<template>
  <div id="nav-mozdamakni">
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
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
  </div>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
