<template>
  <div class="tool-list">
    <n-space>
      <n-button>撤销</n-button>
      <n-button>重做</n-button>
      <n-button>插入图片</n-button>
      <n-button>预览</n-button>
      <n-button>保存</n-button>
      <n-button>清空画布</n-button>
    </n-space>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { NSpace, NButton } from "naive-ui";
export default defineComponent({
  name: "ToolList",
  components: {
    NSpace,
    NButton,
  },
  setup() {
    return {};
  },
});
</script>
