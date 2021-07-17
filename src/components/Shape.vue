<template>
  <div
    class="shape"
    :class="{ active }"
    :style="{ ...sizeStyle, ...positionStyle }"
    @click.stop="setActiveComp()"
    @mousedown="handleMousedown"
  >
    <shape-point :item="item" :active="active"></shape-point>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import ShapePoint from "./ShapePoint.vue";
import { useSizeStyle } from "../hooks/style";
import { useAppStore } from "../store/modules/app";
export default defineComponent({
  props: {
    item: {
      type: Object as PropType<ComponentItem>,
      required: true,
    },
  },
  components: {
    ShapePoint,
  },
  setup(props) {
    const appStore = useAppStore();
    const { sizeStyle, positionStyle, active } = useSizeStyle(props);
    // method
    const setActiveComp = () => {
      appStore.setActiveComponent(props.item.id);
    };
    const handleMousedown = (e: MouseEvent) => {
      if (active.value) {
        const startY = e.clientY;
        const startX = e.clientX;
        // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
        const startTop = props.item.positionStyle.top;
        const startLeft = props.item.positionStyle.left;
        // 如果元素没有移动，则不保存快照
        const move = (moveEvent: MouseEvent) => {
          const curX = moveEvent.clientX;
          const curY = moveEvent.clientY;
          const pos = {
            top: curY - startY + startTop,
            left: curX - startX + startLeft,
          };

          // 修改当前组件样式
          appStore.setActiveCompPos(pos);
        };

        const up = () => {
          document.removeEventListener("mousemove", move);
          document.removeEventListener("mouseup", up);
        };

        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
      }
    };
    return {
      sizeStyle,
      positionStyle,
      // computed
      active,
      // method
      setActiveComp,
      handleMousedown,
    };
  },
});
</script>
<style lang="css" scoped>
.shape {
  position: absolute;
}
.shape.active {
  cursor: move;
  outline: 1px solid #70c0ff;
  background-color: #59c6f950;
  user-select: none;
}
</style>
