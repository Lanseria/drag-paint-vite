<template>
  <div
    class="shape-point"
    v-for="pItem in active ? pointList : []"
    :key="pItem"
    :style="getPointStyle(pItem)"
    @mousedown="handleMouseDownOnPoint(pItem, $event)"
  ></div>
</template>
<script lang="ts">
import { inRange } from "lodash-es";
import { defineComponent, PropType } from "vue";
import {
  angleToCursor,
  initialAngle,
  PointKey,
  pointList,
} from "../const/components";
import { useAppStore } from "../store/modules/app";
export default defineComponent({
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    item: {
      type: Object as PropType<ComponentItem>,
      required: true,
    },
  },
  setup(props) {
    const appStore = useAppStore();
    // const
    const rangeMap = new Map<
      [number, number],
      {
        cursor: string;
        desc: string;
      }
    >();
    const setCursorMap = () => {
      for (let index = 0; index < angleToCursor.length; index++) {
        const element = angleToCursor[index];
        rangeMap.set(element.range, {
          cursor: element.cursor,
          desc: element.desc,
        });
      }
    };
    const getCursor = (point: PointKey) => {
      const initAngle = initialAngle[point] % (2 * Math.PI);
      let result = "";
      const keysMap = rangeMap.keys();
      let nextValue = keysMap.next();
      let done = false;
      while (!done) {
        const value: [number, number] = nextValue.value;
        if (inRange(initAngle, value[0], value[1])) {
          result = `${rangeMap.get(value)?.cursor}-resize`;
          rangeMap.delete(value);
        }
        nextValue = keysMap.next();
        done = nextValue.done as boolean;
      }
      return result;
    };

    const getPointStyle = (point: PointKey) => {
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
      setCursorMap();
      const style = {
        marginLeft: hasR ? "-4px" : "-4px",
        marginTop: "-4px",
        left: `${newLeft}px`,
        top: `${newTop}px`,
        cursor: getCursor(point),
      };

      return style;
    };

    const handleMouseDownOnPoint = (point: PointKey, e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      let { width, height } = props.item.sizeStyle;
      let { top, left } = props.item.positionStyle;
      const startX = e.clientX;
      const startY = e.clientY;

      // 是否需要保存快照
      // let needSave = false;
      const move = (ee: MouseEvent) => {
        // needSave = true;
        const currX = ee.clientX;
        const currY = ee.clientY;
        const disY = currY - startY;
        const disX = currX - startX;
        const hasT = /t/.test(point);
        const hasB = /b/.test(point);
        const hasL = /l/.test(point);
        const hasR = /r/.test(point);
        const newHeight = height + (hasT ? -disY : hasB ? disY : 0);
        const newWidth = width + (hasL ? -disX : hasR ? disX : 0);
        const size = {
          height,
          width,
        };
        size.height = newHeight > 0 ? newHeight : 0;
        size.width = newWidth > 0 ? newWidth : 0;
        const pos = {
          left,
          top,
        };
        pos.left = left + (hasL ? disX : 0);
        pos.top = top + (hasT ? disY : 0);
        appStore.setActiveCompPos(pos);
        appStore.setActiveCompSize(size);
        // this.$store.commit('setPositionStyle', pos)
      };

      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        // needSave && this.$store.commit('recordSnapshot')
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    };
    return {
      pointList: pointList,
      angleToCursor,
      getPointStyle,
      // method
      handleMouseDownOnPoint,
    };
  },
});
</script>
<style lang="css" scoped>
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
