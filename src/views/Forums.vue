<template>
  <div class="bg-gray-100 mx-[5%] min-h-screen text-center pb-8">
    <h1 class="text-6xl py-8">Forumi</h1>
    <large-list v-for="forum in listaForuma" :key="forum" :title="forum" />
  </div>
</template>

<script>
// @ is an alias to /src
import LargeList from "../components/LargeList.vue";
import { db } from "@/firebase.js";

/* let listaForuma = [];

// PRIVREMENO vvv
listaForuma = [
  { title: "Strukture podataka i algoritmi" },
  { title: "Operacijski sustavi" },
  { title: "Baze podataka" },
  { title: "Ekonomija" },
  { title: "Funkcijsko programiranje" },
  { title: "Makroekonomija" },
  { title: "Mehanika fluida" },
  { title: "Latinski jezik" },
  { title: "Funkcijsko programiranje" },
  { title: "Funkcijsko programiranje" },
]; */

export default {
  name: "Forums",
  data() {
    return {
      listaForuma: [],
    };
  },
  mounted() {
    console.log("MOUNTED");
    this.getForums();
  },
  methods: {
    getForums() {
      console.log("Firebase dohvat");

      db.collection("forums")
        .get()
        .then((query) => {
          query.forEach((doc) => {
            this.listaForuma.push({
              title: doc.data().naziv,
            });
          });
        });
    },
  },
  components: {
    LargeList,
  },
};
</script>
