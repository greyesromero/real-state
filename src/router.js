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
			path: '/detail',
			name: 'detail',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ './views/Detail.vue'),
			
		},
		{
			path: '/search',
			name: 'search',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ './views/Search.vue'),
			meta: { 
				hideNavigation: true
			},
			props: true,
			
		},
		{
			path: '/my-properties',
			name: 'my-properties',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ './views/MyProperties.vue'),
			meta: { 
				requiresAuth: true
			}
			
		},
		{
			path: '/my-appointments',
			name: 'my-appointments',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ './views/MyAppointments.vue'),
			meta: { 
				requiresAuth: true
			}
			
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
			path: '/chat',
			name: 'chat',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ './views/Chat.vue'),
			meta: { 
				requiresAuth: true,
				hideNavigation: true
			}
			
		},
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