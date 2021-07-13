<template>
  <div class="shape">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    item: {
      type: Object as PropType<ComponentItem>,
      required: true,
    },
  },
  setup(props) {
    const top = computed(() => {
      return props.item.shapeStyle.top;
    });
    const left = computed(() => {
      return props.item.shapeStyle.left;
    });
    return {
      top,
      left,
    };
  },
});
</script>
<style lang="css" scoped>
.shape {
  position: absolute;
  top: v-bind(top + "px");
  left: v-bind(left + "px");
}
</style>
