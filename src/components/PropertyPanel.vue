<template>
  <n-tabs default-value="props" justify-content="space-evenly" type="line">
    <n-tab-pane name="props" tab="属性">属性</n-tab-pane>
    <n-tab-pane name="animation" tab="动画">动画</n-tab-pane>
    <n-tab-pane name="link" tab="关联">关联</n-tab-pane>
  </n-tabs>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { NTabs, NTabPane } from "naive-ui";
export default defineComponent({
  name: "PropertyPanel",
  components: {
    NTabs,
    NTabPane,
  },
  setup() {
    return {};
  },
});
</script>
