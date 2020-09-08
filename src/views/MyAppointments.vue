<template>
	<div>
		
		<section id="appointments" >
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
			<v-container  v-if="properties" px-8>
				
				<v-row>
						
					<!-- Info General -->
					<v-col cols="12">
						<!--v-toolbar class="mb-3">
							<v-text-field hide-details prepend-icon="mdi-magnify" single-line color="red lighten-2" v-model="search"></v-text-field>

							<v-spacer></v-spacer>
							<v-btn @click="sortBy('name')" text>
								Fecha
								<v-icon right>mdi-unfold-more-horizontal</v-icon>
							</v-btn>
							
						</v-toolbar-->
						<v-layout >
							<v-container fluid grid-list-xl class="pa-0">
								

								<v-tabs height="64px" color="primary" grow>
									<v-tab>
										<v-icon left>mdi-account-outline</v-icon>
										Mis Citas - Cliente
									</v-tab>
									<v-tab>
										<v-icon left>mdi-account-group-outline</v-icon>
										Mis Citas - Agente
									</v-tab>
									<v-tab-item>
										<v-toolbar class="mb-3 mt-3" style="background-color:transparent!important;box-shadow:none!important;">
											<h2 class="text-left headline-1 font-weight-regular text--darken-1 mt-5 mb-5">Total Citas: {{this.client_appointments.length}}</h2>
													
											<v-spacer></v-spacer>
											<span>
												<v-menu bottom right >
													<template v-slot:activator="{ on }">
														<v-btn outlined v-on="on">
															
															<span >{{ filters[selected_filter]['value']}}</span>
															<v-icon right>mdi-menu-down</v-icon>
														</v-btn>
													</template>
													
													<v-list>
														<v-list-item  v-for="(filter, index) in filters" :key="index"  @click.native="selectFilter(index)">
															<v-list-item-title>{{ filter['value'] }}</v-list-item-title>
														</v-list-item>
													</v-list>
												</v-menu>
											</span>
										</v-toolbar>
										<Appointment v-for="(client, index) in client_appointments" :key="client.id" :appointment="client" :index="index" v-on:cancelAppointment="cancelAppointment($event)">
										</Appointment>
									</v-tab-item>
									<v-tab-item>
										<v-toolbar class="mb-3 mt-3" style="background-color:transparent!important;box-shadow:none!important;">
											<h2 class="text-left headline-1 font-weight-regular text--darken-1 mt-5 mb-5">Total Citas: {{this.agent_appointments.length}} </h2>
													
											<v-spacer></v-spacer>
											<span>
												<v-menu bottom right >
													<template v-slot:activator="{ on }">
														<v-btn outlined v-on="on">
															
															<span >{{ filters[selected_filter]['value']}}</span>
															<v-icon right>mdi-menu-down</v-icon>
														</v-btn>
													</template>
													
													<v-list>
														<v-list-item  v-for="(filter, index) in filters" :key="index"  @click.native="selectFilter(index)">
															<v-list-item-title>{{ filter['value'] }}</v-list-item-title>
														</v-list-item>
													</v-list>
												</v-menu>
											</span>
										</v-toolbar>
										<Appointment v-for="(agent, index) in agent_appointments" :key="agent.id" :appointment="agent" :index="index" v-on:cancelAppointment="cancelAppointment($event)">
										</Appointment>
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
import Appointment from '../components/Appointment.vue'
export default {
	components: {
		Appointment
	},
	data: () => ({
		client_appointments: [],
		agent_appointments: [],
		properties: true,
		selected_gym:0,
		search: '',
		array_providers:[],
		selected_filter: 0,
		loading: false,
		filters:[{
			id: 1,
			value: 'Todas'
		},
		{
			id: 2,
			value: 'Pasadas'
		},
		{
			id: 3,
			value: 'Pendientes'
		}]
	
	}),
	computed: {
		getUser : function(){ 
			return this.$store.getters.getUser
		},
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
		selectFilter(index) {
			this.selected_filter = index;	
		
		
		},
	},
	created() {
	

	},
	mounted () {
		this.client_appointments = this.getUser.client_appointments
		this.agent_appointments = this.getUser.agent_appointments
	}
}
</script>
