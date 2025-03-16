import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Quran from "../views/Quran.vue";
import SurahDetail from "../views/SurahDetail.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/quran", name: "Quran", component: Quran },
  { path: "/surah/:number", name: "SurahDetail", component: SurahDetail }, // Dynamic route
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;