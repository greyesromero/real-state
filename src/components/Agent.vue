<template>
<v-card class="mt-3" flat>
	<!-- AGENT -->
	<v-list-item >
        <v-list-item-avatar>
		  	<img z-index="0" v-if="agent.image==null"  class="profile-picture" :src="'../assets/img/sin-imagen.jpg'" alt="alt" lazy-src="../assets/logo.png">
			<img z-index="0" v-if="agent.image!=null"  class="profile-picture" :src="agent.image" alt="alt" lazy-src="../assets/logo.png">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{agent.first_name}} {{agent.last_name}}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
		  	<v-btn color="secondary" icon>
				<v-icon>mdi-message-text</v-icon>
			</v-btn>
			<v-dialog v-model="delete_dialog" max-width="500" persistent>
				<template v-slot:activator="{on}">
					<v-btn color="secondary" icon v-on="on">
						<v-icon>mdi-calendar-clock</v-icon>
					</v-btn>
				</template>
				<v-card :loading="loading">
					<v-card-title class="headline" primary-title>
						Seguro que deseas eliminar al agente?
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
        </v-list-item-icon>
	</v-list-item>
</v-card>
</template>

<script>
export default {
	props: ['agent', 'index'],
	data: () => ({
		// days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
		edit_dialog: false,
		delete_dialog: false,
		loading: false,

	}),
	computed: {
	
		getUser : function(){ 
			return this.$store.getters.getUser
		},

	},
	methods: {
		deleteStaff() {
			this.$emit('deleteStaff', this.index);
			this.delete_dialog = false;
		},
	}
}
</script>
