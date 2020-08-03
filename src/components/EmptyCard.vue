<template>
<div>
	<v-btn class="ma-2"  @click="new_patient_dialog = true" outlined color="secondary">
       Agregar<v-icon right>mdi-credit-card-outline</v-icon>
    </v-btn>

	<v-dialog v-model="new_patient_dialog" width="500">
		<v-card>
			<v-card-title>
				
				<span class="primary--text text-center">Crear Método de Pago</span>
			</v-card-title>
			<v-card-text class="mb-0">
				<v-form v-model="valid" :lazy-validation="lazy"  ref="form">
						<v-text-field color="secondary" name="credit_card_token" label="No. Tarjeta" outlined v-model.lazy="credit_card_token" v-mask="mask" required :rules="[v => !!v || 'Número de tarjeta es requerido']"></v-text-field>

						<v-text-field color="secondary" name="card_holder" label="Nombre Titular" outlined v-model.lazy="card_holder" required :rules="[v => !!v || 'Titular es requerido']"></v-text-field>
						<v-row >
							<v-col cols="6">							
							<v-text-field color="secondary" name="card_date" label="Fecha Vencimiento" outlined v-model.lazy="card_date" v-mask="mask_date" required :rules="[v => !!v || 'Fecha vencimiento es requerida']"></v-text-field>

							</v-col>
							<v-col cols="6">
								<v-text-field color="secondary" name="cvv" label="CVV" outlined v-model.lazy="cvv" required :rules="[v => !!v || 'CVV es requerido']"></v-text-field>
							</v-col>
						</v-row>

				</v-form>
				<v-dialog v-model="error" max-width="500" persistent>
					<v-card>
						<v-card-title class="headline" primary-title>
							Error
						</v-card-title>
					
						<v-card-text>
							{{ this.message }}
						</v-card-text>
						<v-card-actions>
							<div class="flex-grow-1"></div>
							<v-btn @click="error = false" text>OK</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
				
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text v-on:click="resetPatient()">Cancelar</v-btn>
				<v-btn color="secondary" v-on:click="createPatient()">Guardar</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</div>
</template>

<script>
import axios from 'axios'
import { mask } from 'vue-the-mask'

export default {
	directives: {
		mask,
	},
	props: ['doctor'],
	data() {
		return {
			mask: '#### #### #### ####',
		mask_date: '##/##',
		mask_tin: '#######-#',
			new_patient_dialog: false,
			gender_set: [{
				id: 1,
				value: 'Hombre'
			},
			{
				id: 2,
				value: 'Mujer'
			}],
			email: null,
			first_name: null,
			last_name: null,
			birth_date_dialog: false,
			birth_date: null,
			gender: null,
			address: null,
			rules: [
				value => !!value || 'Required.',
			],
			message: null,
			error: false,
			doctor_id: null,
			valid: true,
			lazy:false,
			card_holder: null,
			credit_card_token: null,
			cvv: null,
			type: 1,
			card_date: null,
			tin: null,
			address: null,
			payment: [],
			counter: 0
		
		}
	},
	computed: {
		getUser : function(){ 
			return this.$store.getters.getUser
		},
	},
	methods: {
		resetPatient(){
			this.new_patient_dialog=false
			this.$refs.form.reset()
		},
		createPatient() {

			this.message = '';
			this.error = false;
			if (this.$refs.form.validate()){
				this.loading = true
			
				this.$emit('selectCard', {
					id: this.counter++,
					card_holder: this.card_holder,
					credit_card_token: this.credit_card_token.substring(15,19),
					cvv: this.cvv,
					type: this.type,
					card_date: this.card_date,
					tin: this.tin,
					address: this.address,
				});

				
				
				
				this.$refs.form.reset()
				this.loading = false
				this.new_patient_dialog = false
				
				
			}
			
			
		},
	},
}
</script>
