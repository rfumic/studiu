<template>
  <div class="bg-gray-100 mx-[5%] min-h-screen pb-8 text-center">
    <h1 class="text-5xl py-8">{{ forumName }}</h1>
    <forum-post :obj="obj2" />
    <div class="flex justify-center items-start m-4 px-2 text-left">
      <div class="w-[50%]">
        <div class="bg-white rounded-3xl w-[75%] border border-solid">
          <div class="px-4 py-6 flex flex-col items-start text-4xl">
            <textarea
              v-model="newComment"
              placeholder="Komentiraj..."
              :class="{ 'border-red-500': commentWarning }"
              rows="3"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            ></textarea>
            <p class="text-xs text-red-500" v-show="commentWarning">
              Komentar mora imati sadržaj!
            </p>
            <div class="flex justify-between w-full">
              <button
                @click="objaviKomentar()"
                class="text-sm mx-2 px-6 py-2 mt-4 text-white bg-orange-500 transition-all rounded-lg hover:bg-white hover:ring-1 hover:ring-orange-500 hover:ring-inset hover:text-orange-500"
              >
                Objavi
              </button>
              <button
                @click="isprazni()"
                class="text-sm px-6 py-2 mt-4 text-gray-500 bg-white border rounded-lg transition-all hover:bg-white hover:ring-1 hover:ring-orange-500 hover:ring-inset hover:text-orange-500"
              >
                Otkaži
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <forum-comment
      v-for="comment in allComments"
      :key="comment"
      :username="comment.username"
      :content="comment.content"
      :time="comment.time"
      :id="comment.id"
    />
  </div>
</template>

<script>
import ForumPost from "@/components/ForumPost.vue";
import ForumComment from "@/components/ForumComment.vue";
import { db } from "@/firebase.js";
import store from "@/store";

export default {
  name: "PostView",
  components: {
    ForumPost,
    ForumComment,
  },
  props: ["id", "obj", "forumName"],
  data() {
    return {
      allComments: [],
      thisPost: {},
      obj2: JSON.parse(this.obj),
      newComment: "",
      commentWarning: false,
      nazivForuma: this.forumName,
    };
  },

  mounted() {
    //this.getPost();
    this.getComments();
    console.log("MOUNTED:", this.forumName);
  },
  methods: {
    removeWarning() {
      setTimeout(() => {
        this.commentWarning = false;
      }, 2500);
    },
    isprazni() {
      this.newComment = "";
    },
    async objaviKomentar() {
      this.commentWarning = false;
      if (this.newComment !== "") {
        await db
          .collection("posts")
          .doc(this.obj2.postID)
          .collection("comments")
          .add({
            user: store.currentUser.userId,
            comment: this.newComment,
            posted_at: Date.now(),
          });
        this.newComment = "";
        this.getComments();
      } else {
        this.commentWarning = true;
        this.removeWarning();
      }
    },
    async getUsernames(userID) {
      try {
        let result1 = db
          .collection("users")
          .doc(userID)
          .get()
          .then((doc) => {
            if (doc.exists) return doc.data();
          });
        return result1;
      } catch (err) {
        console.error(err);
      }
    },

    async getComments() {
      console.log("pozvana funkcija getComments()");
      let query = await db
        .collection("posts")
        .doc(this.obj2.postID)
        .collection("comments")
        .orderBy("posted_at", "asc")
        .limit(10)
        .get();

      this.allComments = [];

      query.forEach(async (doc) => {
        const data = doc.data();
        const name = await this.getUsernames(data.user);
        console.log("Iz getComments", doc.data());
        this.allComments.push({
          id: data.id,
          username: name.username,
          content: data.comment,
          time: data.posted_at,
        });
      });
    },
  },
};
</script>
