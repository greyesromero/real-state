<template>

    
    <div>
		<section id="title" >
			<v-container fill-height fluid px-8>
				<v-row >
					<v-col cols="12" md="8">
						<span
									:class="[$vuetify.breakpoint.smAndDown ? 'text-center' : 'text-left']"
									>
										<h1 class="display-1 ">Casa deluxe en Antigua Guatemala</h1>
									</span>
					</v-col>
					<v-col cols="12" md="4">
						<v-flex :class="[$vuetify.breakpoint.smAndDown ? ' text-center' : ' text-right']">
								<v-btn icon color="black">
								<v-icon>mdi-share-variant</v-icon>
								</v-btn>
								<v-btn icon color="black">
								<v-icon>mdi-heart-outline</v-icon>
								</v-btn>
							</v-flex>
					</v-col>
				</v-row>
			</v-container>
		</section>
		<section id="big_gallery" v-if="items.length>=3" class="d-none d-sm-flex" >
			<v-container
				fluid
				grid-list-md
				class="position-absolute"
			>
			<v-layout align-center justify-center row fill-height px-10>
					<v-flex sm8 xs12>
						<v-card class="mr-2">
						<v-img :src="items[0].src" height="412px" width="100%"></v-img>
						</v-card>
					</v-flex>
					<v-flex sm4 xs12>
						<v-card class="mb-4">
							<v-img :src="items[1].src" height="198px"></v-img>
						</v-card>
						<v-card >
							<v-img :src="items[2].src" height="198px"></v-img>
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
								<v-img :src="items[0].src" height="400px"></v-img>
							</v-card>
						</v-flex>
						<v-flex  xs12 md4>
							<v-layout column justify-space-between fill-height>
								<v-card class="mb-1">
									<v-img :src="items[0].src" height="198px"></v-img>
								</v-card>
								<v-card >
									<v-img :src="items[0].src" height="198px"></v-img>
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
								color="primary"
								text-color="white"
								>
								RENT
							</v-chip>
							<v-chip
								class="ma-2"
								color="success"
								label
								text-color="white"
								>
								NEW
							</v-chip>
						</v-flex>
					</v-layout>
					<v-layout row wrap align-end mx-5>
						<v-flex xs12 d-flex justify-end>
							<v-btn color="primary" class="white--text"  @click="toggleGallery">
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
		<section id="small_gallery"  v-if="items.length<=2" class="d-none d-sm-flex">
			<v-container
				fluid
				grid-list-md
				px-5
			>
				<v-img
				:src="items[0].src"
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
								color="primary"
								>
								RENT
							</v-chip>
							<v-chip
								class="ma-2"
								color="success"
								label
								text-color="white"
								>
								NEW
							</v-chip>
						</v-flex>
					</v-layout>
					<v-layout row wrap align-end pb-6>
					<v-flex xs12 d-flex justify-end>
						<v-btn color="primary" class="white--text">
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
	  	<section id="slider_gallery"  class="d-flex d-sm-none">
			<v-container>
				<v-carousel hide-delimiters>
					<v-carousel-item
					v-for="(item,i) in items"
					:key="i"
					:src="item.src"
					>
						<v-container fill-height>
							<v-layout row wrap align-start px-6>
								<v-flex xs12 d-flex justify-start>
									<v-chip
										class="ma-2"
										label
										text-color="white"
										color="primary"
										>
										RENT
									</v-chip>
									<v-chip
										class="ma-2"
										color="success"
										label
										text-color="white"
										>
										NEW
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
					 <v-layout row wrap>
                  <v-flex xs12 md8 :class="[$vuetify.breakpoint.smAndDown ? 'text-center' : 'text-left']"
                  
                  >
                   <h2 class="subtitle "  :class="[$vuetify.breakpoint.smAndDown ? 'mb-0' : 'mb-8']">Especificaciones</h2>
				
                  </v-flex>
				   <v-flex xs12 md4 :class="[$vuetify.breakpoint.smAndDown ? 'text-center' : 'right']"
                  
                  >
                    <v-chip		
								x-large
								class="ma-2 px-8"
								label
								
								>
								Q1000/MES
							</v-chip>
                  </v-flex>
				
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12 md4
                  
                  >
                    <span class="font-weight-bold">
                      <v-icon small left>mdi-bed</v-icon>
                      2 Habitaciones
                    </span>
                  </v-flex>
				   <v-flex xs12 md4
                  
                  >
                    <span class="font-weight-bold">
                      <v-icon small left>mdi-shower</v-icon>
                      2 Baños
                    </span>
                  </v-flex>
				   <v-flex xs12 md4
                  
                  >
                    <span class="font-weight-bold">
                      <v-icon small left>mdi-resize</v-icon>
                      1200 m²
                    </span>
                  </v-flex>
                </v-layout>
              </v-container>
				<p class="body-1 letter-spacing-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore, tempora vitae ipsam optio rem excepturi reiciendis repellat assumenda deleniti, veritatis dicta dolor provident inventore accusamus repellendus aspernatur quaerat odit perspiciatis.</p> 
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
                      <v-icon small left>mdi-{{buildAmenityIcon(amenity.amenity)}}</v-icon>
                      {{ amenity.amenity }}
                    </span>
                  </v-flex>
                </v-layout>
              </v-container>
			  
            </section>
			
		  </v-flex>
          <!-- RIGHT SIDE -->
           <v-flex xs12 md4>
            <section>
				<v-container grid-list-md pa-0 px-0>
			    <v-tabs
					color="primary"
					
				>
					<v-tab
					
					>
					 INFORMACIÓN
					</v-tab>
					<v-tab
					
					>
					AGENDAR VISITA
					</v-tab>
     
  
			
				<v-tab-item>
				<ScheduleForm />
				</v-tab-item>
			
			 </v-tabs>
			 </v-container>
            
            </section>
           
          </v-flex>
        </v-layout>
      </section>
	  <section class=""  >
				
			<v-container grid-list-md :class="[$vuetify.breakpoint.smAndDown ? 'px-5' : 'px-0']">
				<h2 class="subtitle">Ubicación</h2>
				<h2 class="grey--text subtitle-1"><v-icon left small>mdi-map-marker</v-icon> 6A Avenida A, Ciudad de Guatemala</h2>

			</v-container>
			<GmapMap :center="this.coordinates" :zoom="15" map-type-id="roadmap" style="width: auto; height: 300px">
				<GmapMarker  color="secondary" :position="this.coordinates" />
			</GmapMap>
		</section>
		 <section  class=" grey lighten-4">
				
			<v-container px-0 grid-list-md py-10>
				<h2 class="subtitle text-center mb-5">Casas Similares</h2>
				 <v-container
          fluid
          grid-list-lg
        >
          <v-layout row wrap>
           <v-flex xs12 md4>
              <v-card color="white">
                <v-layout>
                  <v-flex xs5>
                    <v-img
                      src="https://nempresa.com/wp-content/uploads/2019/01/CASA-CLUB-2.jpg"
                      height="125px"
                      contain
                    ></v-img>
                  </v-flex>
                  <v-flex xs7>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">Casa Deluxe</div>
                        <div class="caption">Zona 16, Ciudad de Guatemala</div>
                        <div>$100</div>
                      </div>
					  <v-row
								align="center"
								class="mx-0"
								>
								<v-rating
									:value="4.5"
									color="amber"
									dense
									half-increments
									readonly
									size="14"
								></v-rating>
						
								<div class="caption ml-4">4.5 (413)</div>
								</v-row>
                    </v-card-title>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
               <v-card-actions>
					<v-btn
					color="primary"
					text
					>
					VER MÁS
					</v-btn>
				</v-card-actions>
              </v-card>
            </v-flex>
			<v-flex xs12 md4>
              <v-card color="white">
                <v-layout>
                  <v-flex xs5>
                    <v-img
                      src="https://nempresa.com/wp-content/uploads/2019/01/CASA-CLUB-2.jpg"
                      height="125px"
                      contain
                    ></v-img>
                  </v-flex>
                  <v-flex xs7>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">Casa Deluxe</div>
                        <div class="caption">Zona 16, Ciudad de Guatemala</div>
                        <div>$100</div>
                      </div>
					  <v-row
								align="center"
								class="mx-0"
								>
								<v-rating
									:value="4.5"
									color="amber"
									dense
									half-increments
									readonly
									size="14"
								></v-rating>
						
								<div class="caption ml-4">4.5 (413)</div>
								</v-row>
                    </v-card-title>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
               <v-card-actions>
					<v-btn
					color="primary"
					text
					>
					VER MÁS
					</v-btn>
				</v-card-actions>
              </v-card>
            </v-flex>
			<v-flex xs12 md4>
              <v-card color="white">
                <v-layout>
                  <v-flex xs5>
                    <v-img
                      src="https://nempresa.com/wp-content/uploads/2019/01/CASA-CLUB-2.jpg"
                      height="125px"
                      contain
                    ></v-img>
                  </v-flex>
                  <v-flex xs7>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">Casa Deluxe</div>
                        <div class="caption">Zona 16, Ciudad de Guatemala</div>
                        <div>$100</div>
                      </div>
					  <v-row
								align="center"
								class="mx-0"
								>
								<v-rating
									:value="4.5"
									color="amber"
									dense
									half-increments
									readonly
									size="14"
								></v-rating>
						
								<div class="caption ml-4">4.5 (413)</div>
								</v-row>
                    </v-card-title>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
               <v-card-actions>
					<v-btn
					color="primary"
					text
					>
					VER MÁS
					</v-btn>
				</v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>

			</v-container>
			
		</section>
     
     
     
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
 
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Loader from '../components/Loader.vue'
import SearchForm from '../components/SearchForm.vue'
import DetailGallery from '../components/DetailGallery.vue'
import ScheduleForm from  '../components/ScheduleForm.vue'

export default {
	components: {
		Navbar,
		Loader,
		DetailGallery,
		SearchForm,
		ScheduleForm
	
	},
	data: () => ({
		galleryDialog: false,
		property: null,
		loading: false,
		coordinates: {
					lat: 14.6349,
					lng: -90.5069,
				},
		icons: [{
			icon: 'mdi-facebook',
			url:'https://www.facebook.com/choosemyfitness/'
		},
		{
			icon: 'mdi-instagram',
			url:'https://www.instagram.com/choosemyfitness/'
		}],
	toggle_exclusive: 0,
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
	 amenities: [
          {
            id: 1,
            amenity: 'Aire acondicionado'
          },
          {
            id: 2,
            amenity: 'Televisión'
          },
          {
            id: 3,
            amenity: 'Lavamanos'
          }
        ],
		features: [
		{
			icon: 'mdi-map-marker-radius',
			title: 'Encuentra una casa',
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam',
		},
		{
			icon: 'mdi-calendar-clock',
			title: 'Agenda una cita',
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam',
		},
		{
			icon: 'mdi-home-city-outline',
			title: 'Conoce el barrio',
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam',
		},
		],
	}),
	computed: {
		getUser : function(){ 
			return this.$store.getters.getUser
		},
	},
	methods: {
		 buildAmenityIcon(amenityName) {
      switch (amenityName) {
        case 'Aire acondicionado':
          return 'air-conditioner'
        case 'Televisión':
          return 'television'
        case 'Lavamanos':
          return 'hand'
        case 'Estufa':
          return 'stove'
        case 'Tina':
          return 'hot-tub'
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
	},
	mounted() {
		
	},
	created(){
	
	}

}
</script>
<style>

</style>

