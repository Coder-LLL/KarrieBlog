import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import( /* webpackChunkName: 'Login' */ '@/views/Login/Login')
const Setting = () => import( /* webpackChunkName: 'Setting' */ '@/views/Setting/Setting')

const Layout = () => import( /* webpackChunkName: 'Layout' */ '@/views/Layout/Layout')

const Home = () => import( /* webpackChunkName: 'Home' */ '@/views/Home/Home')
const Moment = () => import( /*webpackChunkName: 'Moment'*/ '@/views/Moment/Moment')
const PublishBlog = () => import( /*webpackChunkName: 'Moment'*/ '@/views/PublishBlog/PublishBlog')
const Category = () => import( /*webpackChunkName: 'Moment'*/ '@/views/Category/Category')
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: '/home',
      children: [{
          path: '/home',
          name: 'Home',
          meta: {
            title: '首页'
          },
          isNavigationBar: true,
          component: Home
        },
        {
          path: '/moment/:momentId',
          name: 'moment',
          meta: {
            title: '博客详情'
          },
          component: Moment
        }, {
          path: '/setting',
          name: 'Setting',
          component: Setting,
        }, {
          path: '/publishBlog',
          name: 'PublishBlog',
          component: PublishBlog,
        }, {
          path: '/category',
          name: 'Category',
          component: Category,
        }
      ]
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
    },


  ]
})
