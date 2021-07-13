<template>
  <n-space vertical @dragstart="handleDragStart">
    <div
      v-for="(item, index) in componentList"
      :key="index"
      draggable="true"
      :data-index="index"
    >
      {{ item.label }}
    </div>
  </n-space>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { NSpace, NButton } from "naive-ui";
import { componentList } from "../const/components";
type DataSet = Record<string, string>;
export default defineComponent({
  name: "ComponentList",
  components: {
    NSpace,
    NButton,
  },
  setup() {
    const handleDragStart = (e: DragEvent) => {
      const { target } = e;
      const { dataset }: { dataset: DataSet } = target as any;
      if (e.dataTransfer) {
        e.dataTransfer.setData("index", dataset.index);
        console.log(dataset.index);
      }
    };
    return {
      componentList,
      handleDragStart,
    };
  },
});
</script>
