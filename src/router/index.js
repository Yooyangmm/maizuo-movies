import Vue from 'vue'
import VueRouter from 'vue-router'
import Films from '@/views/MaizuoFilms'
import NowPlaying from '@/views/films/NowPlaying'
import ComingSoon from '@/views/films/ComingSoon'
import Cinemas from '@/views/MaizuoCinemas'
import Search from '@/views/MaizuoSearch'
import Center from '@/views/MaizuoCenter'
import Order from '@/views/MyOrder'
import Detail from '@/views/FilmDetail'
import City from '@/views/CinemaCity'

Vue.use(VueRouter) // 注册路由插件, 两个全局组件 router-view 和 router-link

// 路由配置表
const routes = [
  {
    path: '/films',
    component: Films,
    children: [
      {
        path: '/films/nowplaying',
        component: NowPlaying
      },
      {
        path: '/films/comingsoon',
        component: ComingSoon
      },
      {
        // 重定向
        path: '/films',
        redirect: '/films/nowplaying'
      }
    ]
  },
  {
    name: 'yoyangDetail', // 命名路由
    path: '/detail/:id', // 动态的二级路由
    component: Detail
  },
  {
    path: '/cinemas',
    component: Cinemas
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/cinemas/search',
    component: Search
  },
  {
    path: '/center',
    mata: {
      isYoyangRequested: true
    },
    component: Center
  },
  {
    path: '/order',
    mata: {
      isYoyangRequested: true
    },
    component: Order
  },
  {
    // 重定向
    path: '*',
    redirect: 'films'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 全局拦截
router.beforeEach((to, from, next) => {
  // console.log('tototo', to)
  // console.log(to.meta.isYoyangRequested)
  next()
  // next是一个函数，表示允许继续往路由目标跳转
  // next()

  // 当所要跳转页面的路径为个人中心时，拦截
  // if (to.fullPath !== '/center') {
  //   next()
  // }
})

export default router
