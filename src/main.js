import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { firebase } from "@/firebase";
import store from "@/store";

import "./index.css";

// ↓↓↓↓ Provjera korisnika prije učitavanja aplikacije

let app;
firebase.auth().onAuthStateChanged((user) => {
  console.log("Iz main.js ");
  if (!app) {
    if (user) {
      user
        .getIdTokenResult()
        .then((idTokenResult) => {
          // console.log("ONAJ TOKEN ONO", idTokenResult.claims);
          // User is signed in.
          console.log(
            "main.js iz firebase auth funkcije: ",
            user.email,
            user.uid
          );
          //user.admin = idTokenResult.claims.admin;
          store.currentUser = {
            userEmail: user.email,
            userId: user.uid,
            userName: user.displayName,
            isAdmin: idTokenResult.claims.admin,
          };
          console.log("%c Ubaceno u store.js!", "color:orange");
          app = createApp(App).use(router).mount("#app");
        })
        .catch((err) => console.error(err));
    } else {
      // User is not signed in.
      console.log("No user");
      store.currentUser = null;
      app = createApp(App).use(router).mount("#app");
    }
  }
});
