<template>
  <div class="flex justify-center items-start m-1 px-2 text-left">
    <div
      class="bg-white rounded-3xl w-[50%] border border-solid cursor-pointer flex items-center hover:bg-gray-100/50 transition ease-in-out duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-20 w-20 text-orange-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
          clip-rule="evenodd"
        />
      </svg>
      <div class="text-xl px-5">Objavi u {{ title }}</div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddPost",
  props: ["title"],
};
</script>
