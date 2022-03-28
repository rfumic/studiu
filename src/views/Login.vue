<template>
  <div
    class="flex items-baseline mx-[5%] justify-center min-h-screen bg-gray-100"
  >
    <div
      class="px-20 py-6 mt-40 text-left bg-white shadow-lg w-[60%] rounded-3xl"
    >
      <h3 class="text-5xl text-center">Prijava</h3>
      <form action="">
        <div class="mt-4">
          <div>
            <label class="block text-2xl" for="email">Email</label>
            <input
              v-model="email"
              type="text"
              placeholder="Email"
              class="text-lg w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div class="mt-4">
            <label class="block text-2xl">Lozinka</label>
            <input
              v-model="password"
              @keyup.enter="login()"
              type="password"
              placeholder="Lozinka"
              class="w-full px-4 py-2 text-lg mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div class="flex items-baseline justify-between">
            <button
              class="text-lg px-6 py-2 mt-4 transition-all text-white bg-orange-500 rounded-lg hover:bg-white hover:ring-1 hover:ring-orange-500 hover:ring-inset hover:text-orange-500"
              @click="login()"
              type="button"
            >
              Prijava
            </button>
            <a
              href="#"
              class="text-lg text-orange-500 hover:underline"
              @click="$router.push('signup')"
              >Nemaš račun? Registriraj se!</a
            >
          </div>
        </div>
      </form>
      <div
        v-show="showWarning"
        class="w-full rounded-full text-md text-white bg-red-400 m-4 flex flex-col justify-center p-2 transition-all items-center"
      >
        <div>
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase, db } from "@/firebase";
import store from "@/store";

export default {
  props: ["warning"],
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      showWarning: false,
    };
  },
  mounted() {
    if (this.warning) {
      this.error = this.warning;
      this.showWarning = true;
    }
  },
  methods: {
    async logout(email) {
      try {
        const data = await firebase.auth().signOut();
        console.log(data);
        store.currentUser = null;
        this.$router.replace({
          name: "Login",
          params: {
            warning: `Korisnik ${email} je blokiran sa Studiu`,
          },
        });
      } catch (err) {
        console.error(err);
      }
    },
    async isUserBanned(uid) {
      try {
        let result = await db
          .collection("users")
          .doc(uid)
          .get()
          .then((doc) => {
            if (doc.exists) return doc.data().isBanned;
          });
        return result;
      } catch (err) {
        console.error(err);
      }
    },
    login() {
      console.log("Login", this.email);
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          firebase
            .auth()
            .currentUser.getIdTokenResult()
            .then(async (idTokenResult) => {
              const isBanned = await this.isUserBanned(result.user.uid);
              if (isBanned) {
                this.logout(this.email);
              } else {
                console.log("%c HERE!!!!", "color:green", idTokenResult.email);
                store.currentUser = {
                  userEmail: result.user.email,
                  userId: result.user.uid,
                  userName: result.user.displayName,
                  isAdmin: idTokenResult.claims.admin,
                };
              }
            });

          console.log(
            "Uspješna prijava",
            result.user.email,
            result.user.uid,
            result.user.displayName
          );
        })
        .then(() => {
          this.$router.replace({ name: "Forums" });
        })
        .catch((error) => {
          console.error("Greška", error);
          this.error = error.message.replace("Firebase: ", "");
          this.showWarning = true;
        });
    },
  },
};
</script>
