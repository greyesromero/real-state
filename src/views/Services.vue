<template>
<div>
		<Loader :visible="loading" />

	<Navbar></Navbar>
	<v-container class="pt-10">
		
	</v-container>
	<NewService v-on:createService="createService($event)"></NewService>
</div>
</template>

<script>
import axios from 'axios'
import Navbar from '../components/Navbar.vue'
import NewService from '../components/NewService.vue'
import Service from '../components/Service.vue'
import Schedule from '../components/Schedule.vue'
import EmptySchedule from '../components/EmptySchedule.vue'
import Loader from '../components/Loader.vue'


export default {
	components: {
		Navbar,
		NewService,
		Service,
		Schedule,
		EmptySchedule,
		Loader
	
	},
	data: () => ({
		open: null,
		close: null,
		open_dialog: false,
		close_dialog: false,
		loading: false,
		provider_id: null,
		selected_service: 0,
		services: [],
		gyms: [],
		schedule: [],
		workouts: [],
		map_center: {
			lat: null,
			lng: null,
		},
		map_options: {
			zoomControl: true,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: false,
			disableDefaultUi: true,
		},
		type_set: [
		{
			id: 1,
			value: 'A'	
		},
		{
			id: 2,
			value: 'B'
		},
		{
			id: 3,
			value: 'C'
		},
		{
			id: 4,
			value: 'D'
		}],
	}),
	computed: {
		getUser : function(){ 
			return this.$store.getters.getUser
		},
	},
	methods: {
		// gyms
		selectService(index) {
			this.selected_service = index;
			this.getServices()
		},
		getServices(){
			this.schedule = []
			this.loading = true
			let selected_id = this.services[this.selected_service].id
			axios.get('https://choosemyfitness-api.herokuapp.com/api/services/'+selected_id+'/')
			.then(response => {
				this.schedule = response.data.schedule
				//this.workouts = this.sortByKey(this.workouts,'name');

				this.loading = false
			})
			.catch(error => {
				this.loading = false
				console.log(error);
			})
		},

		createService(data) {
			this.services.push(data);
			this.selected_service = this.services.length - 1;
			this.getServices()
		},
		

		// SCHEDULE
		createSchedule(data) {
			data.forEach((value, index) => {
				this.schedule.push(value);
			});

			//this.workouts = this.sortByKey(this.workouts,'name');
		},
		updateStatus(data){
			this.schedule[data.index].active = data.state
		},
		updateService(data){
			this.services[data.index].active = data.state
		},
		updateInfo(){
			this.loading = true
			axios.patch('https://choosemyfitness-api.herokuapp.com/api/services/' + this.services[this.selected_service].id + '/',  {
					name: this.services[this.selected_service].name,
					description: this.services[this.selected_service].description,
					price: this.services[this.selected_service].price,
					duration: this.services[this.selected_service].duration,
					
					
				})
				.then(response => {
					//this.$store.dispatch('loadClinics');
					this.services[this.selected_service].name = response.data.name
					this.services[this.selected_service].address = response.data.address
					this.services[this.selected_service].phone = response.data.phone
					this.services[this.selected_service].price = response.data.price
					this.services[this.selected_service].description = response.data.description
					this.services[this.selected_service].open = response.data.open
					this.services[this.selected_service].close = response.data.close

					this.services[this.selected_service].latitude = response.data.latitude
					this.services[this.selected_service].longitude = response.data.longitude
					this.map_center.lat = response.data.latitude
					this.map_center.lng =  response.data.longitude
					this.loading = false


				})
				.catch(error => {
					console.log(error);
					this.loading = false
				})
		},

		

		//ORDERING
		compare(a, b) {
			const dayA = a.day;
			const dayB = b.day;

			return dayA > dayB ? 1 : -1;
		},
		sortByKey(array, key) {
			return array.sort(function(a, b) {
				var x = a[key]; var y = b[key];
				return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});
		},
	},
	mounted() {
		
	},
	created(){
		this.loading = true
		axios.get('https://choosemyfitness-api.herokuapp.com/api/services/providers/'+this.getUser.id+'/')
		.then(response => {
			this.services = response.data.services
			this.provider_id = response.data.id
		
			this.getServices()

			this.loading = false
		})
		.catch(error => {
			this.loading = false
			console.log(error);
		})
	}

}
</script>
