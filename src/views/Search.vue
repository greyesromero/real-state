<template>
	<div>	
		<v-divider></v-divider>
		<section> 
			<v-container 
				v-if="loading"
				fluid 
				grid-list-md 
				class="px-2 ma-0" 
				:style="{height: $vuetify.breakpoint.smAndUp ? '60%' : '100%'}">
				<div  class="center-container">
					<v-container fill-height>
						<v-layout align-center justify-center>
						<v-progress-circular
							:size="48"
							:width="4"
							color="primary lighten-1"
							indeterminate
						></v-progress-circular>
						</v-layout>
					</v-container>
				</div>
			</v-container>
			
			<v-container 
				v-if="!loading && properties"
				fluid 
				grid-list-md 
				class="px-2 ma-0" 
				:style="{height: $vuetify.breakpoint.smAndUp ? '60%' : '100%'}">
			
				<div v-if="errored" class="center-container">
					<v-container fill-height>
					<v-layout column align-center justify-center>
						<h1 class="display-2">Conéctate a Internet</h1>
						<p class="body-1 grey--text">Comprueba tu conexión y vuelve a intentarlo</p>
						<v-btn
						color="primary"
						outlined
						@click="fetchProperties"
						>Reintentar</v-btn>
					</v-layout>
					</v-container>
				</div>
				<div>
					<v-container fluid grid-list-md fill-height>
						
						<v-layout row wrap align-end>
							
								<v-flex xs12 md12 d-flex justify-end>
								<v-switch color="secondary" class="my-1" v-model="favorites" @change="infoWinOpen = false, changeArray()" label="Mis Favoritos" ></v-switch>

								<v-btn text v-on:click="dialog=true" style="float:right;" color="secondary">
									<v-icon >mdi-cog</v-icon>	FILTROS
								</v-btn>
							</v-flex>
							<v-flex xs12 md12 d-flex justify-start v-if="selected_location">
							<span class="body-2">{{selected_properties.length}} propiedades en <h3>{{selected_location.name}}</h3></span>
							</v-flex>
							
						</v-layout>
					</v-container>
					<v-dialog v-model="dialog" persistent max-width="600px">
						<v-card>
							<v-card-title>
							<span class="headline">Filtros de Búsqueda</span>
							<v-spacer></v-spacer>
							<v-btn icon v-on:click="dialog=false">
								<v-icon>mdi-close</v-icon>
							</v-btn>
							

							</v-card-title>
							<v-card-text>
								<v-form v-model="valid" :lazy-validation="lazy"  ref="form">
									<v-toolbar class="mb-3" style="background-color:transparent!important;box-shadow:none!important;">
											
										<v-spacer></v-spacer>
									<v-switch color="secondary" class="mt-5" v-model="owner" label="Trato directo con dueño"></v-switch>

									</v-toolbar>
									<v-toolbar class="mb-3" style="background-color:transparent!important;box-shadow:none!important;">
										<v-subheader class="title" style="padding-left:0px!important;">Tipo</v-subheader>
											
										<v-spacer></v-spacer>
										 <v-row justify="space-around" class="mt-8">
												<v-checkbox class="mx-2" label="Renta" v-model="selected_type" value="Renta" color="secondary"></v-checkbox>
												<v-checkbox class="mx-2" label="Venta" v-model="selected_type" value="Venta" color="secondary"></v-checkbox>
											</v-row>

									</v-toolbar>
								
									<v-divider class="mx-5 mb-5"></v-divider>
									<v-subheader class="title">Precio</v-subheader>
									<v-container fluid>
										<v-layout>
												Q{{ range[0] }} 
											<v-flex>
											<v-range-slider
											v-model="range"
											:max="max"
											:min="min"
											height="50"
											thumb-label
											color="secondary"
											>
											</v-range-slider>
											</v-flex>
											Q{{ range[1] }}
										</v-layout>
									</v-container>
								
									<v-divider class="mx-5 mb-5"></v-divider>
									<v-subheader class="title">Comodidades</v-subheader>
								
									<v-container fluid>
											<v-row >
													<v-col cols="12" sm="4" md="4" v-for="(amenitie, index) in ex4" :key="amenitie.id">
														  <v-checkbox :label="amenitie.name" :value="amenitie.name" v-model="amenitie.checked"
														  hide-details color="secondary" :prepend-icon="amenitie.icon">
      													  </v-checkbox>
													
													</v-col>
									
											</v-row>
									</v-container>
									<v-divider class="mx-5"></v-divider>
								</v-form>
							</v-card-text>
							<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="primary darken-1" text @click="resetForm()">Quitar todos</v-btn>
							<v-btn color="secondary darken-1" text @click="applyFilters()">Aplicar</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-row class="ma-2">
      					<v-col md="6" xs="12" class="pa-3 d-flex flex-column" :key="property.id" v-for="(property,i) in visiblePages">
						
							<v-card
								:loading="loading"
								:class="[$vuetify.breakpoint.smAndDown ? 'mx-1 my-1' : 'mx-1 my-1']"
								class="flex d-flex flex-column"
								style="cursor:pointer;"
								router :to="`/detail/`+ property.id "
								>
									
									<v-carousel hide-delimiters
									class="white--text align-end"
									height="300px"
									v-if="property.images.length!=0">
										<v-carousel-item
										v-for="(item,i) in property.images"
										:key="i"
										transition="fade-transition"
										:src="item.image"
										lazy-src="../assets/logo.png"
										gradient="rgba(0,0,0,0.1),rgba(0,0,0,0.2),rgba(0,0,0,0.25),rgba(0,0,0,0.3),rgba(0,0,0,0.9)">
					
											<v-layout column justify-space-between fill-height px-5 py-5>
												<v-layout row wrap>
													<v-flex xs12 d-flex justify-start>
															<v-chip
															class="mx-1"
															label
															color="secondary"
															text-color="white"
															v-if="property.rent_price>0"
															>
															RENTA
														</v-chip>
														<v-chip
															class="mx-1"
															color="primary"
															label
															text-color="white"
															v-if="property.sale_price>0"
															>
															VENTA
														</v-chip>
													</v-flex>
													
												</v-layout>
												<v-layout row wrap align-end>
													
													<v-flex xs12 d-flex justify-end>
														<span class="text-truncante text-right title" v-if="(property.rent_price == 0 || property.rent_price == null) && property.sale_price > 0">Q{{property.sale_price}}</span>
														<span class="text-truncante text-right title" v-if="(property.sale_price == 0 || property.sale_price == null) && property.rent_price > 0">Q{{property.rent_price}}/mes</span>
														<span class="text-truncante text-right title" v-if="property.sale_price > 0 && property.rent_price > 0">Q{{property.rent_price}}/mes</span>
														<span class="text-truncante text-right title" v-if="(property.sale_price == 0 || property.sale_price == null) && (property.rent_price == 0 || property.rent_price == null)">Q - Sin Precio</span>

													</v-flex>
												</v-layout>
											</v-layout>
										</v-carousel-item>
									</v-carousel>
									<v-img
										:src="'../assets/img/sin-imagen.jpg'"
										gradient="rgba(0,0,0,0.2), rgba(0,0,0,0.2)"
										height="300px"
										v-if="property.images.length == 0"
										width="100%"
										style="border-radius:5px"
										>
											<v-layout column justify-space-between fill-height px-5 py-5>
													<v-layout row wrap>
														<v-flex xs12 d-flex justify-start>
																<v-chip
																class="mx-1"
																label
																color="secondary"
																text-color="white"
																v-if="property.rent_price>0"
																>
																RENTA
															</v-chip>
															<v-chip
																class="mx-1"
																color="primary"
																label
																text-color="white"
																v-if="property.sale_price>0"
																>
																VENTA
															</v-chip>
														</v-flex>
														
														
													</v-layout>
													<v-layout row wrap align-end>
														
														<v-flex xs12 d-flex justify-end>
															<span class="text-truncante text-right title" v-if="(property.rent_price == 0 || property.rent_price == null) && property.sale_price > 0">Q{{property.sale_price}}</span>
															<span class="text-truncante text-right title" v-if="(property.sale_price == 0 || property.sale_price == null) && property.rent_price > 0">Q{{property.rent_price}}/mes</span>
															<span class="text-truncante text-right title" v-if="property.sale_price > 0 && property.rent_price > 0">Q{{property.rent_price}}/mes</span>
															<span class="text-truncante text-right title" v-if="(property.sale_price == 0 || property.sale_price == null) && (property.rent_price == 0 || property.rent_price == null)">Q - Sin Precio</span>

														</v-flex>
													</v-layout>
												</v-layout>
										</v-img>
						
									<v-card-title>
										<div>{{property.name}}</div>
									</v-card-title>
									<v-card-text>
										{{property.rooms}} cuartos<span class="font-weight-bold" aria-hidden="true"> ·</span>
										{{property.bathrooms}} baño<span class="font-weight-bold" aria-hidden="true"> ·</span>
										{{property.construction_area}} mts<sup>2</sup>
										<div v-if="property.amenities.length>0">
								
											<v-chip-group
											
											column
											>
												<v-chip  small v-for="amenity in property.amenities" :key="amenity.id">
													<v-icon left small>{{buildAmenityIcon(amenity.name)}}</v-icon>
												{{amenity.name}} </v-chip>
											</v-chip-group>
										</div>
										<div v-if="property.amenities.length==0" class="mt-3">
											<p>Sin servicios especificados.</p>
										</div>
										
									</v-card-text>
						
									<v-divider class="mx-4"></v-divider>
									<v-card-actions>
										<v-btn
										color="secondary"
										text
										router :to="`/detail/`+ property.id "
										>
										MÁS INFORMACIÓN
										</v-btn>
										<v-spacer></v-spacer>
										<v-btn icon @click="saveFavorite(property.id)">
											<v-icon>{{checkFavorite(property.id)}}</v-icon>
										</v-btn>
										<v-btn icon>
											<v-icon>mdi-share-variant</v-icon>
										</v-btn>
									</v-card-actions>
							</v-card>
						</v-col>
						<v-col cols="12">
							<v-pagination
								v-model="page"
								
								v-if="visiblePages.length>0"
								:length="Math.ceil(selected_properties.length/perPage)"
							></v-pagination>
						</v-col>
					</v-row>
					<v-layout row wrap  justify="space-around" align-center align-content-center v-if="visiblePages.length == 0">
							<div  class="center-container">
								<v-container fill-height>
									<v-layout column align-center justify-center>
										<h1 class="display-2">Sin Resultados</h1>
										<p class="body-1 grey--text">No hay propiedades para mostrar</p>
										<v-btn
										color="primary"
										outlined
										@click="fetchProperties"
										>Reintentar</v-btn>
									</v-layout>
								</v-container>
								
							</div>
					</v-layout>
				</div>
        	</v-container>
			<div class="search-map-container grey lighten-2 hidden-sm-and-down" v-if="visiblePages.length>0">
				<div id="myAutocomplete" class="position-absolute white w-100 mt-2" style="z-index:99!important;top:0;">
					<gmap-autocomplete
					 
						ref="autocomplete"
						@place_changed="setPlace"
						:options="autocompleteOptions"
						:placeholder="'Ingresa una ubicación'"
						:value="searchAddressInput"
						:select-first-on-enter="true"
						class="address-input form-control my-3 mx-3 py-1" style="width:95%"></gmap-autocomplete>
				</div>
				<gmap-map :center="center" :zoom="12" class="w-100 h-100">
					<gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
							<v-card
								:loading="loading"
								flat
								:class="[$vuetify.breakpoint.smAndDown ? 'mx-0 my-0' : 'mx-0 my-0']"
								:style="[{'max-width': $vuetify.breakpoint.smAndUp ? '250px' : '125px'}]"
								>
								
								<v-img
										class="white--text"
										height="150px"
										v-if="visiblePages[selected_property].images.length!=0 "
										:src="visiblePages[selected_property].images[0].image"
										lazy-src="../assets/logo.png"
										gradient="rgba(0,0,0,0.1),rgba(0,0,0,0.2),rgba(0,0,0,0.25),rgba(0,0,0,0.3),rgba(0,0,0,0.9)">
						
											<v-layout column justify-space-between fill-height px-5 py-5>
												<v-layout row wrap>
													<v-flex xs12 d-flex justify-start>
															<v-chip
															class="mx-1"
															label
															color="secondary"
															text-color="white"
															small
															v-if="visiblePages[selected_property].rent_price>0"
															>
															RENTA
														</v-chip>
														<v-chip
															class="mx-1"
															color="primary"
															label
															text-color="white"
															small
															v-if="visiblePages[selected_property].sale_price>0"
															>
															VENTA
														</v-chip>
													</v-flex>
												
													
												</v-layout>
												<v-layout row wrap align-end>
													
													<v-flex xs12 d-flex justify-end>
														<span class="text-truncante text-right title" v-if="(visiblePages[selected_property].rent_price == 0 || visiblePages[selected_property].rent_price == null) && visiblePages[selected_property].sale_price > 0">Q{{visiblePages[selected_property].sale_price}}</span>
														<span class="text-truncante text-right title" v-if="(visiblePages[selected_property].sale_price == 0 || visiblePages[selected_property].sale_price == null) && visiblePages[selected_property].rent_price > 0">Q{{visiblePages[selected_property].rent_price}}/mes</span>
														<span class="text-truncante text-right title" v-if="visiblePages[selected_property].sale_price > 0 && visiblePages[selected_property].rent_price > 0">Q{{visiblePages[selected_property].rent_price}}/mes</span>
														<span class="text-truncante text-right title" v-if="(visiblePages[selected_property].sale_price == 0 || visiblePages[selected_property].sale_price == null) && visiblePages[selected_property].rent_price == 0 || visiblePages[selected_property].rent_price == null">Q - Sin Precio</span>
														
													</v-flex>
												</v-layout>
											</v-layout>
										</v-img>
										<v-img
										class="white--text"
										height="150px"
										v-if="visiblePages[selected_property].images.length==0 "
										:src="'../assets/img/sin-imagen.jpg'"
										gradient="rgba(0,0,0,0.1),rgba(0,0,0,0.2),rgba(0,0,0,0.25),rgba(0,0,0,0.3),rgba(0,0,0,0.9)">
						
											<v-layout column justify-space-between fill-height px-5 py-5>
												<v-layout row wrap>
													<v-flex xs12 d-flex justify-start>
														<v-chip
															class="mx-1"
															label
															color="secondary"
															text-color="white"
															small
															v-if="visiblePages[selected_property].rent_price>0"
															>
															RENTA
														</v-chip>
														<v-chip
															class="mx-1"
															color="primary"
															label
															text-color="white"
															small
															v-if="visiblePages[selected_property].sale_price>0"
															>
															VENTA
														</v-chip>
													</v-flex>
												
													
												</v-layout>
												<v-layout row wrap align-end>
													
													<v-flex xs12 d-flex justify-end>
														<span class="text-truncante text-right title" v-if="(visiblePages[selected_property].rent_price == 0 || visiblePages[selected_property].rent_price == null) && visiblePages[selected_property].sale_price > 0">Q{{visiblePages[selected_property].sale_price}}</span>
														<span class="text-truncante text-right title" v-if="(visiblePages[selected_property].sale_price == 0 || visiblePages[selected_property].sale_price == null) && visiblePages[selected_property].rent_price > 0">Q{{visiblePages[selected_property].rent_price}}/mes</span>
														<span class="text-truncante text-right title" v-if="visiblePages[selected_property].sale_price > 0 && visiblePages[selected_property].rent_price > 0">Q{{visiblePages[selected_property].rent_price}}/mes</span>
														<span class="text-truncante text-right title" v-if="(visiblePages[selected_property].sale_price == 0 || visiblePages[selected_property].sale_price == null) && visiblePages[selected_property].rent_price == 0 || visiblePages[selected_property].rent_price == null">Q - Sin Precio</span>
														
														
													</v-flex>
												</v-layout>
											</v-layout>
										</v-img>
								<v-card-title class="justify-left">
									<span class="title">{{ visiblePages[selected_property].name }}</span>
									
								</v-card-title>
								<v-card-text>
											
											2 cuartos<span class="font-weight-bold" aria-hidden="true"> ·</span>
											1 baño<span class="font-weight-bold" aria-hidden="true"> ·</span>
											1000 mts<sup>2</sup>
											
										</v-card-text>
								
								<v-divider class="mx-4"></v-divider>
									<v-card-actions>
										<v-btn
										color="secondary"
										text
										router :to="`/detail/`+ visiblePages[selected_property].id "
										>
										MÁS INFORMACIÓN
										</v-btn>
										<v-spacer></v-spacer>
										<v-btn icon>
											<v-icon>mdi-heart</v-icon>
										</v-btn>
										<v-btn icon>
											<v-icon>mdi-share-variant</v-icon>
										</v-btn>
									</v-card-actions>
							</v-card>
						</gmap-info-window>

					<gmap-marker :key="i" v-for="(m,i) in visiblePages" :position="m.position" :clickable="true" @click="toggleInfoWindow(m,i)"></gmap-marker>
				</gmap-map>
			</div>
			<div class="search-map-container grey lighten-2 hidden-sm-and-down" v-if="visiblePages.length==0">
				<gmap-map :center="center" :zoom="12" class="w-100 h-100"></gmap-map>
			</div>
      </section>
	
   </div>
</template>

<script>
import axios from 'axios'
export default {
  	name: 'search',
  	props: {
        location: Object
	},
  data() {
    return {
		map_center: {
			lat: 14.6349,
			lng: -90.5069,
		},
		autocompleteOptions: {
			componentRestrictions: { country: 'gt' },
			
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
		ex4: [{
			id: 1,
			name: 'A/C',
			checked: false,
			icon: 'mdi-air-conditioner'
		},
		{
			id: 2,
			name: 'Secadora',
			checked: false,
			icon: 'mdi-tumble-dryer'
		},
		{
			id: 3,
			name: 'Lavadora',
			checked: false,
			icon: 'mdi-dishwasher'
		},
		{
			id: 4,
			name: 'Basura',
			checked: false,
			icon: 'mdi-trash-can'
		},
		{
			id: 5,
			name: 'Calefacción',
			checked: false,
			icon: 'mdi-hvac'
		},
		{
			id: 6,
			name: 'Mascotas',
			checked: false,
			icon: 'mdi-paw'
		}],
		selected_type: [],
		owner: false,
		page: 1,
		perPage: 10,
		favorites: null,
		range: [200, 5000],
		max: 9000,
		min: 100,
		dialog: false,
		loading: false,
		errored: false,
		selected_title: null,
		selected_property: 0,
		selected_properties: [],
		favorites_properties: [], 		
		properties: [],
		map: null,
		marker: null,
		infowindow: null,
		center: {
			lat: 14.6319938,
			lng: -90.5167931
		},
		infoContent: '',
		infoWindowPos: null,
		infoWinOpen: false,
		currentMidx: null,
		infoOptions: {
			pixelOffset: {
			width: 0,
			height: -35
			}
		},
        markers: [{
				position: {
				lat: 14.6319938,
				lng: -90.5167931
				},
				infoText: 'Marker 1'
			}, {
				position: {
				lat: 14.54665,
				lng:  -90.6247106
				},
				infoText: 'Marker 2'
			}, {
				position: {
				lat: 14.5996762859023,
				lng: -90.519997558197
				},
				infoText: 'Marker 3'
			},
			{
				position: {
				lat:  14.6038435915842,
				lng: -90.52177129981
				},
				infoText: 'Marker 4'
			},
			{
				position: {
				lat:  14.6002577,
				lng: -90.520534
				},
				infoText: 'Marker 5'
		}],
		items: [
        	{
				image: '../assets/img/house5.jpg',
			},
			{
				image: '../assets/img/house2.jpg',
			},
				{
				image: '../assets/img/house4.jpg',
			},
		],
		foo: 0,
		foo2: 0,
		city: null,
		valid: true,
		lazy:false,
		isLoading: false,
		itemsLocation: [],
		model: null,
		busqueda: null,
		searchAddressInput: '',
		selected_location: null,
		currentPlace: null
		
		}
	},
	
  	computed: {
		getUser : function(){ 
			return this.$store.getters.getUser
		},
		visiblePages () {
			return this.selected_properties.slice((this.page - 1)* this.perPage, this.page* this.perPage)
		},
		selected: function() {
			return this.ex4.filter(amenitie => amenitie.checked)
		},
		isLoggedIn : function(){ 
			return this.$store.getters.isLoggedIn
		},
	},
	
	watch: {
		page : function(newVal, oldVal) {
			//console.log('value changed from ' + oldVal + ' to ' + newVal);
			this.infoWinOpen = false
			this.selected_property = 0
			
		},
     
      busqueda (val) {
        // Items have already been loaded
        if (this.itemsLocation.length > 0) return

		this.isLoading = true
		this.itemsLocation = [
			{"id":1,"name":"Antigua Guatemala, Sacatepéquez"},
			{"id":2,"name":"Jocotenango, Sacatepéquez"},
			{"id":3, "name":"Zona 1, Ciudad de Guatemala"}
		]
		
		this.isLoading = false

        // Lazily load input items
        /*fetch('https://api.coingecko.com/api/v3/coins/list')
          .then(res => res.clone().json())
          .then(res => {
            this.items = res
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))*/
      },
    },
	mounted() {
		
		this.fetchProperties()
		this.geolocation()
	},
	methods: {
		 geolocation : function() {

			if(this.location){
				let place = this.location
				this.selected_location = place
				 this.center = {
					lat: place.geometry.location.lat(),
					lng: place.geometry.location.lng(),
				};
			}
			else{
				navigator.geolocation.getCurrentPosition((position) => {
					this.center = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					}; 
					
				});
			}
			
		},
		
		setPlace(place) {
		
		 this.selected_location = place
        if (!place) return

        this.center = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
      },
		  getById(id, myArray) {
				return myArray.filter(function(obj) {
				if(obj.id == id) {
					return obj
				}
				})[0]
			},
		checkFavorite(property_id){
			let get_my_obj = this.getById(property_id,this.favorites_properties);
		
		
			
			if(get_my_obj){
				return 'mdi-heart'
			}else{
				return 'mdi-heart-outline'
			}
		},
		saveFavorite(id){
			let get_my_obj = this.favorites_properties.findIndex(x => x.id === id);
			
			if(get_my_obj>=0){
				
				axios
				.delete('https://hsrealestate-api.herokuapp.com/api/properties/favorite/'+this.favorites_properties[get_my_obj].favorite_id+'/')
				.then(response => {
					
					this.favorites_properties.splice(get_my_obj, 1);
				}).catch(err => {
					console.log({err})
				})
			}else{
				axios
					.post('https://hsrealestate-api.herokuapp.com/api/properties/favorite/',{
						property: id,
						user: this.getUser.id
					})
					.then(response => {
						this.favorites_properties = []
						this.$store.dispatch('getProfile', this.getUser.id).then(r => {
								if(this.getUser.favorite_properties!=null){
									this.getUser.favorite_properties.forEach((value, index) => {
										let arrayProperty = value.property
										arrayProperty['favorite_id'] = value.id
										this.favorites_properties.push(arrayProperty);
									});
									
									this.favorites_properties = this.favorites_properties.map(function(obj){
														obj.position = {
															lat: obj.latitude,
															lng: obj.longitude
														};

														
														return obj;
													});
								}	
						})
					}).catch(err => {
						console.log({err})
					})
			}
			

		},
		buildAmenityIcon(amenityName) {
			switch (amenityName) {
				case 'Aire Acondicionado':
				return 'mdi-air-conditioner'
				case 'WiFi':
				return 'mdi-wifi'
				case 'Lavandería':
				return 'mdi-dishwasher'
				case 'Mascotas':
				return 'mdi-paw'
				case 'Basura':
				return 'mdi-delete-empty'
				case 'Calefacción':
				return 'mdi-hvac'
			
			}
		},
		applyFilters(){
			if(this.favorites){
				console.log('Filtros se aplicaran a favoritos')
			}
			else{
				console.log('Filtros se aplicaran a propiedades normales')
			}
		},
		changeArray(){
			if(this.favorites){
				this.page = 1
				this.selected_property = 0
				this.selected_properties = this.favorites_properties
			}
			else{
				this.page = 1
				this.selected_property = 0
				this.selected_properties = this.properties
			}

		},
		increment () {
			this.foo = parseInt(this.foo,10) + 1
		},
		decrement () {
			this.foo = parseInt(this.foo,10) - 1
		},
		toggleInfoWindow: function(marker, idx) {
			
            this.infoWindowPos = marker.position;
			this.infoContent = marker.infoText;
			this.selected_property = idx

            //check if its the same marker that was selected if yes toggle
            if (this.currentMidx == idx) {
              this.infoWinOpen = !this.infoWinOpen;
            }
            //if different marker set infowindow to open and reset current marker index
            else {
              this.infoWinOpen = true;
              this.currentMidx = idx;

            }
          },
		resetForm() {
			this.$refs.form.reset()
			this.range = [200, 5000]
			this.foo = 0
			this.foo2 = 0
			this.city = null
		},
		showMarker({position, i}) {
			this.center = position
			this.infoWindowPos = position;
			this.infoContent ='Hi';
			this.infoWinOpen = true;
			this.currentMidx = i;

			/*this.map.panTo(position);
			this.marker.setPosition(position);
			this.marker.title = name;
			this.infowindowinfowindow = new google.maps.InfoWindow({ // Create a new InfoWindow
				content:"This is <strong>Megamall Penang</strong>, <em>one</em> of shopping centres that has a cinema!" // HTML contents of the InfoWindow
			});
			this.map.addListener(this.marker, 'click', function() { // Add a Click Listener to our marker
				this.infowindow.open(this.map,this.marker); // Open our InfoWindow
			});*/
			
		},
		fetchProperties() {
			
			this.favorites = false
			if (this.errored) this.errored = false
			this.loading = true
			if(this.isLoggedIn){
				this.$store.dispatch('getProfile', this.getUser.id).then(r => {
					if(this.getUser.favorite_properties!=null){
						this.getUser.favorite_properties.forEach((value, index) => {
							let arrayProperty = value.property
							arrayProperty['favorite_id'] = value.id
							this.favorites_properties.push(arrayProperty);
						});
						
						this.favorites_properties = this.favorites_properties.map(function(obj){
											obj.position = {
												lat: obj.latitude,
												lng: obj.longitude
											};

											
											return obj;
										});
					}
				})
			}
			

			
			axios
			.get('https://hsrealestate-api.herokuapp.com/api/properties/')
			.then(response => {
				this.selected_properties = response.data.map(function(obj){
									obj.position = {
										lat: obj.latitude,
										lng: obj.longitude
									};
									return obj;
								}).filter(item => item.active == true );
				this.properties = response.data.map(function(obj){
									obj.position = {
										lat: obj.latitude,
										lng: obj.longitude
									};
									return obj;
								}).filter(item => item.active == true );
				
				this.loading = false
			})
		/*	this.loading = true
			this.properties.push({
				id: 1,
				title: 'Hermosa casa en Antigua G',
				description: '',
				image: '../assets/img/house5.jpg',
				rooms: 1,
				bathrooms: 2,
				mts: 1200,
				position: {
					lat: 14.6319938,
					lng: -90.5167931
				},
				images:[
					{
						image: '../assets/img/house5.jpg',
					},
					{
						image: '../assets/img/house2.jpg',
					},
					{
						image: '../assets/img/house4.jpg',
					},
				]

			})
			fetch('https://tuyo-api.herokuapp.com/api/property/')
			.then(response => response.json())
			.then(properties => {
				this.properties = properties.map(property => ({
				...property,
				position: {
					lat: property.latitude,
					lng: property.longitude
				},
				rooms: property.areas.filter(area => area.type === 'Cuarto'),
				bathrooms: property.areas.filter(area => area.type === 'Baño'),
				mts: property.areas.reduce((prev, curr) => prev + curr.area, 0)
				}))
				
			})
			.catch(err => {
				console.log({err})
				this.errored = true
			})
			.finally(() => this.loading = false)*/
		}
  	}
}
</script>
<style>
.gm-style .gm-style-iw-d{
	overflow: hidden!important;
	
}

.gm-style .gm-style-iw-c{
padding: 0px!important;
}

.gm-ui-hover-effect{
	display: none!important;
}
</style>
