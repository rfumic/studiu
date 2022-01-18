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
import { db, firebase } from "@/firebase";

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
  async mounted() {
    this.getPosts();
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
    async getPosts() {
      console.log("Pozvana funkcija getPosts()");
      await db
        .collection("posts")
        .orderBy("posted_at", "desc")
        .where("posted_in", "==", this.forumID)
        .get()
        .then((query) => {
          query.forEach(async (doc) => {
            let data = doc.data();
            const name = await this.getUsernames(data.user);
            this.postList.push({
              title: data.title,
              content: data.content,
              time: data.posted_at,
              username: name.username,
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
