<template>
  <n-layout>
    <n-layout-header>
      <tool-list></tool-list>
    </n-layout-header>
    <n-layout has-sider style="height: calc(100vh - 82px)">
      <n-layout-sider content-style="padding: 24px">
        <component-list></component-list>
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px">
        <component-editor></component-editor>
      </n-layout-content>
      <n-layout-sider content-style="padding: 24px">
        <property-panel></property-panel>
      </n-layout-sider>
    </n-layout>
  </n-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NLayout, NLayoutContent, NLayoutSider, NLayoutHeader } from "naive-ui";
import ToolList from "./components/ToolList.vue";
import ComponentList from "./components/ComponentList.vue";
import PropertyPanel from "./components/PropertyPanel.vue";
import ComponentEditor from "./components/ComponentEditor.vue";
export default defineComponent({
  name: "App",
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutSider,
    ToolList,
    ComponentList,
    PropertyPanel,
    ComponentEditor,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  margin: 0;
  padding: 0;
  user-select: none;
}
body {
  overflow: hidden;
}
.n-layout-header,
.n-layout-footer {
  background: rgba(128, 128, 128, 0.2);
  padding: 24px;
}

.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}

.n-layout-content {
  background: rgba(128, 128, 128, 0.4);
}
</style>
