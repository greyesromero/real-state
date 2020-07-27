<template>
<div>
	<v-speed-dial fixed bottom right >
		<template v-slot:activator>
			<v-btn color="primary " dark fab>
				<v-icon>mdi-tools</v-icon>
			</v-btn>
		</template>
		<v-tooltip left color="black">
			<template v-slot:activator="{ on }">
				<v-btn color="primary" v-on="on" v-on:click="delete_dialog=true"  fab dark>
			<v-icon>mdi-trash-can-outline</v-icon>
		</v-btn>
			</template>
			<span>Eliminar Propiedad</span>
		</v-tooltip>
		<v-tooltip color="black" left>
			<template v-slot:activator="{ on }">
				<v-btn color="primary" v-on="on" v-on:click="dialog_fullscreen=true"  fab dark>
			<v-icon>mdi-square-edit-outline</v-icon>
		</v-btn>
			</template>
			<span>Editar Información</span>
		</v-tooltip>
	
	
	</v-speed-dial>
	<!-- Update -->
	 <v-dialog v-model="dialog_fullscreen" fullscreen hide-overlay transition="dialog-bottom-transition">
     	<UpdateProperty v-on:closeDialog="closeDialog($event)"></UpdateProperty>
    </v-dialog>
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

</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import UpdateProperty from '../components/UpdateProperty.vue'

export default {
	props: ['appointment'],
	components: {
		UpdateProperty
	},
	data() {
		return {
			loading: false,
			delete_dialog: false,
			update_dialog: false,
			dialog_fullscreen: false
		}
	},
	computed: {
		getUser : function(){ 
		return this.$store.getters.getUser
		}
	},
	methods: {
		closeDialog(){
			this.dialog_fullscreen = false
		},
	},
	mounted() {
		
	}
}
</script>
