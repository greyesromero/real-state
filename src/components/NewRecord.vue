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
		<v-tooltip left color="black">
			<template v-slot:activator="{ on }">
				<v-btn color="primary" v-on="on" v-on:click="publish_dialog=true"  fab dark>
			<v-icon>mdi-bell-plus</v-icon>
		</v-btn>
			</template>
			<span>Publicar Propiedad</span>
		</v-tooltip>
	
	
	</v-speed-dial>
	<!-- Update -->
	 <v-dialog v-model="dialog_fullscreen" fullscreen hide-overlay transition="dialog-bottom-transition">
     	<UpdateProperty v-on:closeDialog="closeDialog($event)"></UpdateProperty>
    </v-dialog>
	 <!-- Delete -->
	<v-dialog v-model="delete_dialog" max-width="500" persistent>
	
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

	<!-- Publish -->
	<v-dialog v-model="publish_dialog" max-width="500" persistent>
		
			<v-card :loading="loading">
				<v-toolbar style="box-shadow:none!important;">

						<v-toolbar-title><span class="primary--text text-center title">Publicar Propiedad</span></v-toolbar-title>

						<v-spacer></v-spacer>

						<EmptyCard v-if="payment_options.length == 0" class="align-end" v-on:selectCard="selectCard($event)"></EmptyCard>
						
				</v-toolbar>
	

			<v-card-text>
				<div class="mb-2">
					Selecciona un método de pago y duración de anuncio para publicar la proppiedad
				</div>

				<v-form v-model="valid" :lazy-validation="lazy"  ref="form">
					<v-select color="secondary" label="Metodo de Pago" :items="payment_options" v-model="payment" item-text="credit_card_token" item-value="id" outlined  return-object required :rules="[v => !!v || 'Metodo de pago es requerido']">
						<template slot='selection' slot-scope='{ item }'>
							**** **** **** {{ item.credit_card_token }} 
						</template>
						<template slot='item' slot-scope='{ item }'>
							**** **** **** {{ item.credit_card_token }} 
						</template>
					</v-select>	
					<v-text-field color="secondary" name="duration" label="Duración Publicación" suffix="días" outlined v-model.lazy="duration" required :rules="[v => !!v || 'Duración es requerida']">
					</v-text-field>						
				</v-form>
			</v-card-text>
			
			<v-card-actions>
				<div class="flex-grow-1"></div>
				<v-btn @click="resetPayment()" text>Cancelar</v-btn>
				<v-btn @click="confirmPublish()" color="secondary" class="white--text">
					Crear
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
import EmptyCard from '../components/EmptyCard.vue'
export default {
	props: ['appointment'],
	components: {
		UpdateProperty,
		EmptyCard
	},
	data() {
		return {
			loading: false,
			delete_dialog: false,
			update_dialog: false,
			dialog_fullscreen: false,
			publish_dialog: false,
			payment_options: [],
			payment: null,
			valid: true,
			lazy:false,
			duration: null,
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
		confirmPublish(){
			if (this.$refs.form.validate()){
				this.publish_dialog=false
			}
			
		
		},
		
		resetPublish(){
			this.publish_dialog=false
			this.days = 0
		},
		selectCard(data){
			this.payment_options.push(data);
			this.payment = data
			this.$store.dispatch('updatePayment', this.payment_options)
			console.log(this.payment_options)
			
		},
		resetPayment(){
			this.$refs.form.reset()
			this.publish_dialog = false
		}
	},
	mounted() {
		this.payment_options = this.getUser.payment_options
	}
}
</script>
