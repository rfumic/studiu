<template>
  <div class="flex justify-center items-start m-1 px-2 text-left">
    <div
      :class="!isOpen ? 'd-block' : 'hidden'"
      @click="isOpen = !isOpen"
      class="bg-white rounded-3xl w-1/2 border border-solid cursor-pointer flex items-center hover:bg-gray-100/50 transition ease-in-out duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10 text-orange-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
          clip-rule="evenodd"
        />
      </svg>
      <div class="text-lg px-5">Objavi u {{ title }}</div>
      <div></div>
    </div>

    <div
      :class="isOpen ? 'd-block' : 'hidden'"
      class="bg-white rounded-3xl w-1/2 items-center border border-solid flex flex-col transition ease-in-out duration-300"
    >
      <form class="flex flex-col w-3/4 p-4">
        <label for="title" class="text-2xl py-2">Naslov objave: </label>
        <input
          type="text"
          class="border px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Naslov..."
          v-model="postTitle"
        />
        <label for="content" class="text-2xl py-2">Sadržaj:</label>
        <textarea
          v-model="postContent"
          placeholder="Sadržaj..."
          rows="3"
          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        ></textarea>

        <div class="flex justify-between w-full">
          <button
            type="button"
            @click="objaviPost()"
            class="text-sm mx-2 px-6 py-2 mt-4 text-white bg-orange-500 transition-all rounded-lg hover:bg-white hover:ring-1 hover:ring-orange-500 hover:ring-inset hover:text-orange-500"
          >
            Objavi
          </button>
          <button
            @click="isOpen = !isOpen"
            type="button"
            class="text-sm px-6 py-2 mt-4 text-gray-500 bg-white border rounded-lg transition-all hover:bg-white hover:ring-1 hover:ring-orange-500 hover:ring-inset hover:text-orange-500"
          >
            Otkaži
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { db, firebase } from "@/firebase";
import store from "@/store";

export default {
  name: "AddPost",
  props: ["title", "forumID"],
  data() {
    return {
      isOpen: false,
      postTitle: "",
      postContent: "",
    };
  },
  methods: {
    async objaviPost() {
      console.log(this.postTitle);
      console.log(this.postContent);
      console.log(this.title);
      console.log(store.currentUser);

      await db.collection("posts").add({
        user: store.currentUser.userId,
        content: this.postContent,
        title: this.postTitle,
        posted_at: Date.now(),
        posted_in: this.forumID,
      });
      (this.postTitle = ""), (this.postContent = ""), (this.isOpen = false);
      this.$parent.getPosts();
    },
  },
};
</script>
