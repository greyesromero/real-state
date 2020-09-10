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
			<v-container v-if="!loading && properties" px-8>
				<v-row>
					
					<!-- Info General -->
					<v-col cols="12">
						
						<v-layout >
							<v-container fluid grid-list-xl class="pa-0">
								

							<v-tabs height="64px" color="primary" grow>
							<v-tab>
								<v-icon left>mdi-home-city</v-icon>
								Mis Propiedades
							</v-tab>
							<v-tab>
								<v-icon left>mdi-home-group</v-icon>
								Propiedades Administradas
							</v-tab>
							
							<!-- Información General -->
							<v-tab-item>
								<v-toolbar class="mb-3 mt-5" style="background-color:transparent!important;box-shadow:none!important;">
									<h2 v-if="search==''" class="text-left headline-1 font-weight-regular text--darken-1 mt-5 mb-5">Total Propiedades: {{properties.length}} </h2>
									<h2 v-if="search!=''" class="text-left headline-1 font-weight-regular text--darken-1 mt-5 mb-5">Total Propiedades: {{filteredProperties.length}} </h2>

								
								</v-toolbar>
								<v-toolbar class="mb-3">
									<v-text-field hide-details prepend-icon="mdi-magnify" single-line color="red lighten-2" v-model="search"></v-text-field>

									<v-spacer></v-spacer>
									<v-btn @click="sortBy('name')" text>
										Nombre
										<v-icon right>mdi-unfold-more-horizontal</v-icon>
									</v-btn>
											
								</v-toolbar>
								<v-layout v-if="filteredProperties.length>0" row wrap>
									<PropertyList v-for="(property, index) in filteredProperties" :key="property.id" :property="property" :index="index"  v-on:createPayment="createPayment($event)" v-on:updateProperties="updateProperties($event)" v-on:confirmPublish="confirmPublish($event)">
									</PropertyList>
								</v-layout>
								<v-pagination
									v-if="search==''"
									v-model="page"
									:length="Math.ceil(properties.length/perPage)"
								></v-pagination>
							</v-tab-item>
							<!-- Métodos de Pago -->
								<v-tab-item  class="mb-10">
										<v-toolbar class="mb-3 mt-5" style="background-color:transparent!important;box-shadow:none!important;">
									<h2 v-if="search==''" class="text-left headline-1 font-weight-regular text--darken-1 mt-5 mb-5">Total Propiedades: {{managed_properties.length}} </h2>
									<h2 v-if="search!=''" class="text-left headline-1 font-weight-regular text--darken-1 mt-5 mb-5">Total Propiedades: {{filteredManagedProperties.length}} </h2>

								
								</v-toolbar>
								<v-toolbar class="mb-3">
									<v-text-field hide-details prepend-icon="mdi-magnify" single-line color="red lighten-2" v-model="searchManaged"></v-text-field>

									<v-spacer></v-spacer>
									<v-btn @click="sortBy('name')" text>
										Nombre
										<v-icon right>mdi-unfold-more-horizontal</v-icon>
									</v-btn>
											
								</v-toolbar>
								<v-layout v-if="filteredManagedProperties.length>0" row wrap>
									<PropertyList v-for="(property, index) in filteredManagedProperties" :key="property.id" :property="property" :index="index"  v-on:createPayment="createPayment($event)" v-on:updateProperties="updateProperties($event)" v-on:confirmPublish="confirmPublish($event)">
									</PropertyList>
								</v-layout>
								<v-pagination
									v-if="searchManaged=='' && managed_properties.length > 0"
									v-model="pageM"
									:length="Math.ceil(managed_properties.length/perPage)"
								></v-pagination>
								
								</v-tab-item>
							
							
							</v-tabs>

								
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
		tab: 0,
		properties: true,
		selected_gym:0,
		managed_properties: [],
		search: '',
		searchManaged: '',
		properties:[],
		loading: false,
		payment: [],
		page: 1,
		perPage: 10,
		pageM: 1,
		perPageM: 10,
		selected_filter: 0,
		filters:[{
			id: 1,
			value: 'Todas'
		},
		{
			id: 2,
			value: 'Propias'
		},
		{
			id: 3,
			value: 'Administradas'
		}]
	
	}),
	computed: {

		filteredProperties: function() {
			let filtered = this.properties;
			if (this.search) {
				filtered = this.properties.filter(
				m => m.name.toLowerCase().indexOf(this.search) > -1
				);
				return filtered;
			}else{
				return filtered.slice((this.page - 1)* this.perPage, this.page* this.perPage);
			}

		
			
			
		},
		filteredManagedProperties: function() {
			let filtered_managed = this.managed_properties;
			if (this.searchManaged) {
				filtered_managed = this.managed_properties.filter(
				m => m.name.toLowerCase().indexOf(this.searchManaged) > -1
				);
				return filtered_managed;
			}else{
				return filtered_managed.slice((this.pageM - 1)* this.perPageM, this.pageM* this.perPageM);
			}

		
			
			
		},
		getUser : function(){ 
			return this.$store.getters.getUser
		},
		visiblePages () {
			return this.properties.slice((this.page - 1)* this.perPage, this.page* this.perPage)
		},

		visiblePagesManaged () {
			return this.managed_properties.slice((this.pageM - 1)* this.perPageM, this.pageM* this.perPageM)
		},
	},
	methods: {
		confirmPublish(data){
			this.properties[data.index].active_until = data.date
			

		},
		updateProperties(){
			this.loading = true
			axios.get('https://hsrealestate-api.herokuapp.com/api/users/'+this.getUser.id+'/')
			.then(response => {
				this.$store.dispatch('getProfile', this.getUser.id)
				this.properties = response.data.owned_properties
				this.managed_properties = response.data.managed_properties
				this.loading = false
			})
			.catch(error => {
				this.loading = false
				console.log(error);
			})

		},
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
		console.log(this.getUser)
		this.loading = true
		axios.get('https://hsrealestate-api.herokuapp.com/api/users/'+this.getUser.id+'/')
		.then(response => {
			
			this.properties = response.data.owned_properties
			this.managed_properties = response.data.managed_properties
			this.loading = false
		})
		.catch(error => {
			this.loading = false
			console.log(error);
		})
		
	}
}
</script>
