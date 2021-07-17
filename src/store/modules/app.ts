import { defineStore } from "pinia";
interface AppState {
  activeComponent: Nullable<ComponentItem>;
  componentList: ComponentItem[];
}

export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    activeComponent: null,
    componentList: [],
  }),

  getters: {},

  actions: {
    pushComponent(component: ComponentItem) {
      this.componentList.push(component);
    },
    setActiveComponent(componentId: string | null) {
      if (componentId) {
        const comp = this.componentList.find((m) => componentId === m.id);
        if (comp) {
          this.activeComponent = comp;
        } else {
          throw new Error("没找到");
        }
      } else {
        this.activeComponent = null;
      }
    },
    setActiveCompPos(position: PositionStyle) {
      if (this.activeComponent) {
        this.activeComponent.positionStyle = position;
      }
    },
    setActiveCompSize(size: SizeStyle) {
      if (this.activeComponent) {
        this.activeComponent.sizeStyle = size;
      }
    },
  },
});
