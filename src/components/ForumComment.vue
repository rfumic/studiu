<template>
  <div
    class="flex justify-center items-start m-4 px-2 text-left"
    v-show="!deletedComment"
  >
    <div class="w-[50%]">
      <div class="bg-white rounded-3xl w-[75%] border border-solid">
        <div class="px-4 py-6 flex flex-col items-start text-4xl">
          <div class="flex justify-between w-full pb-2">
            <div class="text-sm text-gray-500">{{ username }}:</div>

            <div class="text-sm text-gray-500">{{ timeFormat }}</div>
          </div>

          <div class="text-base py-1">
            {{ content }}
          </div>
          <div
            class="flex w-full justify-between text-sm items-center"
            title="Sviđa mi se"
          >
            <div class="flex p-2 items-center">
              <div class="p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 hover:text-emerald-500 transition-all cursor-pointer active:text-emerald-600 active:border rounded-full"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  :class="userLiked ? 'text-emerald-500' : 'text-gray-500'"
                  @click="likeToggle(true)"
                >
                  <path
                    d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
                  />
                </svg>
                {{ likes }}
              </div>
              <div class="p-2" title="Ne sviđa mi se">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 hover:text-red-500 transition-all cursor-pointer active:text-red-600 active:border rounded-full"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  :class="userDisliked ? 'text-red-500' : 'text-gray-500'"
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
              title="Obriši komentar"
              class="flex flex-col items-center cursor-pointer hover:text-red-500 transition-all p-4"
              v-show="isAdmin"
              @click="deleteComment()"
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
            <div
              title="Blokiraj korisnika"
              class="flex flex-col items-center cursor-pointer hover:text-red-500 transition-all p-4"
              v-show="isAdmin"
              @click="banUser()"
            >
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Blokiraj
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import store from "@/store";
import { db, firebase } from "@/firebase.js";

export default {
  name: "ForumComment",
  props: [
    "username",
    "content",
    "time",
    "id",
    "commentLikes",
    "commentDislikes",
    "postId",
    "userId",
  ],
  computed: {
    timeFormat() {
      return dayjs(this.time).format("YYYY/MM/DD  hh:mm");
    },
  },
  data() {
    return {
      likes: 0,
      dislikes: 0,
      userLiked: false,
      userDisliked: false,
      isAdmin: store.currentUser.isAdmin,
      deletedComment: false,
    };
  },
  async mounted() {
    this.likes = this.commentLikes.length;
    this.dislikes = this.commentDislikes.length;
    this.userLiked = this.commentLikes.includes(store.currentUser.userId);
    this.userDisliked = this.commentDislikes.includes(store.currentUser.userId);
  },
  methods: {
    async likeToggle(calledFromClick) {
      this.userLiked = !this.userLiked;
      if (calledFromClick) {
        if (this.userDisliked) await this.dislikeToggle(false);
      }

      if (this.userLiked) {
        this.likes += 1;

        await db
          .collection("posts")
          .doc(this.postId)
          .collection("comments")
          .doc(this.id)
          .update({
            commentLikes: firebase.firestore.FieldValue.arrayUnion(
              store.currentUser.userId
            ),
          });
      } else {
        this.likes -= 1;

        await db
          .collection("posts")
          .doc(this.postId)
          .collection("comments")
          .doc(this.id)
          .update({
            commentLikes: firebase.firestore.FieldValue.arrayRemove(
              store.currentUser.userId
            ),
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
          .doc(this.postId)
          .collection("comments")
          .doc(this.id)
          .update({
            commentDislikes: firebase.firestore.FieldValue.arrayUnion(
              store.currentUser.userId
            ),
          });
      } else {
        this.dislikes -= 1;

        await db
          .collection("posts")
          .doc(this.postId)
          .collection("comments")
          .doc(this.id)
          .update({
            commentDislikes: firebase.firestore.FieldValue.arrayRemove(
              store.currentUser.userId
            ),
          });
      }
    },
    async deleteComment() {
      await db
        .collection("posts")
        .doc(this.postId)
        .update({
          commentCounter: firebase.firestore.FieldValue.increment(-1),
        });
      await db
        .collection("posts")
        .doc(this.postId)
        .collection("comments")
        .doc(this.id)
        .delete()
        .then(() => {
          console.info(`%cKomentar uspjesno uklonjen`, "color: lime");
          this.deletedComment = true;
        })
        .catch((error) => {
          console.error("Greska pri uklanjanju komentara: ", error);
        });
    },
    async banUser() {
      await db.collection("users").doc(this.userId).update({
        isBanned: true,
        username: "[korisnik_ne_postoji]",
      });
    },
  },
};
</script>
