<template>
  <div
    class="shape"
    :class="{ active }"
    :style="{ ...sizeStyle, ...positionStyle }"
    @click.stop="setActiveComp()"
    @mousedown="handleMousedown"
  >
    <div
      class="shape-point"
      v-for="item in active ? pointList : []"
      :key="item"
      :style="getPointStyle(item)"
    ></div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useSizeStyle } from "../hooks/style";
import { useAppStore } from "../store/modules/app";
export default defineComponent({
  props: {
    item: {
      type: Object as PropType<ComponentItem>,
      required: true,
    },
  },
  setup(props) {
    const appStore = useAppStore();
    const { sizeStyle, positionStyle, active } = useSizeStyle(props);
    // method
    const getPointStyle = (point: string) => {
      const { width, height } = props.item.sizeStyle;
      const hasT = /t/.test(point);
      const hasB = /b/.test(point);
      const hasL = /l/.test(point);
      const hasR = /r/.test(point);
      let newLeft = 0;
      let newTop = 0;

      // 四个角的点
      if (point.length === 2) {
        newLeft = hasL ? 0 : width;
        newTop = hasT ? 0 : height;
      } else {
        // 上下两点的点，宽度居中
        if (hasT || hasB) {
          newLeft = width / 2;
          newTop = hasT ? 0 : height;
        }

        // 左右两边的点，高度居中
        if (hasL || hasR) {
          newLeft = hasL ? 0 : width;
          newTop = Math.floor(height / 2);
        }
      }

      const style = {
        marginLeft: hasR ? "-4px" : "-4px",
        marginTop: "-4px",
        left: `${newLeft}px`,
        top: `${newTop}px`,
        // cursor: this.cursors[point],
      };

      return style;
    };
    const setActiveComp = () => {
      appStore.setActiveComponent(props.item.id);
    };
    const handleMousedown = (e: MouseEvent) => {
      if (active.value) {
        const startY = e.clientY;
        const startX = e.clientX;
        // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
        const startTop = props.item.shapeStyle.top;
        const startLeft = props.item.shapeStyle.left;
        // 如果元素没有移动，则不保存快照
        let hasMove = false;
        const move = (moveEvent: MouseEvent) => {
          hasMove = true;
          const curX = moveEvent.clientX;
          const curY = moveEvent.clientY;
          const pos = {
            top: curY - startY + startTop,
            left: curX - startX + startLeft,
          };

          // 修改当前组件样式
          appStore.setActiveCompStyle(pos);
          // this.$store.commit('setShapeStyle', pos)
          // 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
          // 如果不使用 $nextTick，吸附后将无法移动
          // this.$nextTick(() => {
          // 触发元素移动事件，用于显示标线、吸附功能
          // 后面两个参数代表鼠标移动方向
          // curY - startY > 0 true 表示向下移动 false 表示向上移动
          // curX - startX > 0 true 表示向右移动 false 表示向左移动
          // eventBus.$emit('move', curY - startY > 0, curX - startX > 0)
          // })
        };

        const up = () => {
          // hasMove && this.$store.commit('recordSnapshot')
          // 触发元素停止移动事件，用于隐藏标线
          // eventBus.$emit('unmove')
          document.removeEventListener("mousemove", move);
          document.removeEventListener("mouseup", up);
        };

        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
      }
    };
    return {
      pointList: ["lt", "t", "rt", "r", "rb", "b", "lb", "l"], // 八个方向
      sizeStyle,
      positionStyle,
      // computed
      active,
      // method
      getPointStyle,
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
  outline: 1px solid #70c0ff;
  background-color: #59c6f950;
  user-select: none;
}
.shape-point {
  position: absolute;
  background: #fff;
  border: 1px solid #59c7f9;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 1;
}
</style>
