<template>
	<div>	
		<section id="hero">
			<v-row no-gutters>
				 <v-carousel hide-delimiters cycle interval="3500"
				 :height="'500px'">
					<v-carousel-item
					v-for="(item,i) in items"
					:key="i"
					:src="item.src"
					>
					
					</v-carousel-item>
						<v-overlay
						class="position-absolute touch-action-auto w-100 h-100"
						:dark="false"
						opacity="0.3"
						:value="true"
						z-index="1">	
						<v-container fluid grid-list-md pt-12 mt-12>
							<div class="text-center " 						
							:class="[$vuetify.breakpoint.smAndDown ? 'pt-1 mt-1' : 'pt-12  mt-12']"
							>
								<h1 class="display-2 white--text">Descubre el lugar perfecto para ti</h1>
							</div>
							<div class="mt-5">
								<v-row
									align="center"
									justify="center">
									<v-btn-toggle
									v-model="toggle_exclusive"
									color="primary lighten-5"
									outlined
									>
										<v-btn>
										Renta
										</v-btn>
										<v-btn>
											Venta
										</v-btn>
										
											
									</v-btn-toggle>
								</v-row>
							</div>
							<div class="mt-5">
								<SearchForm />
							</div>
						</v-container>
					</v-overlay>
				</v-carousel>
				
			</v-row>
		</section>
		<!--section id="explora" style="background:#fff !important" v-if="properties">
			<div class="py-3"></div>
			<v-container class="text-center">
				<v-responsive
					class="mx-auto title font-weight-light px-5 "
					max-width="820">
					<span align="center"
					:class="[$vuetify.breakpoint.smAndDown ? 'headline' : 'display-1']"

					class=" font-weight-regular mt-5">
						Explora la ciudad
					</span>	
					<p class="mt-5">
					Explore fotos originales del vecindario, imágenes de drones, reseñas de residentes e información local para ver si las casas o apartamentos en alquiler son adecuados para usted.

					</p>
				</v-responsive>	

				<!--v-row>
					<v-col cols="12" sm="3" md="3">
						<v-card
							:loading="loading"
							class="mx-auto my-12"
							max-width="374"
							>
							<v-img
							class="white--text align-end"
							height="200px"
							src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
							>
							<v-card-title>Antigua Guatemala</v-card-title>
							</v-img>
						
							<v-card-text>
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
						
								<div class="grey--text ml-4">4.5 (413)</div>
								</v-row>
						
								<div class="mt-2">Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
							</v-card-text>
						
							<v-divider class="mx-4"></v-divider>
						
							
						
							<v-card-actions>
								<v-btn
								color="primary lighten-2"
								text
								>
								VER MÁS
								</v-btn>
							</v-card-actions>
						</v-card>
					
						
					</v-col>
					
					
				</v-row>
	
      <v-slide-group
        v-model="model"
       
        multiple
        show-arrows
		mobile-breakpoint
      >
        <v-slide-item
          v-for="n in properties"
          :key="n.id"
          v-slot:default="{ active, toggle }"
        >
			<v-card
				:loading="loading"
				:class="[$vuetify.breakpoint.smAndDown ? 'mx-1 my-12' : 'mx-5 my-12']"
				:style="{'max-width': $vuetify.breakpoint.smAndUp ? '275px' : '225px'}"
				
				>
					
					<v-carousel hide-delimiters
					class="white--text align-end"
					height="175px"
					v-if="n.images.length!=0">
						<v-carousel-item
						v-for="(item,i) in n.images"
						:key="i"
						:src="item.image"
						
						gradient="rgba(0,0,0,0.1),rgba(0,0,0,0.2),rgba(0,0,0,0.25),rgba(0,0,0,0.3),rgba(0,0,0,0.9)">
	
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
					<v-img
					:src="'../assets/img/sin-imagen.jpg'"
					gradient="rgba(0,0,0,0.2), rgba(0,0,0,0.2)"
					height="175px"
					v-if="n.images.length == 0"
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
										<span class="text-truncante text-right title white--text">Q1000</span>
										
									</v-flex>
								</v-layout>
							</v-layout>
					</v-img>
		
					<v-card-title>
						<div class="text-truncate">{{n.name}}</div>
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
						router :to="`/detail/`+n.id"
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
			<div class="py-3"></div>
		</section-->
		<v-divider></v-divider>
		<section id="features" class="grey lighten-5">
			<div class="py-10"></div>
			<v-container class="text-center">
				<v-responsive
					class="mx-auto title font-weight-light px-5 mb-10"
					max-width="820">
					<span align="center"
					:class="[$vuetify.breakpoint.smAndDown ? 'headline' : 'display-1']"
					class=" font-weight-regular mt-5 ">
						¿Cómo funciona?
					</span>	
				</v-responsive>	
				<v-row>
					<v-col
						v-for="({ icon, title, text }, i) in features"
						:key="i"
						cols="12"
						md="4"
					>
						<v-card
							class="py-12 px-4 elevation-2"
							color="white"
							flat
						>
		
							<div>
								<v-avatar
								size="88"
								>
								<v-icon
									large
									v-text="icon"
									class="primary--text"
								></v-icon>
								</v-avatar>
							</div>
							<v-card-title
							class="justify-center font-weight-black text-uppercase subtitle-1"
							v-text="title"
							></v-card-title>
							<v-card-text
							class="body-1 text-center"
							v-text="text"
							></v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
			<div class="py-10"></div>
		</section>
		<v-divider></v-divider>
		<section id="contact" class="grey lighten-3">
			<div class="py-5"></div>
			<v-container class="text-center">
				<v-card
					flat
					tile
					class="white--text text-center grey lighten-3"
				>
					<v-card-text class="white--text">
						<span
						:class="[$vuetify.breakpoint.smAndDown ? 'headline align-self-start' : 'display-1 align-self-start']"
						class="black--text">
							Contáctanos
						</span>
					</v-card-text>
					<v-card-text class="pt-5">
						Para más información escribe un e-mail a <strong>admin@info.com</strong>
					</v-card-text>
					<v-card-text class="pt-5">
						<v-layout row wrap no-gutters justify-center pb-5>
							<v-col cols="4" md="2" v-for="(icon,i) in icons" :key="i">
								<v-avatar
								color="white"
								size="77"
								>
									<v-btn
										class="mx-4 grey--text"
										icon
										@click="goTo(icon.url)"
									>
										<v-icon size="46px">{{ icon.icon }}</v-icon>
									</v-btn>
								</v-avatar>
							</v-col>
						</v-layout>
					</v-card-text>
				</v-card>	
			</v-container>
			<div class="py-5"></div>
		</section>
	</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Loader from '../components/Loader.vue'
import SearchForm from '../components/SearchForm.vue'


export default {
	components: {
		Navbar,
		Loader,
	
		SearchForm
	
	},
	data: () => ({
		loading: false,
		properties: null,
		model: 1,
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
		}],
		stats: [{
			name:'yoga',
			image:'yoga'
		},
		{
			name:'crossfit',
			image:'crossfit'
		},
		{
			name:'baile',
			image:'baile'
		},
		{
			name:'calistenia',
			image:'calistenia'
		},
	
		{
			name:'functional',
			image:'funtional'
		},
		{
			name:'box',
			image:'box'
		}],
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
		
	},
	mounted() {
		this.loading = true
		
		axios.get('https://hsrealestate-api.herokuapp.com/api/properties/')
		.then(response => {
			this.loading = false
			this.properties = response.data
			
			
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
<style>
.small-icon{
	width: 50px;
	height: 50px;
}
.medium-icon{
	width: 75px;
	height: 75px;
}

.small-app-img{
	width:250px;
}
.medium-app-img{
	width:300px;
}
</style>

