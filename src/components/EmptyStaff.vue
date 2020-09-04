<template>
<v-card class="mt-3" color="amber lighten-5">
	<v-list-item>
		<v-list-item-avatar color="grey">
			<v-icon class="white--text font-weight-bold">mdi-exclamation</v-icon>
		</v-list-item-avatar>
		<v-list-item-content>
			<v-list-item-title class="title font-weight-regular">Agrega a un agente.</v-list-item-title>
		</v-list-item-content>
		<v-list-item-icon>
			<v-dialog v-model="staff_dialog" max-width="500" persistent>
				<template v-slot:activator="{on}">

					<v-btn icon>
						<v-icon @click="staff_dialog = true">mdi-plus</v-icon>
					</v-btn>


				</template>

				<v-card :loading="loading">
					<v-card-title class="headline" primary-title>
						Nuevo Agente
					</v-card-title>
					<v-card-text>
						<div class="mb-4">
							Agrega a un agente a tu propiedad.
						</div>
						<v-form  v-model="valid" :lazy-validation="lazy"  ref="form">
							<v-autocomplete color="secondary" label="Colaborador" :items="staff_set" v-model="staff" item-text="first_name" item-value="id" outlined  return-object required :rules="[v => !!v || 'Selecciona a un usuario']">
								<template slot='selection' slot-scope='{ item }'>
									{{ item.first_name }} {{ item.last_name }}
								</template>
								<template slot='item' slot-scope='{ item }'>
									{{ item.first_name }} {{ item.last_name }}
								</template>
								<template v-slot:no-data>
									<v-list-item>
										<v-list-item-title>
											No hay agentes disponibles
										</v-list-item-title>
									</v-list-item>
								</template>
							</v-autocomplete>
							<!--<v-select :items="days_set" v-model="days" chips label="Días" multiple outlined></v-select>-->
						</v-form>
						<span style="color:#006064;">{{this.message}}</span>
					</v-card-text>
					<v-card-actions>
						<div class="flex-grow-1"></div>
						<v-btn @click="resetStaff()" text>Cancelar</v-btn>
						<v-btn @click="createStaff" outlined>
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
import axios from 'axios'

export default {
	props: ['clinic','employees'],
	data: () => ({
		staff_dialog: false,
		loading: false,

		/* days_set: [{
				value: 0,
				text: 'Lunes',
			},
			{
				value: 1,
				text: 'Martes',
			},
			{
				value: 2,
				text: 'Miércoles',
			},
			{
				value: 3,
				text: 'Jueves',
			},
			{
				value: 4,
				text: 'Viernes',
			},
			{
				value: 5,
				text: 'Sábado',
			},
			{
				value: 6,
				text: 'Domingo',
			}
		], */
		currentClinic: localStorage.currentClinic,
		staff_set: [],
		staff: null,
		message: null,
		valid: true,
		lazy:false,
		// days: null,
	}),
	computed: {
		getUser : function(){ 
		return this.$store.getters.getUser
		},
		
	},
	methods: {
		createStaff() {
			
			if (this.$refs.form.validate()){
				this.message = null;
				let checkStaff = this.employees.slice();
				if(this.employees.length>0){
					let check = checkStaff.filter(s => s.id == this.staff.id);
					if(check.length>0){
						this.message = 'Este agente ya está agregado, intenta con uno diferente.'
					}else{
						
						this.$emit('createStaff', {
							staff: this.staff,
						});
						this.staff_dialog = false;
						this.$refs.form.reset()
					}
				}else{
						
						this.$emit('createStaff', {
							staff: this.staff,
						});
						this.staff_dialog = false;
						this.$refs.form.reset()
				}
				
			}
		},
		resetStaff(){
			this.staff_dialog = false
			this.$refs.form.reset()
			this.message = null
		}
	},
	mounted() {
	
		axios
			.get('https://hsrealestate-api.herokuapp.com/api/users/')
			.then(response => (this.staff_set = response.data.filter(staff => staff.id!=this.getUser.id)))

	},
	
}
</script>
