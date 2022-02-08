/* eslint-disable prettier-vue/prettier */
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage'
// import ErrorPage from '@/views/ErrorPage'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'Home',
      component: HomePage,
      meta: {
        title: 'Ether Daddy',
        description: 'Ether Daddy'
      }
    },
    // {
    //   path: '/*',
    //   name: '404',
    //   component: ErrorPage,
    //   meta: {
    //     title: '404'
    //   }
    // }
  ],
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  }
})

/**
 * Global after hook.
 *
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
async function afterEach(to, from, next) {
  await router.app.$nextTick();
}

router.afterEach(afterEach)

export default router;
