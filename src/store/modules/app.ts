import { defineStore } from "pinia";
interface AppState {
  componentList: ComponentItem[];
}

export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    componentList: [],
  }),

  getters: {},

  actions: {
    pushComponent(component: ComponentItem) {
      this.componentList.push(component);
    },
  },
});
