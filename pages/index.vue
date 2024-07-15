<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <PageHeader />
    <div class="container px-4 py-24 mx-auto">
      <p v-if="$fetchState.pending">Fetching posts...</p>
      <p v-else-if="$fetchState.error">
        An error occurred while fetching posts :(
      </p>
      <div v-else class="-my-8 divide-y-2 divide-gray-100">
        <div
          :key="post.id"
          v-for="post in posts"
          class="py-8 flex flex-wrap md:flex-nowrap"
        >
          <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <span class="font-semibold title-font text-gray-700">CATEGORY</span>
            <span class="mt-1 text-gray-500 text-sm">{{
              post.created_at
            }}</span>
          </div>
          <div class="md:flex-grow">
            <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
              {{ post.title }}
            </h2>
            <p class="leading-relaxed">
              {{ post.content }}
            </p>
            <NuxtLink :to="`/posts/${post.id}`">
              <a class="text-green-500 inline-flex items-center mt-4"
                >Read more
                <svg
                  class="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      posts: [],
    };
  },
  async fetch() {
    this.posts = await fetch("http://localhost:6500/api/v1/posts", {
      headers: {
        Authorization:
          "Bearer 9|pltn1vBFmprmk96IWqXTCLPzG1w97cWcZgYyRp4dc7c177ef",
      },
    }).then(async (res) => {
      const response = await res.json();
      return response.posts.data;
    });
  },
};
</script>
