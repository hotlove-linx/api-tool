import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import ApiHomeView from "../views/ApiHomeView.vue";
import ApiInfoView from "../views/ApiInfoView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/api',
          name: 'api',
          component: () => ApiHomeView,
          children: [
            {
              path: '/info/:id',
              name: 'api-info',
              component: ApiInfoView,
            }
          ]
        }
      ],
    }
  ],
})

export default router
