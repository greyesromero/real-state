import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'swiper/dist/css/swiper.min.css'

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: 'mdi',
	},
	theme: {
		themes: {
			light: {
			primary: '#003d51',
			secondary: '#717a77',
			accent: '#efa173',
			},
			dark: {
			primary: '#003d51',
			secondary: '#717a77',
			accent: '#efa173',
			},
		},
	},
});