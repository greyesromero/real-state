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
			secondary: '#140d40',
			accent: '#e6e7e8',
			background: '#140d40'
			},
			dark: {
			primary: '#ef6a49',
			secondary: '#140d40',
			accent: '#e6e7e8',
			background: '#140d40'
			},
		},
	},
});