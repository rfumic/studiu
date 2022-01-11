<template>
  <div class="bg-gray-100 mx-[5%] min-h-screen pb-8 text-center">
    <h1 class="text-6xl py-8">{{ nazivForuma }}</h1>
    <forum-post
      :title="postData.title"
      :content="postData.content"
      :username="postData.username"
      :time="postData.time"
    />
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
                class="text-lg mx-2 px-6 py-2 mt-4 text-white bg-orange-500 transition-all rounded-lg hover:bg-white hover:ring-1 hover:ring-orange-500 hover:ring-inset hover:text-orange-500"
              >
                Objavi
              </button>
              <button
                class="text-lg px-6 py-2 mt-4 text-gray-500 bg-white border rounded-lg transition-all hover:bg-white hover:ring-1 hover:ring-orange-500 hover:ring-inset hover:text-orange-500"
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

let postData = {};

// PRIVERMENO vvv
postData = {
  title: "Naslov objave1",
  content:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, non reiciendis.sit amet consectetur adipisicing elit. Soluta, non reiciendis.sit amet consectetur adipisicing elit. Soluta, non reiciendis.",
  username: "username1",
  time: "2 days ago",
};

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
  name: "ForumPosts",
  components: {
    ForumPost,
    AddPost,
    ForumComment,
  },
  data() {
    return {
      postData,
      nazivForuma,
      comData,
    };
  },
};
</script>
