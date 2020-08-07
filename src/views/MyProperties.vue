<template>
	<div>
		<section id="properties">
			<v-container 
				v-if="loading"
				fluid 
				grid-list-md 
				class="px-2 ma-0" 
				:style="{width: $vuetify.breakpoint.lgAndUp ? '100%' : '100%'}">
				<div  class="center-container">
					<v-container fill-height>
						<v-layout align-center justify-center>
						<v-progress-circular
							:size="48"
							:width="4"
							color="primary lighten-1"
							indeterminate
						></v-progress-circular>
						</v-layout>
					</v-container>
				</div>
			</v-container>
			<v-container v-if="properties" px-8>
				<v-row>
					<v-toolbar class="mb-3" style="background-color:transparent!important;box-shadow:none!important;">
						<h2 class="text-left headline-1 font-weight-regular text--darken-1 mt-5 mb-5">Total Propiedades: {{filteredProperties.length}} </h2>
						<v-spacer></v-spacer>
					</v-toolbar>
					<!-- Info General -->
					<v-col cols="12">
						<v-toolbar class="mb-3">
							<v-text-field hide-details prepend-icon="mdi-magnify" single-line color="red lighten-2" v-model="search"></v-text-field>

							<v-spacer></v-spacer>
							<v-btn @click="sortBy('name')" text>
								Nombre
								<v-icon right>mdi-unfold-more-horizontal</v-icon>
							</v-btn>
							
						</v-toolbar>
						<v-layout >
							<v-container fluid grid-list-xl class="pa-0">
								<v-layout v-if="filteredProperties.length>0" row wrap>
									<PropertyList v-for="(property, index) in filteredProperties" :property="property" :index="index"  v-on:createPayment="createPayment($event)">
									</PropertyList>
								</v-layout>
							</v-container>
						</v-layout>
					</v-col>
				</v-row>
			</v-container>
		</section>
	</div>
</template>

<script>
import axios from 'axios'
import PropertyList from '../components/PropertyList.vue'
export default {
	components: {
		PropertyList
	},
	data: () => ({
		properties: true,
		selected_gym:0,
		search: '',
		properties:[],
		loading: false,
		payment: []
	
	}),
	computed: {

		filteredProperties: function() {
			let filtered = this.properties;
			if (this.search) {
				filtered = this.properties.filter(
				m => m.title.toLowerCase().indexOf(this.search) > -1
				);
			}

		
			
			return filtered;
		}
	},
	methods: {
		
		sortBy(prop) {
			this.properties.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
		},
		updateStatus(data){
			this.properties[data.index].active = data.state
		},
		//PAYMENT METHODS
		createPayment(data) {
			this.payment.push({
				card_holder: data.card_holder,
				credit_card_token: data.credit_card_token.substring(15,19),
				cvv: data.cvv,
				type: data.type,
				card_date: data.card_date,
				tin: '',
				address: '',
				invoice_name: ''
			})
			
			this.$store.dispatch('updatePayment', this.payment)
			
			/*this.$store.commit('changeLoadingState', true)
			axios.patch('https://gudker-api.herokuapp.com/api/staff/'+this.doctor_id+'/',{
				tin: data.tin,
				credit_card_token:  data.credit_card_token.substring(15,19),
				address: data.address
			})
			.then(response => {
				this.payment.push({
					card_holder: data.card_holder,
					card_number: data.credit_card_token.substring(15,19),
					cvv: data.cvv,
					type: data.type,
					card_date: data.card_date,
					tin: data.tin,
					address: data.address
				});
				
				this.$store.commit('changeLoadingState', false)
			})
			.catch(error => {
				this.$store.commit('changeLoadingState', false)
				console.log(error);
			})*/
			
			
		},
		deletePayment(index) {
		this.payment.splice(index, 1);
			/*this.$store.commit('changeLoadingState', true)
			axios.patch('https://gudker-api.herokuapp.com/api/staff/'+this.doctor_id+'/',{
				tin: null,
				credit_card_token:  null,
				address: null
			})
			.then(response => {
				this.payment.splice(index, 1);
				
				this.$store.commit('changeLoadingState', false)
			})
			.catch(error => {
				this.$store.commit('changeLoadingState', false)
				console.log(error);
			})*/
			
		},
	},
	created() {
	

	},
	mounted () {
		this.properties.push({
			image: '../assets/img/house4.jpg',
			title: ' Casa Deluxe en Antigua Guatemala',
			date: '2020-08-05',
			status: false
		})
	}
}
</script>
