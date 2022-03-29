import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { firebase } from "@/firebase";
import store from "@/store";

import "./index.css";

// ↓↓↓↓ Provjera korisnika prije učitavanja aplikacije
let app;
firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    if (user) {
      user
        .getIdTokenResult()
        .then((idTokenResult) => {
          store.currentUser = {
            userEmail: user.email,
            userId: user.uid,
            userName: user.displayName,
            isAdmin: idTokenResult.claims.admin,
          };
          app = createApp(App).use(router).mount("#app");
        })
        .catch((err) => console.error(err));
    } else {
      // ↓↓↓ Ako korisnik nije prijavljen
      store.currentUser = null;
      app = createApp(App).use(router).mount("#app");
    }
  }
});
