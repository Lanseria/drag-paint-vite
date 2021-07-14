import { computed } from "vue";
import { useAppStore } from "../store/modules/app";

export const useSizeStyle = (props: { item: ComponentItem }) => {
  const appStore = useAppStore();
  const sizeStyle = computed(() => {
    return {
      width: `${props.item.sizeStyle.width}px`,
      height: `${props.item.sizeStyle.height}px`,
    };
  });
  const positionStyle = computed(() => {
    return {
      top: `${props.item.shapeStyle.top}px`,
      left: `${props.item.shapeStyle.left}px`,
    };
  });
  const active = computed(() => {
    return props.item.id === appStore.activeComponent?.id;
  });
  return {
    active,
    sizeStyle,
    positionStyle,
  };
};
