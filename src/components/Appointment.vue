<template>
<v-card class="mb-3">
	 
	<!-- APPOINTMENT -->
	<v-list-item class="colored_border">
			<v-list-item-avatar color="primary" >
			<v-icon color="white">mdi-calendar</v-icon>
		</v-list-item-avatar>
		<v-list-item-content>
			<v-list-item-title class="title font-weight-regular">{{moment().locale('es').format("D [de] MMMM [de] YYYY [a las] hh:mm a")}} </v-list-item-title>
			<v-list-item-subtitle  class="font-weight-regular">Cliente: Gabriela Reyes</v-list-item-subtitle>

		</v-list-item-content>
		
		
		
		<!--v-list-item-icon class="justify-center align-self-center">
			<v-btn color="cyan darken-4" icon :to="`/detail/`">
					<v-icon>mdi-square-edit-outline</v-icon>
				</v-btn>

		
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
		</v-list-item-icon-->
		<!-- ACTIONS -->
		
		

		
	</v-list-item>
	<v-expansion-panels>
		<v-expansion-panel>
			<v-expansion-panel-header>Más Información</v-expansion-panel-header>
			<v-expansion-panel-content>
				<div class="my-2">
					<span>Teléfono: 30380592</span>		
				</div>
				<div class="my-2">
					<span>Email: gabi@test.com</span>		
				</div>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>

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


