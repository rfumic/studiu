<template>
  <div
    class="flex items-center mx-[5%] justify-center min-h-screen bg-gray-100"
  >
    <div class="px-20 py-8 mt-4 text-left bg-white shadow-lg">
      <h3 class="text-5xl font-bold text-center px-20">Registracija</h3>
      <form action="">
        <div class="mt-4">
          <div>
            <label class="block text-3xl" for="username">Korisničko ime</label>
            <input
              type="text"
              placeholder="Korisničko ime"
              class="text-xl w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-3xl mt-4" for="email">Email</label>
            <input
              type="text"
              placeholder="Email"
              class="text-xl w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div class="mt-4">
            <label class="block text-3xl">Lozinka</label>
            <input
              type="password"
              placeholder="Lozinka"
              class="w-full px-4 py-2 text-xl mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div class="mt-4">
            <label class="block text-3xl">Potvrdi lozinku</label>
            <input
              type="password"
              placeholder="Potvrdi lozinku"
              class="w-full px-4 py-2 text-xl mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div class="flex items-baseline justify-between">
            <button
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
  </div>
</template>
