<template>
  <div class="bg-gray-100 mx-[5%] min-h-screen text-center pb-8">
    <h1 class="text-6xl py-8">Forumi</h1>
    <div class="flex flex-col items-center mb-6">
      <div class="flex items-center w-1/3">
        <form class="pr-2 w-full">
          <input
            v-model="search"
            type="text"
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

    <add-forum />
    <large-list v-for="forum in filteredForums" :key="forum" :obj="forum" />
  </div>
</template>

<script>
import LargeList from "../components/LargeList.vue";
import AddForum from "../components/AddForum.vue";
import { db } from "@/firebase.js";

export default {
  name: "Forums",
  components: {
    LargeList,
    AddForum,
  },
  data() {
    return {
      listaForuma: [],
      search: "",
    };
  },

  mounted() {
    this.getForums();
  },

  computed: {
    filteredForums() {
      return this.listaForuma.filter((forum) => {
        return forum.title.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },

  methods: {
    getForums() {
      db.collection("forums")
        .get()
        .then((query) => {
          query.forEach((doc) => {
            this.listaForuma.push({
              title: doc.data().naziv,
              id: doc.id,
            });
          });
        });
    },
  },
};
</script>
