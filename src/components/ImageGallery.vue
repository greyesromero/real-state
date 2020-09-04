<template>
<v-card flat tile v-if="finalImage">
		
		<!-- STAFF -->
		 <v-img
                class="white--text"
                height="150px"
				max-width="150px"
                :src="this.image.image">
                 <v-container
                    fill-height
                    fluid
                    pa-2
                    style="background-color: rgba(0,0,0,.3)">
					<v-layout row wrap align-start>
							<v-flex xs12 d-flex justify-end>
							 
								
								<v-dialog v-model="delete_dialog" max-width="500" persistent>
									<template v-slot:activator="{on}">
										<v-btn icon color="white" v-on="on">
										<v-icon large>mdi-delete-circle</v-icon>
										</v-btn>									
									</template>
									<v-card :loading="loading">
										<v-card-title class="headline" primary-title>
											Seguro que deseas eliminar esta imagen?
										</v-card-title>
										<v-card-text>
											Esta acción es permanente.
										</v-card-text>
										<v-card-actions>
											<div class="flex-grow-1"></div>
											<v-btn @click="delete_dialog = false" text>Cancelar</v-btn>
											<v-btn @click="deleteStaff" color="primary" dark>
												<v-icon left>mdi-close</v-icon>
												Borrar
											</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
							</v-flex>
						</v-layout>
                
                </v-container>
		</v-img>
	</v-card>

</template>

<script>
import axios from 'axios'
export default {
	
	props: ['image', 'index'],
	data: () => ({
		// days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
		edit_dialog: false,
		delete_dialog: false,
		loading: false,
		finalImage: null

	}),
	computed: {
	
		getUser : function(){ 
			return this.$store.getters.getUser
		},

	},
	methods: {
		deleteStaff() {
			this.loading = true			
			axios.delete('https://hsrealestate-api.herokuapp.com/api/properties/images/' + this.image.id + '/')
			.then(response => {
				this.loading = false
				this.$emit('deleteImage', this.index);
				this.delete_dialog = false;
				
			})
			.catch(error => {
				console.log(error);
				this.loading = false
			})
			
		},
	},
	mounted(){
		this.finalImage = this.image
	}
}
</script>
