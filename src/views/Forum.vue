<template>
  <div class="bg-gray-100 mx-[5%] min-h-screen pb-8 text-center">
    <h1 class="text-6xl py-8">{{ title }}</h1>
    <add-post :title="title" :forumID="forumID" />
    <forum-post
      v-for="post in postList"
      :key="post"
      :title="post.title"
      :content="post.content"
      :username="post.username"
      :time="post.time"
    />
  </div>
</template>

<script>
import ForumPost from "@/components/ForumPost.vue";
import AddPost from "@/components/AddPost.vue";
import { db } from "@/firebase";
/* 
let postList = [];

// PRIVREMENO vvv
postList = [
  {
    title: "Naslov objave1",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, non reiciendis.sit amet consectetur adipisicing elit. Soluta, non reiciendis.sit amet consectetur adipisicing elit. Soluta, non reiciendis.",
    username: "username1",
    time: "2 days ago",
  },
  {
    title: "Naslov objave2",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, non reiciendis.sit amet consectetur adipisicing elit. Soluta, non reiciendis.",
    username: "username2",
    time: "2 days ago",
  },
  {
    title: "Naslov objave3",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, non reiciendis.",
    username: "username3",
    time: "3 days ago",
  },
  {
    title: "Naslov objave4",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, non reiciendis.sit amet consectetur adipisicing elit. Soluta, non reiciendis.non reiciendis.",
    username: "username4",
    time: "2 weeks ago",
  },
  {
    title: "Naslov objave5",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, non reiciendis.",
    username: "username5",
    time: "2 days ago",
  },
  {
    title: "Naslov objave6",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, non reiciendis.",
    username: "username6",
    time: "2 days ago",
  },
  {
    title: "Naslov objave7",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, non reiciendis.",
    username: "username7",
    time: "2 days ago",
  },
]; */

export default {
  name: "ForumPosts",
  props: ["id", "title"],
  components: {
    ForumPost,
    AddPost,
  },
  data() {
    return { postList: [], forumID: this.id };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      console.log("Pozvana funkcija getPosts()");
      await db
        .collection("posts")
        .where("posted_in", "==", this.forumID)
        .get()
        .then((query) => {
          query.forEach((doc) => {
            let data = doc.data();

            this.postList.push({
              title: data.title,
              content: data.content,
              time: data.posted_at,
              username: data.user,
            });
          });
        });
    },
  },
  async created() {
    if (!this.id) {
      db.collection("forums")
        .where("naziv", "==", this.title)
        .get()
        .then((query) => {
          query.forEach((doc) => {
            this.forumID = doc.id;
          });
        });
    }
  },
};
</script>
