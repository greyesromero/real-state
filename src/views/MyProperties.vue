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
			<v-container v-if="properties" fill-height px-8>
				
				<v-row>
						<v-toolbar class="mb-3" style="background-color:transparent!important;box-shadow:none!important;">
								<h2 class="text-left headline-1 font-weight-regular text--darken-1 mt-5 mb-5">Total Propiedades: 1</h2>
										
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
							
									<PropertyList  v-on:updateStatus="updateStatus($event)">
									</PropertyList>
							
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
		array_providers:[],
		loading: false
	
	}),
	computed: {

		filteredProviders: function() {
			let filtered = this.array_providers;
			if (this.search) {
				filtered = this.array_providers.filter(
				m => m.name.toLowerCase().indexOf(this.search) > -1
				);
			}

		
			
			return filtered;
		}
	},
	methods: {
		
		sortBy(prop) {
			this.array_providers.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
		},
		createProvider(data) {
			this.array_providers.push(data);
			
		},
		updateStatus(data){
			this.array_providers[data.index].active = data.state
		},
	},
	created() {
	

	},
	mounted () {
		
	}
}
</script>
