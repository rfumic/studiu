<template>
  <div class="bg-gray-100 mx-[5%] h-screen text-center">
    <h1 class="text-6xl py-8">Strukture podataka i algoritmi</h1>
    <add-post />
    <forum-post />
    <forum-post />
    <forum-post />
    <forum-post />
  </div>
</template>

<script>
// @ is an alias to /src
import ForumPost from "../components/ForumPost.vue";
import AddPost from "../components/AddPost.vue";

export default {
  name: "ForumPosts",
  components: {
    ForumPost,
    AddPost,
  },
};
</script>
