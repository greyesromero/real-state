<template>

    
    <div>
		<v-container 
			v-if="loading"
			fluid 
			grid-list-md 
			class="px-2 ma-0" 
			:style="{width: $vuetify.breakpoint.lgAndUp ? '100%' : '100%'}">
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
		<div v-if="!loading && property">
			<section id="title" >
				
				<v-container fill-height fluid px-8>
					<v-row >
						<v-col cols="12" md="8">
							<span
							:class="[$vuetify.breakpoint.smAndDown ? 'text-center' : 'text-left']"
							>
								<h1 class="display-1 ">{{this.name}}</h1>
							</span>
						</v-col>
						<v-col cols="12" md="4">
							<v-flex :class="[$vuetify.breakpoint.smAndDown ? ' text-center' : ' text-right']">
									<!--v-btn icon color="black">
									<v-icon>mdi-share-variant</v-icon>
									</v-btn>
									<v-btn icon color="black">
									<v-icon>mdi-heart-outline</v-icon>
									</v-btn-->
								</v-flex>
						</v-col>
					</v-row>
				</v-container>
			</section>
			<section id="big_gallery" v-if="images.length>=3" class="d-none d-sm-flex" >
				<v-container
					fluid
					grid-list-md
					class="position-absolute"
				>
				<v-layout align-center justify-center row fill-height px-10>
						<v-flex sm8 xs12>
							<v-card class="mr-2">
							<v-img :src="images[0].image" height="412px" width="100%"></v-img>
							</v-card>
						</v-flex>
						<v-flex sm4 xs12>
							<v-card class="mb-4">
								<v-img :src="images[1].image" height="198px"></v-img>
							</v-card>
							<v-card >
								<v-img :src="images[2].image" height="198px"></v-img>
							</v-card>
						</v-flex>
					</v-layout>
				</v-container>
				<v-container
					fluid
					grid-list-md
				>
					<v-img
				
						height="410px"
						width="100%"
						>
				
				
					<!--v-container fluid grid-list-md  fill-height px-5 >
					
						<v-layout row wrap align-center>
							
							<v-flex  xs12 md8>
								<v-card >
									<v-img :src="images[0].src" height="400px"></v-img>
								</v-card>
							</v-flex>
							<v-flex  xs12 md4>
								<v-layout column justify-space-between fill-height>
									<v-card class="mb-1">
										<v-img :src="images[0].src" height="198px"></v-img>
									</v-card>
									<v-card >
										<v-img :src="images[0].src" height="198px"></v-img>
									</v-card>
									
								</v-layout>
							</v-flex>
								
						</v-layout>
						
					</v-container-->
				
					<v-container fluid grid-list-md fill-height class="position-relative" px-10>

						<v-layout row wrap mx-5>
							<v-flex xs12 d-flex justify-start>
								<v-chip
									class="ma-2"
									label
									text-color="white"
									color="secondary"
									v-if="forRent"
									
									>
									RENTA
								</v-chip>
								<v-chip
									v-if="forSale"
									class="ma-2"
									color="primary"
									label
									text-color="white"
									>
									VENTA
								</v-chip>
								<v-chip
									v-if="isLoggedIn && getUser.id == property.owner.id && new_date != null"
									class="ma-2"
									color="primary"
									label
									text-color="white"
									>
									<v-icon small left color="yellow">mdi-star</v-icon>&nbsp;
									Activa hasta {{this.new_date}}
								</v-chip>
							</v-flex>
						</v-layout>
						<v-layout row wrap align-end mx-5>
							<v-flex xs12 d-flex justify-end>
								<v-btn color="secondary" class="white--text"  @click="toggleGallery">
								<v-icon small lef t>mdi-folder-multiple-image</v-icon>
								Ver Galería
								</v-btn>
								<!-- <v-btn icon color="white" class="mx-3">
								<v-icon>mdi-share-variant</v-icon>
								</v-btn>
								<v-btn icon color="white">
								<v-icon>mdi-heart-outline</v-icon>
								</v-btn> -->
							</v-flex>
						</v-layout>
					</v-container>
				</v-img>
				</v-container>
			</section>
			<section id="small_gallery"  v-if="images.length==2 || images.length ==1" class="d-none d-sm-flex">
				<v-container
					fluid
					grid-list-md
					px-5
				>
					<v-img
					:src="images[0].image"
					gradient="rgba(0,0,0,0.2), rgba(0,0,0,0.2)"
					height="400px"
					width="100%"
					style="border-radius:5px"
					>
					<v-container fill-height px-0>
						<v-layout row wrap>
							<v-flex xs12 d-flex justify-start>
									<v-chip
									class="ma-2"
									label
									text-color="white"
									color="secondary"
									v-if="forRent"
									
									>
									RENTA
								</v-chip>
								<v-chip
									v-if="forSale"
									class="ma-2"
									color="primary"
									label
									text-color="white"
									>
									VENTA
								</v-chip>
								<v-chip
									v-if="isLoggedIn && getUser.id == property.owner.id && new_date != null"
									class="ma-2"
									color="primary"
									label
									text-color="white"
									>
									<v-icon small left color="yellow">mdi-star</v-icon>&nbsp;
									Activa hasta {{this.new_date}}
								</v-chip>
							</v-flex>
						</v-layout>
						<v-layout row wrap align-end pb-6>
						<v-flex xs12 d-flex justify-end>
							<v-btn color="secondary" class="white--text" v-if="images.length == 2" @click="toggleGallery">
							<v-icon small left>mdi-folder-multiple-image</v-icon>
							Ver Galería
							</v-btn>
							<!-- <v-btn icon color="white" class="mx-3">
							<v-icon>mdi-share-variant</v-icon>
							</v-btn>
							<v-btn icon color="white">
							<v-icon>mdi-heart-outline</v-icon>
							</v-btn> -->
						</v-flex>
						</v-layout>
					</v-container>
					</v-img>
				</v-container>
			</section>
			<section id="none_gallery"  v-if="images.length==0">
				<v-container
					fluid
					grid-list-md
					px-5
				>
					<v-img
					:src="'../assets/img/sin-imagen.jpg'"
					gradient="rgba(0,0,0,0.2), rgba(0,0,0,0.2)"
					height="400px"
					width="100%"
					style="border-radius:5px"
					>
					<v-container fill-height px-0>
						<v-layout row wrap>
							<v-flex xs12 d-flex justify-start>
								<v-chip
									class="ma-2"
									label
									text-color="white"
									color="secondary"
									v-if="forRent"
									>
									RENTA
								</v-chip>
								<v-chip
									v-if="forSale"
									class="ma-2"
									color="primary"
									label
									text-color="white"
									>
									VENTA
								</v-chip>
								<v-chip
									v-if="isLoggedIn && getUser.id == property.owner.id && new_date != null"
									class="ma-2"
									color="primary"
									label
									text-color="white"
									>
									<v-icon small left color="yellow">mdi-star</v-icon>&nbsp;
									Activa hasta {{this.new_date}}
								</v-chip>
							</v-flex>
						</v-layout>
						<v-layout row wrap align-end pb-6>
						
						</v-layout>
					</v-container>
					</v-img>
				</v-container>
			</section>
			<section id="slider_gallery"  class="d-flex d-sm-none" v-if="images.length > 0">
				<v-container>
					<v-carousel hide-delimiters>
						<v-carousel-item
						v-for="(item,i) in images"
						:key="i"
						:src="item.image"
						>
							<v-container fill-height>
								<v-layout row wrap align-start px-6>
									<v-flex xs12 d-flex justify-start>
										<v-chip
											class="ma-2"
											label
											text-color="white"
											color="secondary"
											>
											RENT
										</v-chip>
										<v-chip
											class="ma-2"
											color="primary"
											label
											text-color="white"
											>
											NEW
										</v-chip>
										<v-chip
											v-if="isLoggedIn && getUser.id == property.owner.id && new_date != null"
											class="ma-2"
											color="primary"
											label
											text-color="white"
											>
											<v-icon small left color="yellow">mdi-star</v-icon>&nbsp;
											Activa hasta {{this.new_date}}
										</v-chip>
									</v-flex>
								</v-layout>
							</v-container>
						</v-carousel-item>
					</v-carousel>
				</v-container>
			</section>
			<section class="container pt-12 grid-list-lg">
				<v-layout row wrap :class="[$vuetify.breakpoint.smAndDown ? 'px-5' : '']">
					<!-- LEFT SIDE -->
					<v-flex xs12 md8>
						<section>
							<v-container px-0 grid-list-md>
							
								<h2 class="subtitle "  :class="[$vuetify.breakpoint.smAndDown ? 'mb-0' : 'mb-8']">Especificaciones</h2>

								<v-layout row wrap>
									<v-flex xs12 md4>
										<span class="font-weight-bold">
										<v-icon small left>mdi-bed</v-icon>
										{{rooms}} Habitaciones
										</span>
									</v-flex>
									<v-flex xs12 md4>
										<span class="font-weight-bold">
											<v-icon small left>mdi-shower</v-icon>
											{{bathrooms}} Baños
										</span>
									</v-flex>
									<v-flex xs12 md4>
										<span class="font-weight-bold">
										<v-icon small left>mdi-resize</v-icon>
										 {{construction}} m²
										</span>
									</v-flex>
								</v-layout>
							</v-container>
							<p class="body-1 letter-spacing-0">{{description}} </p> 
						</section>
						<section class="mt-12">
						<h2 class="subtitle">Servicios</h2>
							<v-container mt-6 px-0 grid-list-md>
								<v-layout row wrap>
									<v-flex xs12 md6
										v-for="amenity in amenities"
										:key="amenity.id"
									>
										<span class="grey--text text--darken-1">
										<v-icon small left>{{buildAmenityIcon(amenity.name)}}</v-icon>
										{{ amenity.name }}
										</span>
									</v-flex>
								</v-layout>
							</v-container>
						
						</section>
						<section class="mt-12 mb-12">
							<h2 class="subtitle">Ubicación</h2>
							<v-container mt-6 mb-6 px-0 grid-list-md>
								<h2 class="grey--text subtitle-1"><v-icon left small>mdi-map-marker</v-icon> {{address}}</h2>
							</v-container>
							<GmapMap ref="mapDiv" :center="coordinates" :zoom="15" map-type-id="roadmap" :options="map_options" style="width: auto; height: 300px">
								<GmapMarker  color="secondary" :position="coordinates" />
							</GmapMap>
						</section>
					</v-flex>
					<!-- RIGHT SIDE -->
					<v-flex xs12 md4>
						<section>
							<v-container grid-list-md pa-0 px-0>
								<v-card-title class="font-weight-bold" v-if="property.rent_price>0">
									Q {{property.rent_price}} <span class="ml-2 body-1 grey--text text--darken-2">/ precio renta</span>
								</v-card-title>
								<v-card-title class="font-weight-bold" v-if="property.sale_price>0">
									Q {{property.sale_price}} <span class="ml-2 body-1 grey--text text--darken-2">/ precio venta</span>
								</v-card-title>
								<v-divider></v-divider>
								<p class="grey--text text--darken-3 my-4">Te interesa esta propiedad? Agenda una cita</p>
								<ScheduleForm v-for="(agent,index) in agents" :property="property" :agent="agent" :index="index" :key="agent.id"/>
							</v-container>
						</section>
				
					</v-flex>
				</v-layout>
			</section>
			<section id="featured_properties" class=" grey lighten-4">
					
				<v-container px-0 grid-list-md py-10>
					<h2 class="subtitle text-center mb-5">Casas Similares</h2>
						<v-slide-group
							v-model="model"
						
							multiple
							show-arrows
							mobile-breakpoint
						>
							<v-slide-item
							v-for="n in 15"
							:key="n"
							v-slot:default="{ active, toggle }"
							>
								<v-card
									:loading="loading"
									:class="[$vuetify.breakpoint.smAndDown ? 'mx-1 my-12' : 'mx-1 my-12']"
									:style="{'max-width': $vuetify.breakpoint.smAndUp ? '275px' : '250px'}"
									
									>
										
										<v-carousel hide-delimiters
										class="white--text align-end"
										height="175px">
											<v-carousel-item
											v-for="(item,i) in items"
											:key="i"
											:src="item.src"
											
											gradient="rgba(0,0,0,0.1),rgba(0,0,0,0.2),rgba(0,0,0,0.25),rgba(0,0,0,0.3),rgba(0,0,0,0.9)">
						
												<!--v-container fluid grid-list-md fill-height>
													<v-layout row wrap>
														<v-flex xs12 d-flex justify-start>
																<v-chip
																class="ma-2"
																label
																color="secondary"
																text-color="white"
																>
																RENT
															</v-chip>
															<v-chip
																class="ma-2"
																color="primary"
																label
																text-color="white"
																>
																NEW
															</v-chip>
														</v-flex>
													</v-layout>
													<v-layout row wrap align-end>
														<v-flex xs12 d-flex justify-end>
															<span class="text-truncante text-right title">Q1000</span>
														
														</v-flex>
													</v-layout>
												</v-container-->
												<v-layout column justify-space-between fill-height px-5 py-5>
													<v-layout row wrap>
														<v-flex xs12 d-flex justify-start>
																<v-chip
																class="mx-1"
																label
																color="secondary"
																text-color="white"
																>
																RENT
															</v-chip>
															<v-chip
																class="mx-1"
																color="primary"
																label
																text-color="white"
																>
																NEW
															</v-chip>
														</v-flex>
														
														
													</v-layout>
													<v-layout row wrap align-end>
														
														<v-flex xs12 d-flex justify-end>
															<span class="text-truncante text-right title">Q1000</span>
															
														</v-flex>
													</v-layout>
												</v-layout>
											</v-carousel-item>
										</v-carousel>
							
										<v-card-title>
											<div class="text-truncate">Villas Antigua</div>
										</v-card-title>
										<v-card-text>
											2 cuartos<span class="font-weight-bold" aria-hidden="true"> ·</span>
											1 baño<span class="font-weight-bold" aria-hidden="true"> ·</span>
											1000 mts<sup>2</sup>
											<div>
												<v-chip-group
												
												column
												>
													<v-chip   small>
														<v-icon left small>mdi-wifi</v-icon>
													WIFI</v-chip>
													<v-chip   small>
														<v-icon left small>mdi-paw</v-icon>
													Mascotas</v-chip>
													<v-chip   small>
														<v-icon left small>mdi-spray-bottle</v-icon>
													Limpieza</v-chip>
													<v-chip   small>
														<v-icon left small>mdi-air-conditioner</v-icon>
													A/C</v-chip>
												</v-chip-group>
											</div>
											
										</v-card-text>
							
										<v-divider class="mx-4"></v-divider>
										<v-card-actions>
											<v-btn
											color="secondary"
											text
											router to = "/detail"
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
							</v-slide-item>
						</v-slide-group>
				</v-container>
				
			</section>
			<NewRecord v-if="isLoggedIn && property.owner.id == getUser.id" :property="property" v-on:updateProperty="updateProperty($event)" v-on:confirmPublish="confirmPublish($event)"></NewRecord>
			<v-overlay 
				:value="galleryDialog"
				color="white"
				:dark="false"
				opacity="0.9"
				class="h-100"
			>
				<DetailGallery 
				v-if="galleryDialog"
				:property="property"
				@close-gallery="toggleGallery"
				/>
			</v-overlay>
      	</div>
    </div>
 
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Loader from '../components/Loader.vue'
import SearchForm from '../components/SearchForm.vue'
import DetailGallery from '../components/DetailGallery.vue'
import ScheduleForm from  '../components/ScheduleForm.vue'
import NewRecord from '../components/NewRecord.vue'
import Agent from '../components/Agent.vue'
export default {
	components: {
		Loader,
		DetailGallery,
		SearchForm,
		ScheduleForm,
		NewRecord,
		Agent	
	},
	data: () => ({
		published: false,
		new_date: null,
		forRent: false,
		forSale: false,
		galleryDialog: false,
		property: null,
		loading: false,
		model: 1,
		name: null,
		description: null,
		address: null,
		rooms: 0,
		bathrooms:0,
		land: 0,
		construction: 0,
		active_until: null,
		coordinates: {
			lat: 14.6349,
			lng: -90.5069,
		},
		images:[],
		toggle_exclusive: 0,
		owner: [],
		agents: [],
		items: [
			{
				src: '../assets/img/house5.jpg',
			},
			{
				src: '../assets/img/house2.jpg',
			},
				{
				src: '../assets/img/house4.jpg',
			},
		
		],
		amenities: [],
		map_options: {
				zoomControl: true,
				mapTypeControl: false,
				scaleControl: false,
				streetViewControl: false,
				rotateControl: false,
				fullscreenControl: false,
				disableDefaultUi: true,
			},
	}),
	computed: {
		getUser : function(){ 
			return this.$store.getters.getUser
		},
		isLoggedIn : function(){ 
			return this.$store.getters.isLoggedIn
		},
	},
	methods: {
		saveConversation(){

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
		toggleGallery() {
			const $html = document.body.parentElement;

			if (this.galleryDialog) {
				$html.style.overflow = ''
				this.galleryDialog = false
			} else {
				$html.style.overflow = 'hidden'
				this.galleryDialog = true
			}
		},
		confirmPublish(data){
			this.active_until = data.date
			this.new_date = data.date
			

		},
		updateProperty(){
			this.loading = true
			let params = this.$route.params ? Object.assign({}, this.$route.params): {};
			axios.get('https://hsrealestate-api.herokuapp.com/api/properties/'+params.id+'/')
			.then(response => {
				this.loading = false
				this.property = response.data
				this.name = response.data.name
				this.description = response.data.description
				this.address = response.data.address
				this.rooms = response.data.rooms
				this.bathrooms = response.data.bathrooms
				this.construction = response.data.construction_area
				this.coordinates.lat = response.data.latitude
				this.coordinates.lng = response.data.longitude
				this.amenities = response.data.amenities
				this.images = response.data.images
				
				if(response.data.sale_price == null || parseInt(response.data.sale_price) == 0){
					this.forSale = false
				}else{
					this.forSale = true
				}

				if(response.data.rent_price == null || parseInt(response.data.rent_price) == 0){
					this.forRent = false
				}else{
					this.forRent = true
				}

				
				
			})
			.catch(error => {
				this.loading = false
				console.log(error);
			})
		}

	},
	mounted() {
		this.loading = true
		
		let params = this.$route.params ? Object.assign({}, this.$route.params): {};
		axios.get('https://hsrealestate-api.herokuapp.com/api/properties/'+params.id+'/')
		.then(response => {
			this.loading = false
			this.property = response.data
			this.name = response.data.name
			this.description = response.data.description
			this.address = response.data.address
			this.rooms = response.data.rooms
			this.bathrooms = response.data.bathrooms
			this.construction = response.data.construction_area
			this.land = response.data.land_area
			this.coordinates.lat = response.data.latitude
			this.coordinates.lng = response.data.longitude
			this.amenities = response.data.amenities
			this.images = response.data.images
			this.active_until = response.data.active_until
			this.agents = response.data.agents
			this.owner = response.data.owner

			this.agents.push(this.owner)
			if(response.data.sale_price == null || parseInt(response.data.sale_price) == 0){
				this.forSale = false
			}else{
				this.forSale = true
			}

			if(response.data.rent_price == null || parseInt(response.data.rent_price) == 0){
				this.forRent = false
			}else{
				this.forRent = true
			}
			
			if(this.property.active_until != null){
				let A = moment(this.property.active_until);
				let B = moment(new Date());
				
				let check = A.diff(B, 'days');
				
				if(check > 0){
					this.published = true
					this.new_date = this.moment(this.property.active_until).format("YYYY-MM-DD HH:mm")
				}else{
					this.published = false
					this.new_date = null
				}

			}
			
			
		})
		.catch(error => {
			this.loading = false
			console.log(error);
		})
		
	},
	created(){
		
	}

}
</script>
