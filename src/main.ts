import { createApp } from "vue";
import App from "./App.vue";
import { setupStore } from "./store";

const app = createApp(App);

// Configure store
setupStore(app);

app.mount("#app");
