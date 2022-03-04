<template>
  <div class="flex justify-center items-start m-1 px-2 text-left">
    <div class="bg-white rounded-3xl w-[50%] border border-solid">
      <div class="px-4 py-6 flex flex-col items-start text-4xl">
        <div class="flex justify-between w-full pb-2">
          <div class="text-sm text-gray-500">{{ obj.username }}:</div>

          <div class="text-sm text-gray-500">{{ timeFormat }}</div>
        </div>

        <div
          @click="goToPost"
          class="cursor-pointer text-2xl hover:-translate-y-0.5 transform transition"
        >
          {{ obj.title }}
        </div>
        <div class="text-base py-1">
          {{ obj.content }}
        </div>
        <div class="flex w-full justify-between text-sm items-center">
          <div class="flex p-2 items-center text-center">
            <div class="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 hover:text-emerald-500 transition-all cursor-pointer active:text-emerald-600 active:border rounded-full"
                :class="userLiked ? 'text-emerald-500' : 'text-gray-500'"
                viewBox="0 0 20 20"
                fill="currentColor"
                @click="likeToggle(true)"
              >
                <path
                  d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
                />
              </svg>
              {{ likes }}
            </div>
            <div class="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 hover:text-red-500 transition-all cursor-pointer active:text-red-600 active:border rounded-full"
                :class="userDisliked ? 'text-red-500' : 'text-gray-500'"
                viewBox="0 0 20 20"
                fill="currentColor"
                @click="dislikeToggle(true)"
              >
                <path
                  d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"
                />
              </svg>
              {{ dislikes }}
            </div>
          </div>
          <div
            class="flex flex-col items-center cursor-pointer hover:text-orange-500 transition-all p-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                clip-rule="evenodd"
              /></svg
            >25
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { firebase, db } from "@/firebase.js";
import store from "@/store";
export default {
  name: "ForumPost",
  props: ["obj"],
  data() {
    return {
      // pass: JSON.stringify(this.obj),
      likes: 0,
      dislikes: 0,
      userLiked: false,
      userDisliked: false,
    };
  },
  async mounted() {
    this.likes = this.obj.likes ? this.obj.likes.length : 0;
    this.dislikes = this.obj.dislikes ? this.obj.dislikes.length : 0;
    this.userLiked = this.obj.likes.includes(store.currentUser);
    this.userDisliked = this.obj.dislikes.includes(store.currentUser);
  },
  computed: {
    timeFormat() {
      return dayjs(this.obj.time).format("YYYY/MM/DD  hh:mm");
    },
  },
  methods: {
    goToPost() {
      this.$router.push({
        name: "PostView",
        params: {
          id: this.obj.postID,
        },
      });
      console.log("Objekt iz forumpost", this.obj);
    },
    async likeToggle(calledFromClick) {
      this.userLiked = !this.userLiked;
      if (calledFromClick) {
        if (this.userDisliked) await this.dislikeToggle(false);
      }

      if (this.userLiked) {
        this.likes += 1;

        await db
          .collection("posts")
          .doc(this.obj.postID)
          .update({
            likes: firebase.firestore.FieldValue.arrayUnion(store.currentUser),
          });
      } else {
        this.likes -= 1;

        await db
          .collection("posts")
          .doc(this.obj.postID)
          .update({
            likes: firebase.firestore.FieldValue.arrayRemove(store.currentUser),
          });
      }
    },
    async dislikeToggle(calledFromClick) {
      this.userDisliked = !this.userDisliked;
      if (calledFromClick) {
        if (this.userLiked) await this.likeToggle(false);
      }

      if (this.userDisliked) {
        this.dislikes += 1;

        await db
          .collection("posts")
          .doc(this.obj.postID)
          .update({
            dislikes: firebase.firestore.FieldValue.arrayUnion(
              store.currentUser
            ),
          });
      } else {
        this.dislikes -= 1;

        await db
          .collection("posts")
          .doc(this.obj.postID)
          .update({
            dislikes: firebase.firestore.FieldValue.arrayRemove(
              store.currentUser
            ),
          });
      }
    },
  },
};
</script>
