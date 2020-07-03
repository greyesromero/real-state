import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'
import Axios from 'axios'
import Moment from 'moment'
import { extendMoment } from 'moment-range';
import VueYouTubeEmbed from 'vue-youtube-embed'

const moment = extendMoment(Moment);
Vue.config.productionTip = false
Vue.prototype.$http = Axios;
Vue.prototype.moment = moment

const token = localStorage.getItem('token')
if (token) {
  	Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
	router,
	moment,
	vuetify,
	store,
	render: h => h(App)
}).$mount('#app')


import * as VueGoogleMaps from 'vue2-google-maps'


Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyB_mDKJhzARrNp3fzFR_Zzoi2ZFMbF5BN4',
		libraries: 'places', // This is required if you use the Autocomplete plugin
		// OR: libraries: 'places,drawing'
		// OR: libraries: 'places,drawing,visualization'
		// (as you require)

		//// If you want to set the version, you can do so:
		// v: '3.26',
	},

	//// If you intend to programmatically custom event listener code
	//// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
	//// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
	//// you might need to turn this on.
	// autobindAllEvents: false,

	//// If you want to manually install components, e.g.
	//// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
	//// Vue.component('GmapMarker', GmapMarker)
	//// then set installComponents to 'false'.
	//// If you want to automatically install all the components this property must be set to 'true':
	installComponents: true
})

Vue.use(VueYouTubeEmbed)

