import nProgress from "nprogress";
import { createRouter, createWebHistory } from "vue-router";
import { userInfo } from "../api/user";
import { userStore } from "../store/user";
import Index from "../views/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/index/home"
    },
    {
      path: "/login/:idx*",
      name: "login",
      component: () => import('../views/login/index.vue')
    },
    {
      path: "/index",
      name: "index",
      redirect: "/index/home",
      component: Index,
      children: [
        {
          path: "home",
          name: "home",
          component: () => import('../views/home/index.vue')
        },
        {
          path: "product/:id",
          name: "product",
          component: () => import('../views/content/product/index.vue')
        },
        {
          path: "cart",
          name: "cart",
          component: () => import('../views/content/cart/index.vue')
        },
        {
          path: "order",
          name: "order",
          redirect: "/index/order/submit",
          component: () => import('../views/content/order/index.vue'),
          children: [
            {
              path: "submit/:cartItemIds*",
              name: "submit",
              component: () => import('../views/content/order/submit.vue'),
              props: true
            },
            {
              path: "pay/:id",
              name: "pay",
              component: () => import('../views/content/order/pay.vue'),
              props: true
            },
            {
              path: "success",
              name: "success",
              component: () => import('../views/content/order/success.vue')
            }
          ]
        },
        {
          path: "user",
          name: "user",
          redirect: "/index/user/user-home",
          component: () => import('../views/content/user/index.vue'),
          children: [
            {
              path: "user-home",
              name: "user-home",
              component: () => import('../views/content/user/home.vue')
            },
            {
              path: "information",
              name: "information",
              component: () => import('../views/content/user/information.vue')
            }
          ]
        },
        {
          path: "star",
          name: "star",
          component: () => import('../views/content/star/index.vue')
        },
        {
          path: "history",
          name: "history",
          component: () => import('../views/content/history/index.vue')
        },
        {
          path: "search/:homeText",
          name: "search",
          component: () => import('../views/content/search/index.vue'),
          props: true
        }
      ]
    },
    // 捕获所有未匹配到的路由
    // https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E6%8D%95%E8%8E%B7%E6%89%80%E6%9C%89%E8%B7%AF%E7%94%B1%E6%88%96-404-Not-found-%E8%B7%AF%E7%94%B1
    // 此处不能重定向，否则重定向会覆盖全局解析守卫中的跳转，导致刷新网页也跳转到 404
    {
      path: '/:pathMatch(.*)*',
      name: "error",
      component: () => import('@/views/error/index.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    var el = document.querySelector('#app > div')
    if(el) {
      el.scrollIntoView();
    }
  }
});

/**
 * 前置路由守卫
 */
router.beforeEach((to, from) => {
  //每次切换页面时调用进度条
  nProgress.start();
  //跳转
  return true;
});

/**
 * 后置路由守卫
 */
router.afterEach(() => {
  //页面切换完成关闭进度条
  nProgress.done();
});

/**
 * 全局解析守卫
 * 是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。
 */
router.beforeResolve(async to => {
  //跳转到登陆页面时不发送下面的请求，否则会导致路由无限重定向
  //因为我设置了响应拦截器，当返回的后端自定义状态码为401时，在拦截器内有跳转到登录页面的代码
  if (to.name !== 'login') {
    //获取用户信息
    const store = userStore();
    if ((store.user.id == null || store.user.id == "") && localStorage.getItem("token")) {
      try {
        //用户信息没有获取过
        const response = await userInfo();
        if (response != null) {
          //将返回数据保存到pinia中
          store.user = response.data;
        } else {
          return true;
        }
      } catch (error) {
        //错误 取消导航
        return false;
      }
    }
  }
});

export default router;