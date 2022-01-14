<template>
  <div
    class="flex items-baseline mx-[5%] justify-center min-h-screen bg-gray-100"
  >
    <div
      class="px-20 py-6 mt-40 text-left bg-white shadow-lg w-[60%] rounded-3xl"
    >
      <h3 class="text-5xl text-center px-20">Registracija</h3>
      <form action="">
        <div class="mt-4">
          <div>
            <label class="block text-2xl" for="username">Korisničko ime</label>
            <input
              v-model="username"
              type="text"
              placeholder="Korisničko ime"
              class="text-lg w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-2xl mt-4" for="email">Email</label>
            <input
              type="text"
              v-model="email"
              placeholder="Email"
              class="text-lg w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div class="mt-4">
            <label class="block text-2xl">Lozinka</label>
            <input
              v-model="password"
              type="password"
              placeholder="Lozinka"
              class="w-full px-4 py-2 text-lg mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div class="mt-4">
            <label class="block text-2xl">Potvrdi lozinku</label>
            <input
              v-model="passwordRepeat"
              type="password"
              placeholder="Potvrdi lozinku"
              class="w-full px-4 py-2 text-lg mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div class="flex items-baseline justify-between">
            <button
              @click="passwordCheck"
              type="button"
              class="text-lg px-6 py-2 mt-4 transition-all text-white bg-orange-500 rounded-lg hover:bg-white hover:ring-1 hover:ring-orange-500 hover:ring-inset hover:text-orange-500"
            >
              Registracija
            </button>
            <a
              href="#"
              class="text-lg text-orange-500 hover:underline"
              @click="$router.push('login')"
              >Imaš račun? Prijavi se!</a
            >
          </div>
        </div>
      </form>
    </div>
    <div
      v-show="showWarning"
      class="w-1/2 rounded-full text-md text-white bg-red-400 m-4 flex flex-col justify-center p-2 transition-all items-center"
    >
      <div>
        {{ warningText }}
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from "@/firebase";

export default {
  name: "Signup",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
      showWarning: false,
      warningText: "",
    };
  },
  methods: {
    signup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log("Uspješna registracija");
        })
        .catch((error) => {
          console.error("Došlo je do greške", error);
        });
      console.log("Nastavak");
    },
    passwordCheck() {
      this.showWarning = false;
      console.log("Pozvana je funkcija za provjeru lozinke");

      const userWarn = () => {
        if (this.showWarning == false) this.showWarning = true;
      };

      // ↓↓↓↓ Provjera popunjenost forme
      if (!(this.email && this.password && this.passwordRepeat)) {
        this.warningText = "Potrebno je popuniti sva polja!";
        userWarn();
        return;
      }

      // ↓↓↓↓ Provjera ispravnosti maila
      const mailCheck = () => {
        var re = /\S+@\S+\.\S+/;
        return re.test(this.email);
      };
      if (!mailCheck()) {
        this.warningText = "Potrebno je unesti pravi email";
        userWarn();
        return;
      }

      // ↓↓↓↓ Provjera poklapanja lozinki
      if (this.password != this.passwordRepeat) {
        this.warningText = "Lozinke se ne poklapaju!";
        userWarn();
        return;
      }

      // ↓↓↓↓ Provjera dužine lozinke
      if (this.passwordRepeat.length < 6) {
        this.warningText = "Lozinka mora imati najmanje 6 znakova!";
        userWarn();
        return;
      }

      this.signup();
    },
  },
};
</script>
