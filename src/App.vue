<template>
<v-app>
	 <AppBar />
	<v-content class="white">
		<router-view></router-View>
		
	</v-content>
	<Footer/>
</v-app>
</template>

<script>
import AppBar from './components/Appbar'
import Footer from './components/Footer'

export default {
	name: 'App',
	components: {
		 AppBar,
		  Footer,
	},
	data: () => ({
		//
	}),
	computed:{
		theme(){
		return (this.$vuetify.theme.dark) ? 'dark' : 'light'
		}
	},
	created: function () {
		this.$http.interceptors.response.use(undefined, function (err) {
			return new Promise(function (resolve, reject) {
				if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
				 this.$store.dispatch('logout')
				}
				throw err;
			});
		});
	}
};
</script>

