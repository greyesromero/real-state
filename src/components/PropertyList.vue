<template>
<v-card class="mb-3">
	 
	<!-- APPOINTMENT -->
	<v-list-item class="colored_border">
		<v-list-item-avatar color="primary">
				<img class="profile-picture" :src="'../assets/img/house4.jpg'" alt="alt" lazy-src="../assets/logo.png">
		</v-list-item-avatar>
		<v-list-item-content>
			<v-list-item-title class="title font-weight-regular"> Casa Deluxe en Antigua Guatemala </v-list-item-title>
			<v-list-item-subtitle  class="font-weight-regular">Disponible a partir de {{moment().locale('es').format("D [de] MMMM [de] YYYY")}}</v-list-item-subtitle>

		</v-list-item-content>
		
		
		
		<v-list-item-icon class="justify-center align-self-center">
			<v-btn color="cyan darken-4" icon :to="`/detail/`">
					<v-icon>mdi-square-edit-outline</v-icon>
				</v-btn>

			<!-- Delete -->
				<v-dialog v-model="delete_dialog" max-width="500" persistent>
					<template v-slot:activator="{on}">
						<v-btn color="primary" icon v-on="on">
							<v-icon>mdi-trash-can</v-icon>
						</v-btn>
					</template>
					<v-card :loading="loading">
						<v-card-title class="headline" primary-title>
							¿Seguro que deseas borrar el registro?
						</v-card-title>
						<v-card-text>
							Esta acción es permanente.
						</v-card-text>
						<v-card-actions>
							<div class="flex-grow-1"></div>
							<v-btn @click="delete_dialog = false" text>Cancelar</v-btn>
							<v-btn  @click="delete_dialog = false" color="primary" dark>
								<v-icon left>mdi-trash-can</v-icon>
								Borrar
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
		</v-list-item-icon>
		<!-- ACTIONS -->
		
		

		
	</v-list-item>

</v-card>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  props: ['news', 'index', 'view'],

  data: () => ({
		edit_dialog: false,
		delete_dialog: false,
		update_blog_dialog: false,
		loading: false,
		load: false,
		resultado: null,
		status: null,
		upload_image: [],
	}),
  	methods: {
	}

}
</script>
<style>
.colored_border {
	border-left: solid #003d51 5px;
}
  
</style>


