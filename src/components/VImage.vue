<template>
  <img
    :style="sizeStyle"
    draggable="false"
    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
  />
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
// import { NImage } from "naive-ui";
import { useSizeStyle } from "../hooks/style";
export default defineComponent({
  name: "VImage",
  props: {
    item: {
      type: Object as PropType<ComponentItem>,
      required: true,
    },
  },
  components: {
    // NImage,
  },
  setup(props) {
    const { sizeStyle } = useSizeStyle(props);
    const value = ref("");
    return {
      value,
      sizeStyle,
    };
  },
});
</script>
