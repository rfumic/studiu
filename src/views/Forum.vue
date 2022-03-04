<template>
  <div class="bg-gray-100 mx-[5%] min-h-screen pb-8 text-center">
    <h1 class="text-6xl py-8">{{ titleVar }}</h1>
    <add-post :title="titleVar" :forumID="forumID" />
    <forum-post v-for="post in postList" :key="post" :obj="post" />
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
    return { postList: [], forumID: this.id, titleVar: this.title };
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
        //.orderBy("posted_at", "desc")
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
              postID: doc.id,
              posted_in: data.posted_in,
              forumName: this.titleVar,
              likes: data.likes,
              dislikes: data.dislikes,
            });
          });
        });
    },
  },
  async created() {
    if (!this.titleVar) {
      await db
        .collection("forums")
        .doc(this.forumID)
        .get()
        .then((doc) => {
          this.titleVar = doc.data().naziv;
        });
    }
  },
};
</script>
