import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { firebase } from "@/firebase";

import "./index.css";

// ↓↓↓↓ Provjera korisnika prije učitavanja aplikacije

let app;
firebase.auth().onAuthStateChanged((user) => {
  console.log("Iz main.js ");
  if (!app) {
    app = createApp(App).use(router).mount("#app");
  }
});
