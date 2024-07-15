<template>
  <main>
    <p :class="`${className} p-3 font-semibold my-2 rounded-lg`">{{ text }}</p>
  </main>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
    },
    text: {
      type: String,
    },
  },
};
</script>
