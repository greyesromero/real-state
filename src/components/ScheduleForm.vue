<template>
 <v-card :loading="loading" class="mx-auto" min-width="345" tile flat>
							
								<v-card-text class="pb-0">

									<v-form v-model="valid" :lazy-validation="lazy"  ref="form">
										<v-layout row wrap>
											<v-flex xs6>
												<v-text-field hide-details v-model.lazy="first_name" outlined color="secondary" label="Nombre"  :rules="[v => !!v || 'Nombre es requerido']" required></v-text-field>

											</v-flex>
											<v-flex xs6>
												<v-text-field hide-details v-model.lazy="last_name" outlined color="secondary" label="Apellido"  :rules="[v => !!v || 'Apellido es requerido']" required></v-text-field>

											</v-flex>
											<v-flex xs12>
												<v-text-field hide-details v-model.trim="email" outlined color="secondary" label="E-mail"  :rules="emailRules" required></v-text-field>

											</v-flex>
											<v-flex xs12>
												<v-text-field hide-details outlined color="secondary" label="Teléfono" required></v-text-field>

											</v-flex>
											<v-flex xs12>
												<v-textarea color="secondary" name="description" label="Descripción" outlined v-model="mensaje"></v-textarea>

											</v-flex>
										</v-layout>
									</v-form>
								
									
								</v-card-text>
								<v-card-actions class="align-self-center align-content-center justify-center center align-center">
									
									<v-btn type="submit" block color="primary" large depressed>
										Solicitar Información
									</v-btn>								
								</v-card-actions>
							</v-card>
</template>

<script>
import moment from 'moment'

export default {
  name: 'schedule-form',
  props: ['property'],
  data() {
    return {
      	loading: false,
		first_name: null,
		last_name: null,
		email: null,
		valid: true,
		lazy:false,
		dialog: false,
		mensaje: 'Me interesa la casa en Antigua Guatemala',
		emailRules: [
			v => !!v || 'E-mail es Requerido',
			v => /.+@.+/.test(v) || 'Ingresa un email válido',
		],
    }
  },
 
}
</script>
