<template>
	<v-flex xs12  py-2>
		<v-card>
	 
			<!-- APPOINTMENT -->
			<v-list-item class="colored_border">
				<v-list-item-avatar color="primary">
						<img class="profile-picture" v-if="property.images.length>0" :src="property.images[0].image" alt="alt" lazy-src="../assets/logo.png">
						<img z-index="0" v-if="property.images.length==0"  class="profile-picture" :src="'../assets/img/sin-imagen.jpg'" alt="alt" lazy-src="../assets/logo.png">

				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title class="title font-weight-regular"> {{property.name}}</v-list-item-title>
					<v-list-item-subtitle v-if="published == false"  class="font-weight-regular"><v-icon small>mdi-bell</v-icon>&nbsp;Sin Publicar</v-list-item-subtitle>
					<v-list-item-subtitle v-if="published == true" class="font-weight-regular"><v-icon small color="secondary">mdi-bell</v-icon>&nbsp;Publicado: {{duration}} días</v-list-item-subtitle>

				</v-list-item-content>
				
				
				
				<v-list-item-icon class="justify-center align-self-center">
					<!-- Publish -->
					<v-dialog v-model="publish_dialog" max-width="500" persistent>
							<template v-slot:activator="{on}">
								<v-btn color="primary" icon v-on="on">
									<v-icon>mdi-bell-plus</v-icon>
								</v-btn>
							</template>
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
									<v-select color="secondary" label="Metodo de Pago" :items="payment_options" v-model="payment" item-text="credit_card" item-value="id" outlined  return-object required :rules="[v => !!v || 'Metodo de pago es requerido']">
										<template slot='selection' slot-scope='{ item }'>
											**** **** **** {{ item.credit_card }} 
										</template>
										<template slot='item' slot-scope='{ item }'>
											**** **** **** {{ item.credit_card }} 
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
					<!-- Consulta -->
					<v-btn color="primary" icon router  :to="`/detail/`+property.id">
						<v-icon>mdi-eye</v-icon>
					</v-btn>
					<!-- Update -->
					<v-dialog v-model="dialog_fullscreen" fullscreen hide-overlay transition="dialog-bottom-transition">
						<template v-slot:activator="{on}">
							<v-btn color="primary" icon v-on="on">
								<v-icon>mdi-square-edit-outline</v-icon>
							</v-btn>
						</template>
						<UpdateProperty v-on:closeDialog="closeDialog($event)" :original_property="property"></UpdateProperty>
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
				</v-list-item-icon>
				<!-- ACTIONS -->
				
				

				
			</v-list-item>

		</v-card>
	</v-flex>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import UpdateProperty from '../components/UpdateProperty.vue'
import EmptyCard from '../components/EmptyCard.vue'

import { mask } from 'vue-the-mask'
export default {
	directives: {
      mask,
	},
  	props: ['property', 'index', 'view'],
	components: {
		UpdateProperty,
		EmptyCard
	},
  	data: () => ({
		dias: 0,
		payment: null,
		payment_options: [],
		published: false,
		
		publish_dialog: false,
		edit_dialog: false,
		delete_dialog: false,
		update_blog_dialog: false,
		card: null,
		loading: false,
		load: false,
		resultado: null,
		status: null,
		upload_image: [],
		dialog_fullscreen: false,
		valid: true,
		valid_payment: true,
		lazy:false,
		lazy_payment: false,
		duration: null,
		
		
	}),
	computed: {
		getUser : function(){ 
			return this.$store.getters.getUser
		},
	},
  	methods: {
		  closeDialog(){
			this.dialog_fullscreen = false
			this.$emit('updateProperties')
		},
	
		confirmPublish(){
			if (this.$refs.form.validate()){
				this.published = true
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
	mounted(){
		if(this.getUser.credit_card!=null){
			this.payment_options.push({
				id:1,
				credit_card: this.getUser.credit_card
			})
		}

		
	
	}

}
</script>
<style>
.colored_border {
	border-left: solid #003d51 5px;
}
  
</style>


