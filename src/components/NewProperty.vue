<template>
	<div fill-height class="h-100">
		<v-card fill-height class="h-100" :loading="loading">
			<v-toolbar dark color="primary">
			<v-btn icon dark @click="closeDialog()">
				<v-icon>mdi-close</v-icon>
			</v-btn>
			<v-toolbar-title>Nueva Propiedad</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<v-btn dark text @click="closeDialog()" v-if="e1==7">Confirmar Propiedad</v-btn>
			</v-toolbar-items>
			</v-toolbar>
			<v-stepper v-model="e1" class="elevation-0">
		<v-stepper-header class="elevation-0">
				<v-stepper-step step="1" :complete="e1 > 1">Nueva Propiedad</v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step step="2" :complete="e1 > 2">Ubicación</v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step step="3" :complete="e1 > 3">Título y Descripción</v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step step="4" :complete="e1 > 4">Especificaciones</v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step step="5" :complete="e1 > 5">Servicios</v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step step="6" :complete="e1 > 6">Fotos</v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step step="7" :complete="e1 > 7">Precio y disponibilidad</v-stepper-step>
			</v-stepper-header>
				
			<v-stepper-items >
				<v-stepper-content step="1">
					<v-card color="lighten-1" class="mb-5" h-100 flat>
						<v-container
							fluid
							grid-list-lg
							
							:class="[$vuetify.breakpoint.smAndDown ? 'px-1' : 'px-10']"
							>
							<v-layout row wrap justify-center :class="[$vuetify.breakpoint.smAndDown ? 'px-1' : 'px-10']">
								<v-flex xs12 md12 align-self-center>
									<span class="display-2">¡Te damos la bienvenida! Tu viaje en el mundo de bienes raíces empieza aquí.</span>
									<p class="headline mt-8">
										Distribuimos su propiedad a más de 100 redes de listados en línea en todo el mundo.

									</p>
									<p class="headline mt-8">
										Lo mantenemos actualizado con las últimas estadísticas de su listado de casas, así como las métricas de tendencias de las ventas de casas pasadas, presentes y futuras en su vecindario.

									</p>
								
									
								</v-flex>
								
							</v-layout>
						</v-container>
					</v-card>
					<v-container fluid grid-list-md fill-height>
											
							<v-layout row wrap align-end>
								
								<v-flex xs12 d-flex justify-end>
									<v-btn
										color="primary"
										@click="nextStep(e1)"
										>
										Comenzar
										</v-btn>
									
								</v-flex>
								
							</v-layout>
					</v-container>
				</v-stepper-content>
				<v-stepper-content step="2">
					<v-container fluid grid-list-md fill-height>
						<v-layout row wrap align-end>
							<v-flex xs6 d-flex justify-start>
								<v-btn
								v-if="e1!=1"
								color="primary"
								@click="previewStep(e1)"
								>
								Anterior
								</v-btn>
							</v-flex>
							<v-flex xs6 d-flex justify-end>
								<v-btn
								color="primary"
								@click="validateStepTwo()"
								>
								Siguiente
								</v-btn>
							</v-flex>
						</v-layout>
					</v-container>
					<v-card color="lighten-1" class="mb-5" flat>
						<v-container
							fluid
							grid-list-lg
							:class="[$vuetify.breakpoint.smAndDown ? 'px-1' : 'px-10']"
							>
							<v-layout row wrap justify-center :class="[$vuetify.breakpoint.smAndDown ? 'px-1' : 'px-10']">
								<v-flex xs12 md12 align-self-center text-center>
									<span class="display-1">¿Está el marcador en la ubicación correcta?</span>
									<p class="heading-4 mt-3 my-0">
										Si es necesario, puedes ajustar el mapa para que el marcador esté en la ubicación correcta. 


									</p>
									 <v-container grid-list-lg>
										<v-layout row wrap>

										
											<v-flex xs12 md4 class="mt-3">
												<p>Solo los clientes confirmados podrán tener acceso a ella para saber cómo llegar a su propiedad.</p>
											<v-text-field
												label="Dirección"
												v-model="createForm.address"
												:error="!!createForm.addressError"
												:error-messages="createForm.addressError"
												outlined
											></v-text-field>
											</v-flex>
											<v-flex xs12 md8>
												<GmapMap @center_changed="updateCenter" :options="this.map_options" :center="this.map_center" :zoom="15" map-type-id="roadmap" style="width: auto; height: 250px">
													<GmapMarker  color="secondary" :position="this.coordinates" />
												</GmapMap>
											</v-flex>
										</v-layout>
										</v-container>
								
									
								
									
								</v-flex>
								
							</v-layout>
						</v-container>
					</v-card>
				
				</v-stepper-content>
				<v-stepper-content step="3">
					<v-container fluid grid-list-md fill-height>
						<v-layout row wrap align-end>
							<v-flex xs6 d-flex justify-start>
							
								<v-btn
								v-if="e1!=1"
								color="primary"
								@click="previewStep(e1)"
								>
								Anterior
								</v-btn>
							</v-flex>
							<v-flex xs6 d-flex justify-end>
								<v-btn
								color="primary"
								@click="validateStepThree()"
								>
								Siguiente
								</v-btn>
								
							</v-flex>
							
						</v-layout>
					</v-container>
					<v-card color="lighten-1" class="mb-5" flat>
						<v-container
							fluid
							grid-list-lg
							:class="[$vuetify.breakpoint.smAndDown ? 'px-1' : 'px-10']"
							>
							<v-layout row wrap justify-center :class="[$vuetify.breakpoint.smAndDown ? 'px-1' : 'px-10']">
								<v-flex xs12 md12 align-self-center text-center>
									<span class="display-1">Describe la propiedad</span>
									<p class="heading-4 mt-3">
										Atrae la atención de los clientes con un título que destaque el motivo por el que la propiedad es especial. Menciona las mejores características de tu propiedad, cualquier servicio especial como wifi rápido o estacionamiento, además de lo que más te gusta del vecindario.



									</p>
									<v-container fluid px-12 py-0>
										<v-row>
											<v-col cols="12" sm="12" md="12">
												<v-text-field 
												v-model="createForm.name"
												:error="!!createForm.nameError"
												:error-messages="createForm.nameError"
												 color="secondary" name="title" label="Título" outlined  maxlength="50" counter></v-text-field>

											</v-col>
											<v-col cols="12" sm="12" md="12">

												<v-textarea 
												v-model="createForm.description"
												:error="!!createForm.descriptionError"
												:error-messages="createForm.descriptionError"
												color="secondary" name="description" label="Descripción"  outlined>
												</v-textarea>
											</v-col>
										</v-row>
									</v-container>	
								</v-flex>
								
							</v-layout>
						</v-container>
					</v-card>
				
				</v-stepper-content>
				<v-stepper-content step="4">
					<v-container fluid grid-list-md fill-height>
						<v-layout row wrap align-end>
							<v-flex xs6 d-flex justify-start>
							
								<v-btn
								v-if="e1!=1"
								color="primary"
								@click="previewStep(e1)"
								>
								Anterior
								</v-btn>
							</v-flex>
							<v-flex xs6 d-flex justify-end>
								<v-btn
									color="primary"
									@click="nextStep(e1)"
									>
									Siguiente
									</v-btn>
								
							</v-flex>
							
						</v-layout>
					</v-container>
					<v-card color="lighten-1" class="mb-5" flat>
						<v-container
							fluid
							grid-list-lg
							:class="[$vuetify.breakpoint.smAndDown ? 'px-1' : 'px-10']"
							>
							<v-layout row wrap justify-center :class="[$vuetify.breakpoint.smAndDown ? 'px-1' : 'px-10']">
								<v-flex xs12 md12 align-self-center text-center>
									<span class="display-1">Especificaciones</span>
									<p class="heading-4 mt-5">
									Estos son los servicios que los clientes esperan encontrar normalmente, pero puedes añadir aún más después de publicar la propiedad.



									</p>
									<v-container grid-list-lg>
										<v-layout row wrap>
											<!--v-flex xs12 md6>
												<v-container fluid grid-list-md fill-height px-5>
													
													<v-layout row wrap>
														<v-flex xs6 md9 d-flex justify-start>
															<span>Habitaciones</span>
														</v-flex>
														<v-flex xs6 md3 d-flex justify-end>
															<v-text-field 
															v-model.number="foo" 
															append-outer-icon="mdi-plus-circle-outline" 
															@click:append-outer="increment" 
															prepend-icon="mdi-minus-circle-outline" 
															@click:prepend="decrement">
															</v-text-field>
														</v-flex>
														<v-flex xs6 md9 d-flex justify-start>
															<span>Baños</span>
														</v-flex>
														<v-flex xs6 md3 d-flex justify-end>
															<v-text-field 
															v-model.number="foo" 
															append-outer-icon="mdi-plus-circle-outline" 
															@click:append-outer="increment" 
															prepend-icon="mdi-minus-circle-outline" 
															@click:prepend="decrement">
															</v-text-field>
														</v-flex>
													</v-layout>
												</v-container>
											</v-flex-->
											<v-flex xs12 md12>
												<v-container fluid grid-list-md fill-height px-5>
													
													<v-layout row wrap>
														<v-flex xs12 md4 d-flex justify-start>
															<span>Tamaño</span>
														</v-flex>
														<v-flex xs12 md8 d-flex justify-end>
														<v-text-field color="secondary" name="size" label="" suffix="m²" outlined>
														</v-text-field>
														</v-flex>
														<v-flex xs12 md4 d-flex justify-start>
															<span>Tipo</span>
														</v-flex>
														<v-flex xs12 md8 d-flex justify-end>
															<v-select
															:items="createForm.propertyTypes"
															v-model="createForm.type"
															outlined
															></v-select>
														</v-flex>
													</v-layout>
												</v-container>
											</v-flex>
										</v-layout>
									</v-container>
								</v-flex>
								
							</v-layout>
						</v-container>
					</v-card>
					
				</v-stepper-content>
				<v-stepper-content step="5">
					<v-container fluid grid-list-md fill-height>
						<v-layout row wrap align-end>
							<v-flex xs6 d-flex justify-start>
								<v-btn
								v-if="e1!=1"
								color="primary"
								@click="previewStep(e1)"
								>
								Anterior
								</v-btn>
							</v-flex>
							<v-flex xs6 d-flex justify-end>
								<v-btn
								color="primary"
								@click="nextStep(e1)"
								>
								Siguiente
								</v-btn>
							</v-flex>
						</v-layout>
					</v-container>
					<v-card color="lighten-1" class="mb-5" flat>
						<v-container
							fluid
							grid-list-lg
							:class="[$vuetify.breakpoint.smAndDown ? 'px-1' : 'px-10']"
							>
							<v-layout row wrap justify-center :class="[$vuetify.breakpoint.smAndDown ? 'px-1' : 'px-10']">
								<v-flex xs12 md12 align-self-center text-center>
									<span class="display-1">¿Qué servicios ofrece la propiedad?</span>
									<p class="heading-4 mt-5">
									Estos son los servicios que los clientes esperan encontrar normalmente, pero puedes añadir aún más después de publicar la propiedad.



									</p>
									<v-container fluid px-12>
												<v-row>
													<v-col cols="12" sm="4" md="4">
														<v-checkbox
														v-model="ex4"
														label="A/C"
														color="primary"
														
														hide-details
														></v-checkbox>
														<v-checkbox
														v-model="ex4"
														label="Secadora"
														color="primary"
																												hide-details
														></v-checkbox>
													</v-col>
													<v-col cols="12" sm="4" md="4">
														<v-checkbox
														v-model="ex4"
														label="Pet Friendly"
														color="primary"
														hide-details
														></v-checkbox>
														<v-checkbox
														v-model="ex4"
														label="Extracción Basura"
														color="primary"
														hide-details
														></v-checkbox>
													</v-col>
													<v-col cols="12" sm="4" md="4">
														<v-checkbox
														v-model="ex4"
														label="Calefacción"
														color="primary"
														hide-details
														></v-checkbox>
														<v-checkbox
														v-model="ex4"
														label="Lavadora"
														color="primary"
														hide-details
														></v-checkbox>
													</v-col>
													</v-row>

											</v-container>
								
									
								</v-flex>
								
							</v-layout>
						</v-container>
					</v-card>
				</v-stepper-content>
				
				<v-stepper-content step="6">
					<v-container fluid grid-list-md fill-height>
						<v-layout row wrap align-end>
							<v-flex xs6 d-flex justify-start>
							
								<v-btn
								v-if="e1!=1"
								color="primary"
								@click="previewStep(e1)"
								>
								Anterior
								</v-btn>
							</v-flex>
							<v-flex xs6 d-flex justify-end>
								<v-btn
									color="primary"
									@click="nextStep(e1)"
									>
									Siguiente
									</v-btn>
								
							</v-flex>
							
						</v-layout>
					</v-container>
					<v-card color="lighten-1" class="mb-5" flat>
						<v-container
							fluid
							grid-list-lg
							:class="[$vuetify.breakpoint.smAndDown ? 'px-1' : 'px-10']"
							>
							<v-layout row wrap justify-center :class="[$vuetify.breakpoint.smAndDown ? 'px-1' : 'px-10']">
								<v-flex xs12 md12 align-self-center text-center>
									<span class="display-1">Agrega fotos</span>
									<p class="heading-4 mt-5">
										Las fotos ayudan a que los clientes se imaginen cómo es vivir en tu propiedad. Puedes empezar con una y agregar más después de publicar.

									</p>
									<v-container fluid :class="[$vuetify.breakpoint.smAndDown ? 'px-5' : 'px-12']" py-0>
										<vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
									</v-container>	
								</v-flex>
								
								
							</v-layout>
						</v-container>
					</v-card>
					
				</v-stepper-content>
				
				<v-stepper-content step="7">
					<v-container fluid grid-list-md fill-height>
						<v-layout row wrap align-end>
							<v-flex xs6 d-flex justify-start>
							
								<v-btn
								v-if="e1!=1"
								color="primary"
								@click="previewStep(e1)"
								>
								Anterior
								</v-btn>
							</v-flex>
							<v-flex xs6 d-flex justify-end>
								<v-btn
									v-if="e1!=7"
									color="primary"
									@click="nextStep(e1)"
									>
									Siguiente
									</v-btn>
								
							</v-flex>
							
						</v-layout>
					</v-container>
					<v-card color="lighten-1" class="mb-5" flat>
						<v-container
							fluid
							grid-list-lg
							:class="[$vuetify.breakpoint.smAndDown ? 'px-1' : 'px-10']"
							>
							<v-layout row wrap justify-center :class="[$vuetify.breakpoint.smAndDown ? 'px-1' : 'px-10']">
								<v-flex xs12 md12 align-self-center text-center>
									<span class="display-1">Precio y disponibilidad</span>
									<p class="heading-4 mt-5">

									</p>
									<v-container grid-list-lg>

										<v-layout row wrap>
											<v-flex xs6 md6>
												<v-switch color="secondary" class="my-1" v-model="switch_venta" label="Se vende?" ></v-switch>

											</v-flex>
											<v-flex xs6 md6>
												<v-switch color="secondary" class="my-1" v-model="switch_renta" label="Se renta?" ></v-switch>

											</v-flex>
											<v-flex xs12 md6>
											<v-text-field
												label="Precio de venta"
												v-model="createForm.purchasePrice"
												type="number"
												outlined
												:disabled="switch_venta ? false : true"
											></v-text-field>
											</v-flex>
											<v-flex xs12 md6>
											<v-text-field
												label="Precio de renta"
												v-model="createForm.rentPrice"
												type="number"
												outlined
												:disabled="switch_renta ? false : true"
											></v-text-field>
											</v-flex>
											<v-flex xs12 md6>
											<v-text-field
												label="Longitud del Contrato"
												v-model="createForm.minimumContractLength"
												type="number"
												outlined
												:disabled="switch_renta ? false : true"
											></v-text-field>
											</v-flex>
											
											<v-flex xs12 md6>
												<v-dialog
													ref="dialogDate"
													v-model="createForm.modalDate"
													:close-on-content-click="false"
													:return-value.sync="createForm.date"
													
													width="290px"
												>
													<template v-slot:activator="{ on }">
													<v-text-field
														  v-model="formatDate"
														label="Fecha de Disponibilidad"
														outlined
														readonly
														hide-details
														v-on="on"
														color="primary"
													></v-text-field>
													</template>
													<v-date-picker color="primary" :min="new Date().toISOString().substr(0, 10)" v-model="createForm.date" scrollable>
													<v-spacer></v-spacer>
														<v-btn text color="primary" @click="createForm.modalDate = false">Cancel</v-btn>
														<v-btn text color="primary" @click="$refs.dialogDate.save(createForm.date)">OK</v-btn>
													</v-date-picker>
												</v-dialog>
											</v-flex>
											
											<v-flex xs12 md6>
											<v-checkbox
												v-model="createForm.priceNegotiable"
												label="Precio negociable?"
												color="secondary"
											></v-checkbox>
											</v-flex>
											<v-flex xs12 md6>
											<v-checkbox
												v-model="createForm.dateNegotiable"
												label="Fecha negociable?"
												color="secondary"
											></v-checkbox>
											</v-flex>
										</v-layout>
										</v-container>	
								</v-flex>
								
								
							</v-layout>
						</v-container>
					</v-card>
					
				</v-stepper-content>
			</v-stepper-items>
				
		</v-stepper>
	
    </v-card>	

</div>
</template>
<script>
	import vue2Dropzone from 'vue2-dropzone'
	import 'vue2-dropzone/dist/vue2Dropzone.min.css'
	import moment from 'moment'
	export default {
		components: {
			vueDropzone: vue2Dropzone
		},
		data: () => ({
			ex4: ['red', 'indigo', 'orange', 'primary', 'secondary', 'success', 'info', 'warning', 'error', 'red darken-3', 'indigo darken-3', 'orange darken-3'],

			rules: [v => v.length <= 50 || 'Max 50 caracteres'],
			e1: 1,
			switch_venta: false,
			switch_renta: false,
			disabled_venta: false,
			disabled_renta: false,
			steps: 9,
			 foo: 0,
			 loading: false,
			vertical: false,
			altLabels: false,
			editable: true,
			coordinates: {
					lat: 14.6349,
					lng: -90.5069,
				},
				map_center: {
					lat: 14.6349,
					lng: -90.5069,
				},
				map_options: {
					zoomControl: true,
					mapTypeControl: false,
					scaleControl: false,
					streetViewControl: false,
					rotateControl: false,
					fullscreenControl: false,
					disableDefaultUi: true,
				},
				dropzoneOptions: {
					url: 'https://httpbin.org/post',
					thumbnailWidth: 150,
					maxFilesize: 0.5,
					headers: { "My-Awesome-Header": "header value" }
				},
				createForm: {
					propertyTypes: ['Apartamento', 'Casa', 'Oficina', 'Bodega', 'Terreno', 'Local Comercial'],
					type: 'Apartamento',
					name: '',
					nameError: null,
					address: '',
					addressError: null,
					description: null,
					descriptionError: null,
					landArea: null,
					constructionArea: null,
					purchasePrice: null,
					rentPrice: null,
					minimumContractLength: null,
					priceNegotiable: false,
					modalDate: false,
					fecha: null,
					date: new Date().toISOString().substr(0, 10),
					dateNegotiable: false,
					commission: 0,
					stepTwoValid: false,
				}
		
		}),
		computed : {
			isLoggedIn : function(){ 
			return this.$store.getters.isLoggedIn
			},
			getUser : function(){ 
			return this.$store.getters.getUser
			},
			formatDate() {
				return this.createForm.date ? moment(this.createForm.date).format('DD/MM/Y') : ''
			}
			/*getNotificationsByDoctor : function(){ 
			return this.$store.getters.getNotificationsByDoctor(this.getUser.id)
			},*/
		},
		
		methods: {
			increment () {
				this.foo = parseInt(this.foo,10) + 1
			},
			decrement () {
				this.foo = parseInt(this.foo,10) - 1
			},
			closeDialog(){
				this.e1 = 1
				this.$emit('closeDialog')
			},
			updateCenter(latLng) {
				this.coordinates.lat = latLng.lat();
				this.coordinates.lng = latLng.lng();
			},
			nextStep (n) {
        		if (n === this.steps) {
				this.e1 = 1
				} else {
				this.e1 = n + 1
				}
			},
			previewStep (n) {
        		if (n === this.steps) {
				this.e1 = 1
				} else {
				this.e1 = n - 1
				}
			},
			validateStepTwo() {
				const validAdress = this.validateAddress()
				if (validAdress) {
					this.e1 = 3
				}
			},
			
			validateAddress() {
				if (!this.createForm.address.trim()) {
					this.createForm.addressError = 'Ingresa la direccion de la propiedad'
				} else {
					this.createForm.addressError = null
					return true
				}
			},
			validateStepThree() {
				const validAdress = this.validateName()
				const validDescription = this.validateDescription()
				if (validAdress && validDescription) {
					this.e1 = 4
				}
			},
			
			validateName() {
				if (!this.createForm.name.trim()) {
					this.createForm.nameError = 'Ingrese un nombre para la propiedad'
				} else {
					this.createForm.nameError = null
					return true
				}
			},

			validateDescription() {
				if (this.createForm.description==null) {
					this.createForm.descriptionError = 'Ingrese al menos una descripción'
				} else {
					this.createForm.descriptionError = null
					return true
				}
			},
		
		},
		mounted(){
		}
	}
</script>

