<template>
  <h2>Viewing Blog: {{ $route.params.id }}</h2>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
    };
  },
  async fetch() {
    this.posts = await fetch("https://api.nuxtjs.dev/posts").then((res) =>
      res.json()
    );
  },
};
</script>
