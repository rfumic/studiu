<template>
  <div class="bg-gray-100 mx-[5%] min-h-screen pb-8 text-center">
    <h1 class="text-5xl py-8">{{}}</h1>
    <forum-post :obj="thisPost" />
    <div class="flex justify-center items-start m-4 px-2 text-left">
      <div class="w-[50%]">
        <div class="bg-white rounded-3xl w-[75%] border border-solid">
          <div class="px-4 py-6 flex flex-col items-start text-4xl">
            <textarea
              placeholder="Komentiraj..."
              rows="3"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            ></textarea>
            <div class="flex justify-between w-full">
              <button
                class="text-sm mx-2 px-6 py-2 mt-4 text-white bg-orange-500 transition-all rounded-lg hover:bg-white hover:ring-1 hover:ring-orange-500 hover:ring-inset hover:text-orange-500"
              >
                Objavi
              </button>
              <button
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
      v-for="comment in comData"
      :key="comment"
      :username="comment.username"
      :content="comment.content"
      :time="comment.time"
    />
  </div>
</template>

<script>
import ForumPost from "@/components/ForumPost.vue";
import AddPost from "@/components/AddPost.vue";
import ForumComment from "@/components/ForumComment.vue";
import { db } from "@/firebase.js";

let comData = [
  {
    username: "User1",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, non reiciendis.sit amet",
    time: "2 minutes ago",
  },
  {
    username: "User2",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, non reiciendis.sit amet Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, non reiciendis.sit amet",
    time: "2 minutes ago",
  },
  {
    username: "User3",
    content:
      "Lorem ipsum, dolor sit amet consectetur jaskdgjhkasdfjgkfjdaghkrhuieah adipisicing elit. Soluta, non reiciendis.sit amet Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, non reiciendis.sit amet Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, non reiciendis.sit amet",
    time: "2 minutes ago",
  },
  {
    username: "User4",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, non reiciendis.sit amet orem ipsum, dolor sit amet ",
    time: "2 minutes ago",
  },
];

let nazivForuma = "Strukture podataka i algoritmi";

export default {
  name: "PostView",
  components: {
    ForumPost,
    AddPost,
    ForumComment,
  },
  props: ["id", "obj"],
  data() {
    return {
      nazivForuma,
      comData,
      thisPost: {},
      obj2: JSON.parse(this.obj),
    };
  },
  async mounted() {
    this.getPost();
  },
  methods: {
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
    async getPost() {
      console.log("Pozvana funkcija getPost()");
      console.log(this.obj2.posted_in);
      await db
        .collection("posts")
        .doc(this.obj2.postID)
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            let data = doc.data();
            const name = await this.getUsernames(data.user);
            this.thisPost = {
              title: data.title,
              content: data.content,
              time: data.posted_at,
              username: name.username,
              postID: doc.id,
              postedIn: data.posted_in,
            };
          }
        });
    },
  },
};
</script>
