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
          :class="{
            italic: deletedPost === true,
            'text-gray-400': deletedPost === true,
          }"
        >
          {{ obj.title }}
        </div>
        <div
          class="text-base py-1"
          :class="{
            italic: deletedPost === true,
            'text-gray-400': deletedPost === true,
          }"
        >
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
          <div class="flex items-center">
            <div
              @click="goToPost"
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
              >{{ commentCounter }}
            </div>
            <div
              class="flex flex-col items-center cursor-pointer hover:text-red-500 transition-all p-4"
              v-show="isAdmin"
              @click="deletePost()"
            >
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Obriši
            </div>
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
      commentCounter: 0,
      isAdmin: store.currentUser.isAdmin,
      deletedPost: false,
    };
  },
  async mounted() {
    this.likes = this.obj.likes.length || 0;
    this.dislikes = this.obj.dislikes.length || 0;
    this.userLiked = this.obj.likes.includes(store.currentUser.userId);
    this.userDisliked = this.obj.dislikes.includes(store.currentUser.userId);
    this.commentCounter = this.obj.commentCounter || 0;
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
            likes: firebase.firestore.FieldValue.arrayUnion(
              store.currentUser.userId
            ),
          });
      } else {
        this.likes -= 1;

        await db
          .collection("posts")
          .doc(this.obj.postID)
          .update({
            likes: firebase.firestore.FieldValue.arrayRemove(
              store.currentUser.userId
            ),
          });
      }
      //this.likes = await db.collection('posts').doc(this.obj.postID).get()
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
              store.currentUser.userId
            ),
          });
      } else {
        this.dislikes -= 1;

        await db
          .collection("posts")
          .doc(this.obj.postID)
          .update({
            dislikes: firebase.firestore.FieldValue.arrayRemove(
              store.currentUser.userId
            ),
          });
      }
    },
    async deletePost() {
      console.log("Called delete post");

      await db
        .collection("posts")
        .doc(this.obj.postID)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          this.obj.title = "Obrisan post";
          this.obj.content = "Obrisan post";
          this.deletedPost = true;
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
  },
};
</script>
