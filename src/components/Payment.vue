<template>
<div>
<v-card class="mt-3">
	<!-- PAYMENT METHOD -->
	<v-list-item v-if="payment">
		<v-list-item-avatar color="secondary">
			<span class="white--text display-1" ><v-icon class="white--text font-weight-bold">mdi-credit-card</v-icon></span>
		</v-list-item-avatar>
		<v-list-item-content>
			<v-list-item-title  style="text-align:left!important;" class="title font-weight-regular left-align">**** **** **** {{this.getUser.credit_card}}</v-list-item-title>
			<v-list-item-subtitle class="left-align" style="text-align:left!important;">{{this.getUser.first_name}} {{this.getUser.last_name}}</v-list-item-subtitle>
		</v-list-item-content>
		<v-list-item-content>
			<v-list-item-title class="title font-weight-regular">05/22</v-list-item-title>
		</v-list-item-content>
		
		

		<!-- ACTIONS -->
		<v-list-item-icon>
			<!-- DELETE -->
			<v-dialog v-model="delete_dialog" max-width="500" persistent>
				<template v-slot:activator="{on}">
					<v-btn color="secondary" icon v-on="on">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</template>
				<v-card :loading="loading">
					<v-card-title class="headline" primary-title>
						Seguro que deseas eliminar el método de pago?
					</v-card-title>
					<v-card-text>
						Esta acción es permanente.
					</v-card-text>
					<v-card-actions>
						<div class="flex-grow-1"></div>
						<v-btn @click="delete_dialog = false" text>Cancelar</v-btn>
						<v-btn @click="deletePayment" color="primary" dark>
							<v-icon left>mdi-close</v-icon>
							Borrar
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-list-item-icon>
	</v-list-item>

	<!--v-expansion-panels>
		<v-expansion-panel>
			<v-expansion-panel-header>Datos de Facturación</v-expansion-panel-header>
			<v-expansion-panel-content>
			<v-list >
				
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title>Nombre Facturación</v-list-item-title>
								<v-list-item-subtitle>{{this.payment.card_holder}}</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title>NIT</v-list-item-title>
								<v-list-item-subtitle>{{this.payment.tin}}</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title>Dirección</v-list-item-title>
								<v-list-item-subtitle>{{this.payment.address}}</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					
				
			</v-list>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels-->
</v-card>
</div>
</template>

<script>
import axios from 'axios'
export default {
	props: ['payment'],
	data: () => ({
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
		deletePayment() {
			this.loading = true
			axios.patch('https://hsrealestate-api.herokuapp.com/api/users/'+this.getUser.id+'/',{
				credit_card:  null,
			})
			.then(response => {
				this.loading = false
				this.$emit('deletePayment');
				this.delete_dialog = false;
			})
			.catch(error => {
				this.loading = false
				console.log(error);
			})
			
		},
		
	},
	mounted(){
		
	}
}
</script>
