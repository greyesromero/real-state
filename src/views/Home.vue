<template>
	<div>	
		<section id="hero">
			<v-row no-gutters>
				<v-img
					:height="'450px'"
					src="../assets/img/neighborhood.jpg">
					<v-overlay
						class="position-relative touch-action-auto w-100 h-100"
						:dark="false"
						opacity="0.5"
						:value="true"
						z-index="1">	
						<v-container fluid grid-list-md pt-12 mt-12>
							<div class="text-center pt-12  mt-12">
								<h1 class="display-2 white--text">Descubre el lugar perfecto para ti</h1>
							</div>
							<div class="mt-5">
								<v-row
									align="center"
									justify="center">
									<v-btn-toggle
									v-model="toggle_exclusive"
									color="primary"
									outlined
									>
										<v-btn>
										Renta
										</v-btn>
										<v-btn>
											Venta
										</v-btn>
										<v-btn>
											Compra
										</v-btn>
											
									</v-btn-toggle>
								</v-row>
							</div>
							<div class="mt-5">
								<SearchForm />
							</div>
						</v-container>
					</v-overlay>
				</v-img>
			</v-row>
		</section>
		<section id="explora" style="background:#fff !important">
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
					
					
				</v-row-->
	
      <v-slide-group
        v-model="model"
        class="pa-4"
        multiple
        show-arrows
      >
        <v-slide-item
          v-for="n in 15"
          :key="n"
          v-slot:default="{ active, toggle }"
        >
        <v-card
							:loading="loading"
							class="mx-5 my-12"
							max-width="274"
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
        </v-slide-item>
      </v-slide-group>
			</v-container>
			<div class="py-3"></div>
		</section>
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
			src: '../assets/Galeria/3x/g1@3x.png',
		},
		{
			src: '../assets/Galeria/3x/g2@3x.png',
		},
		{
			src: '../assets/Galeria/3x/g3@3x.png',
		},
		{
			src: '../assets/Galeria/3x/g4@3x.png',
		},
		],
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

