<template>
  <n-button>按钮</n-button>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { NButton } from "naive-ui";
export default defineComponent({
  name: "VButton",
  components: {
    NButton,
  },
  setup() {
    const value = ref("");
    return {
      value,
    };
  },
});
</script>
