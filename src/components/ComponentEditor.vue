<template>
  <div
    class="content"
    @dragenter="handleDrapEnter"
    @dragover="handleDragover"
    @drop="handleDrop"
    @mousedown="handleMousedown"
    @mouseup="handleMouseup"
    @click="handleClick"
  >
    <grid></grid>
    <shape v-for="item in componentData" :key="item.id" :item="item">
      <component :key="item.id" :is="item.component" :item="item"></component>
    </shape>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { cloneDeep } from "lodash-es";
import { v4 as uuidv4 } from "uuid";
import VText from "./VText.vue";
import VButton from "./VButton.vue";
import VImage from "./VImage.vue";
import Shape from "./Shape.vue";
import Grid from "./Grid.vue";
import { componentList } from "../const/components";
import { useAppStore } from "../store/modules/app";
export default defineComponent({
  components: {
    VText,
    VButton,
    VImage,
    Shape,
    Grid,
  },
  setup() {
    const appStore = useAppStore();
    const componentData = computed(() => {
      return appStore.componentList;
    });
    // method
    const handleDrapEnter = (e: DragEvent) => {
      e.preventDefault();
      // console.log(e);
    };
    const handleDragover = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = "copy";
      }
      // console.log(e);
    };
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer) {
        const index = +e.dataTransfer.getData("index");
        const component = cloneDeep(componentList[index]);
        component.positionStyle.top = e.offsetY;
        component.positionStyle.left = e.offsetX;
        component.id = uuidv4();
        appStore.pushComponent(component);
      }
    };
    const handleMousedown = (e: MouseEvent) => {
      // 如果没有选中组件 在画布上点击时需要调用 e.preventDefault() 防止触发 drop 事件
      if (!appStore.activeComponent) {
        e.preventDefault();
      }
      // console.log(e);
    };
    const handleMouseup = (e: MouseEvent) => {
      // console.log(e);
    };
    const handleClick = (e: MouseEvent) => {
      appStore.setActiveComponent(null);
    };
    return {
      componentData,
      // method
      handleDrapEnter,
      handleDragover,
      handleDrop,
      handleMousedown,
      handleMouseup,
      handleClick,
    };
  },
});
</script>
<style lang="css" scoped>
.content {
  position: relative;
  height: 100%;
  background: white;
}
</style>
