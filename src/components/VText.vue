<template>
  <n-input
    v-model:value="value"
    type="textarea"
    placeholder="基本的 Textarea"
  />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { NInput } from "naive-ui";
export default defineComponent({
  name: "VText",
  components: {
    NInput,
  },
  setup() {
    const value = ref("");
    return {
      value,
    };
  },
});
</script>
