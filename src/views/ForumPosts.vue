<template>
  <div class="bg-gray-100 mx-[5%] min-h-screen pb-8 text-center">
    <h1 class="text-6xl py-8">{{ nazivForuma }}</h1>
    <add-post :title="nazivForuma" />
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
];

let nazivForuma = "Strukture podataka i algoritmi";

export default {
  name: "ForumPosts",
  components: {
    ForumPost,
    AddPost,
  },
  data() {
    return { postList, nazivForuma };
  },
};
</script>
