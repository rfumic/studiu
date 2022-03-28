<template>
  <div class="bg-gray-100 mx-[5%] min-h-screen pb-8 text-center">
    <h1 class="text-6xl py-8">{{ titleVar }}</h1>
    <div class="flex flex-col items-center mb-6">
      <div class="flex items-center w-1/3">
        <form class="pr-2 w-full">
          <input
            v-model="search"
            type="text"
            placeholder="Pretraži"
            class="container border border-gray-400 rounded-md px-2 focus:outline-none focus:ring-1"
          />
        </form>
        <svg
          class="text-gray-600 h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 56.966 56.966"
          style="enable-background: new 0 0 56.966 56.966"
          xml:space="preserve"
          width="512px"
          height="512px"
        >
          <path
            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
          />
        </svg>
      </div>
    </div>
    <add-post :title="titleVar" :forumID="forumID" />
    <forum-post v-for="post in sortedPostList" :key="post" :obj="post" />
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
  computed: {
    sortedPostList() {
      return this.postList
        .sort((a, b) => {
          return b.time - a.time;
        })
        .filter((post) => {
          return (
            post.title.toLowerCase().match(this.search.toLowerCase()) ||
            post.content.toLowerCase().match(this.search.toLowerCase())
          );
        });
    },
  },
  data() {
    return {
      postList: [],
      forumID: this.id,
      titleVar: this.title,
      search: "",
    };
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
      this.postList = [];
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
              commentCounter: data.commentCounter,
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
