<template>
  <div class="v-n-button" :style="sizeStyle">按钮</div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { NButton } from "naive-ui";
import { useSizeStyle } from "../hooks/style";
export default defineComponent({
  name: "VButton",
  props: {
    item: {
      type: Object as PropType<ComponentItem>,
      required: true,
    },
  },
  components: {
    NButton,
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
<style lang="css" scoped>
.v-n-button {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: center;
  border-radius: 3px;
  border: 1px solid #000;
}
</style>
