<template>
  <div class="flex justify-center items-start m-1 text-left">
    <div
      class="bg-white rounded w-[50%] border border-solid divide-y divide-gray-700 divide-opacity-25 cursor-pointer"
      :title="obj.title"
    >
      <router-link :to="{ name: 'Forum', params: obj }">
        <div
          class="px-4 py-6 flex justify-between items-center text-2xl hover:bg-gray-100/50 transition ease-in-out duration-300"
        >
          {{ obj.title }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-orange-500 invisible lg:visible"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["obj"],
  name: "LargeList",
  methods: {
    spaceRemove(str) {
      return str.replace(" ", "_");
    },
  },
  data() {
    return {
      link: this.spaceRemove(this.obj.title),
    };
  },
};
</script>
