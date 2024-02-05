import { createRouter, createWebHistory } from 'vue-router';
import { useRetrospectiveStore } from '../stores/retrospectiveStore';
import retrospectiveApi from '../services/retrospectiveApi';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/retrospective',
      name: 'retrospective.new',
      component: () => import('../views/CreateRetrospectivePage.vue'),
    },
    {
      path: '/retrospective/:id',
      name: 'retrospective.view',
      component: () => import('../views/RetrospectivePage.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/AboutPage.vue'),
    },
    {
      path: '/lost',
      name: '404',
      component: () => import('../views/UnknownRetro.vue'),
    },
  ],
});

router.beforeEach(async (to) => {
  const retroStore = useRetrospectiveStore();
  const retroId = to.params.id;

  const ignoreRouteNames = ['retrospective.new', '404', 'home'];

  if (
    retroStore.currentRetro === undefined &&
    retroId === undefined &&
    !ignoreRouteNames.includes(`${to.name?.toString()}`)
  )
    return { name: 'retrospective.new' };

  if (retroStore.currentRetro !== undefined && ignoreRouteNames.includes(`${to.name?.toString()}`))
    return { name: 'retrospective.view', params: { id: retroStore.currentRetro.id } };

  if (retroStore.currentRetro === undefined && typeof retroId === 'string') {
    const retrospective = await retrospectiveApi.getRetrospective(retroId);

    if (retrospective.error) return { name: '404', query: { id: retroId } };

    retroStore.retrospective.updateRetrospective(retrospective);
    return { name: 'retrospective.view', params: { id: retrospective.id } };
  }
});
