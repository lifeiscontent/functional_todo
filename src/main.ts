import * as AppStore from "./app_store.ts";
import * as AppView from "./app_view.ts";

const appStore = AppStore.create({ todos: [] });
const appView = AppView.create(appStore);

appStore.addTodo("Learn TypeScript");
appStore.addTodo("Build a functional example app");

setTimeout(() => {
  appStore.addTodo("Profit");
}, 2000);

document.getElementById("app")?.appendChild(appView.container);
