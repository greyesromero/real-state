<template>
<v-card class="mt-3" color="amber lighten-5">
	<v-list-item>
		<v-list-item-avatar color="grey">
			<v-icon class="white--text font-weight-bold">mdi-exclamation</v-icon>
		</v-list-item-avatar>
		<v-list-item-content>
			<v-list-item-title class="title font-weight-regular">Agrega método de pago.</v-list-item-title>
		</v-list-item-content>
		<v-list-item-icon>
			<v-dialog v-model="payment_dialog" max-width="500" persistent>
				<template v-slot:activator="{on}">

					<v-btn icon>
						<v-icon @click="payment_dialog = true">mdi-plus</v-icon>
					</v-btn>


				</template>

				<v-card :loading="loading">
					<v-card-title class="headline" primary-title>
						Nuevo Método de Pago
					</v-card-title>
					<v-card-text>
						<v-form v-model="valid" :lazy-validation="lazy"  ref="form">
							<v-text-field color="secondary" name="credit_card_token" label="No. Tarjeta" outlined v-model.lazy="credit_card_token" v-mask="mask" required :rules="[v => (v || '' ).length >= 12 || 'La tarjeta de crédito debe poseer 12 dígitos']"></v-text-field>

							<v-text-field color="secondary" name="card_holder" label="Nombre Titular" outlined v-model.lazy="card_holder" required :rules="[v => !!v || 'Titular es requerido']"></v-text-field>
							<v-row >
								<v-col cols="6">							
								<v-text-field color="secondary" name="card_date" label="Fecha Vencimiento" outlined v-model.lazy="card_date" v-mask="mask_date" required :rules="[v => !!v || 'Fecha vencimiento es requerida']"></v-text-field>

								</v-col>
								<v-col cols="6">
									<v-text-field color="secondary" name="cvv" label="CVV" outlined v-model.lazy="cvv" required :rules="[v => !!v || 'CVV es requerido']"></v-text-field>
								</v-col>
							</v-row>
							
							<!--v-subheader class="title">Datos de Facturación</v-subheader>
							<v-text-field color="secondary" name="invoice_name" label="Nombre Factura" outlined v-model.lazy="invoice_name" required :rules="[v => !!v || 'Nombre para facturación es requerido']"></v-text-field>

							<v-text-field color="secondary" name="tin" label="NIT" outlined v-model.lazy="tin" v-mask="mask_tin" required :rules="[v => !!v || 'NIT es requerido']"></v-text-field>
							<v-textarea color="secondary" name="address" label="Dirección" outlined v-model.lazy="address" required :rules="[v => !!v || 'Dirección es requerida']"></v-textarea-->

						</v-form>
					</v-card-text>
					<v-card-actions>
						<div class="flex-grow-1"></div>
						<v-btn @click="resetPayment()" text>Cancelar</v-btn>
						<v-btn @click="createPayment" outlined>
							Crear
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-list-item-icon>
	</v-list-item>
</v-card>
</template>

<script>
import { mask } from 'vue-the-mask'
import axios from 'axios'
export default {
	directives: {
      mask,
	},
	props: ['doctor'],
	data: () => ({
		mask: '#### #### #### ####',
		mask_date: '##/##',
		mask_tin: '#######-#',
		payment_dialog: false,
		loading: false,
		invoice_name: null,
		currentImg: 'card',
		type_set: [
			{
				text: 'VISA',
				img: 'visa'
			},
			{
				text: 'MasterCard',
				img: 'mastercard'
			}
		],
		card_holder: null,
		credit_card_token: null,
		cvv: null,
		type: 1,
		card_date: null,
		tin: null,
		address: null,
		valid: true,
		lazy:false,
		
	}),
	computed: {
		getUser : function(){ 
			return this.$store.getters.getUser
		},
	},
	methods: {
		createPayment() {
			if (this.$refs.form.validate()){
				this.loading = true
				let final_card = this.credit_card_token.substring(15,19)
				axios.patch('https://hsrealestate-api.herokuapp.com/api/users/'+this.getUser.id+'/',{
					credit_card:  final_card,
				})
				.then(response => {
					this.$emit('createPayment', {
						card_holder: this.card_holder,
						credit_card: final_card,
						cvv: this.cvv,
						type: this.type,
						card_date: this.card_date,
						tin: this.tin,
						address: this.address,
						invoice_name: this.invoice_name
					});
					this.payment_dialog = false;
					this.$refs.form.reset()
					this.loading = false
				})
				.catch(error => {
					this.loading = false
					console.log(error);
				})
			
				
			}
		},
		getCardType(){
			if(this.credit_card_token.length >= 2){
				if (this.credit_card_token.startsWith('12')) {
					this.currentImg = this.type_set[0].img
					this.type = this.type_set[0].text
				}else{
					this.currentImg = this.type_set[1].img
					this.type = this.type_set[1].text
				}
			}else{
				this.currentImg = 'card'
				this.type = null
			}
		},
		resetPayment(){
			this.payment_dialog=false
			this.$refs.form.reset()
		},
	},
	
}
</script>
