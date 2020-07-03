<template>
<v-card class="mb-3" :loading="loading">
	<v-list-item>
		<v-list-item-avatar color="primary">
			<v-icon color="white">mdi-tools</v-icon>
		</v-list-item-avatar>
		<v-list-item-content>
			<v-list-item-title class="title font-weight-regular">{{this.service.name}}</v-list-item-title>
			<v-list-item-subtitle>
				<h5 class="text-gray mb-3" v-if="this.status == true">Status: <v-icon color="success" x-small>mdi-checkbox-blank-circle</v-icon>&nbsp;Activo </h5>
				<h5 class="text-gray mb-3" v-if="this.status == false">Status: <v-icon color="error" x-small>mdi-checkbox-blank-circle</v-icon>&nbsp;Inactivo </h5>

			</v-list-item-subtitle>
		</v-list-item-content>
		<v-list-item-icon>
				<!-- UPDATE -->
				<v-switch  color="primary" v-model.lazy="status"  @change="changeState()"  hint="Status"
				persistent-hint></v-switch>
		</v-list-item-icon>
	</v-list-item>
	
</v-card>
</template>

<script>
import axios from 'axios'
export default {
	props: ['service', 'index'],
	data: () => ({
		loading: false,
		delete_dialog: false,
		status: false
	}),
	methods: {
		changeState(){
			let state = this.service.active == true ? false: true
			axios
			.patch('https://choosemyfitness-api.herokuapp.com/api/services/'+this.service.id+'/',{active: state})
			.then(response => {
				//this.status = response.data.active
				let data = {
					index: this.index,
					state: state
				}
				this.$emit('updateService', data)
			})
		},
	},
	created(){
		this.status = this.service.active
	}
}
</script>
