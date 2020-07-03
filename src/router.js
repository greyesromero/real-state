import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

let router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		
		{
			path: '/',
			name: 'home',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ './views/Home.vue')
		},
		{
			path: '/login',
			name: 'login',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ './views/Login.vue')
		},
	
		{
			path: '/dashboard',
			name: 'dashboard',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ './views/Dashboard.vue'),
			meta: { 
				requiresAuth: true
			}
		},
		{
			path: '/register',
			name: 'register',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ './views/Register.vue'),
			
		},
		{
			path: '/tu-mejor-version',
			name: 'tu-mejor-version',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ './views/TuMejorVersion.vue')
		},
		{
			path: '/clases-en-vivo',
			name: 'clases-en-vivo',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ './views/Clases.vue'),
		
		},
		{
			path: '/especialistas',
			name: 'especialistas',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ './views/Especialistas.vue'),
			
		},
		{
			path: '/blog',
			name: 'blog',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ './views/Blog.vue')
		},
		{
			path: '/profile',
			name: 'profile',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ './views/Profile.vue'),
			meta: { 
				requiresAuth: true
			}
		},
		{
			path: '/detail/:id',
			name: 'detail',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ './views/BlogDetail.vue'),
			props: true,
			
		},
		{
			path: '/payment',
			name: 'payment',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ './views/Payment.vue'),
			meta: { 
				requiresAuth: true
			}
			
		},
		{
			path: '/confirmation',
			name: 'confirmation',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ './views/Confirmation.vue'),
			meta: { 
				requiresAuth: true
			}
		
			
		}
	]
})

export default router
router.beforeEach((to, from, next) => {
if(to.matched.some(record => record.meta.requiresAuth)) {
	if (store.getters.isLoggedIn) {
	next()
	return
	}
	next('/') 
	} else {
		
		next() 
	}
})