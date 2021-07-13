<template>
  <n-image
    width="100"
    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
  />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { NImage } from "naive-ui";
export default defineComponent({
  name: "VImage",
  components: {
    NImage,
  },
  setup() {
    const value = ref("");
    return {
      value,
    };
  },
});
</script>
