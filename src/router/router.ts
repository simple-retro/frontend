import { createRouter, createWebHistory } from 'vue-router';
import { useRetrospectiveStore } from '../stores/retrospectiveStore';
import retrospectiveApi from '../services/retrospectiveApi';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/AboutPage.vue'),
      meta: {
        ignoreHomeRedirect: true,
      },
    },
    {
      path: '/lost',
      name: '404',
      meta: {
        ignoreHomeRedirect: true,
      },
      component: () => import('../views/UnknownRetro.vue'),
    },
    {
      path: '/oopsie',
      name: '500',
      component: () => import('../views/ExceptionScreen.vue'),
    },
    {
      path: '/retrospective',
      name: 'retrospective.new',
      meta: {
        ignoreHomeRedirect: true,
      },
      component: () => import('../views/CreateRetrospectivePage.vue'),
    },
    {
      path: '/retrospective/:id',
      component: () => import('../views/RetrospectivePage.vue'),
      children: [
        {
          path: '',
          name: 'retrospective.view',
          component: () => import('../components/retrospective/RetrospectiveLayout.vue'),
        },
        {
          path: 'edit',
          name: 'retrospective.edit',
          component: () => import('../components/retrospective/ManageRetrospective.vue'),
        },
      ],
    },
  ],
});

router.beforeEach(async (to) => {
  const retroStore = useRetrospectiveStore();
  const retroId = to.params.id;

  if (retroStore.currentRetro === undefined && typeof retroId === 'string') {
    const retrospective = await retrospectiveApi.getRetrospective(retroId);

    if (retrospective.error) return { name: '404', query: { id: retroId } };

    retroStore.retrospective.updateRetrospective(retrospective);
    return;
  }

  if (
    retroStore.currentRetro === undefined &&
    retroId === undefined &&
    !to.meta.ignoreHomeRedirect
  ) {
    return { name: 'home' };
  }
});
