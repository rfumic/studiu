<template>
  <div class="bg-gray-100 mx-[5%] min-h-screen pb-8 text-center">
    <h1 class="text-6xl py-8">{{ titleVar }}</h1>
    <div
      class="flex flex-row justify-center mb-6 items-center"
      title="Sortiraj po vremenu objave"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <button
        class="bg-white ml-4 mr-2 border border-solid rounded-xl p-2 hover:bg-gray-100/50 transition ease-in-out duration-300"
        title="Najnovije objave"
        @click="newestPosts()"
        :class="{
          'bg-orange-100 border-none hover:bg-orange-100/50': sortingByNewest,
        }"
      >
        Najnovije</button
      ><button
        class="bg-white mr-4 ml-2 border border-solid rounded-xl p-2 hover:bg-gray-100/50 transition ease-in-out duration-300"
        title="Najstarije objave"
        @click="oldestPosts()"
        :class="{
          'bg-orange-100 border-none hover:bg-orange-100/50': !sortingByNewest,
        }"
      >
        Najstarije
      </button>
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
    <forum-post v-for="post in searchPostList" :key="post" :obj="post" />
    <div class="flex flex-col items-center">
      <div
        @click="getPosts(true)"
        v-show="loadMoreButton"
        class="flex flex-row align-center border bg-white border-solid items-center cursor-pointer rounded-md p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
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
    searchPostList() {
      return this.postList.filter((post) => {
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
      lastDoc: null,
      loadMoreButton: true,
      sortingByNewest: true,
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

    async getPosts(loadMore = false, orderBy = "desc") {
      console.log("Pozvana funkcija getPosts()");
      let ref = null;

      // ↓↓↓ Provjera poziva li se funkcija iz mounteda ili za dodatne podatke
      if (loadMore) {
        ref = db
          .collection("posts")
          .where("posted_in", "==", this.forumID)
          .orderBy("posted_at", orderBy)
          .startAfter(this.lastDoc || 0)
          .limit(10);
      } else {
        ref = db
          .collection("posts")
          .where("posted_in", "==", this.forumID)
          .orderBy("posted_at", orderBy)
          .limit(10);
      }

      const getData = await ref.get();

      try {
        getData.docs.forEach(async (doc) => {
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
            userId: data.user,
          });
        });
      } catch (error) {
        console.error(error);
      }

      // ↓↓↓ Sprema zadnji dohvaceni dokument zbog paginationa
      this.lastDoc = getData.docs[getData.docs.length - 1];

      // ↓↓↓ Ako nema vise dokumenata
      if (getData.empty) {
        this.loadMoreButton = false;
      } else {
        this.loadMoreButton = true;
      }
    },
    async newestPosts() {
      this.postList = [];

      this.getPosts(false, "desc");
      this.sortingByNewest = true;
    },
    async oldestPosts() {
      this.postList = [];

      this.getPosts(false, "asc");
      this.sortingByNewest = false;
    },
  },
  async created() {
    // ↓↓↓ Kod refresh-a se izgubi title
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
