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
						opacity="0.4"
						:value="true"
						z-index="1">	
						<v-container fluid grid-list-md pt-12 mt-12>
							<div class="text-center " 						
							:class="[$vuetify.breakpoint.smAndDown ? 'pt-1 mt-1' : 'pt-12  mt-12']"
							>
								<h1 class="display-2 white--text">HS: Tu espacio a un click de distancia</h1>
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
										Compra
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
		<section id="explora" style="background:#fff !important" class='d-none d-sm-flex'>
			<div class="py-5"></div>
			<v-container class="text-center">
     		<v-flex>
				<v-carousel hide-delimiters  :height="'1500px'">
					<v-carousel-item>
						<v-layout row>
							<v-flex sm3 v-for="(card,index) in cards" :key="index" pl-2 pr-2>
								<v-card style="pointer:cursor;" class="my-5" router :to="{ name: 'search', 
												params: { location: null}}">
										<v-img
											:src="card.src"
											class="white--text align-end"
											gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
											height="200px"
										>
											<v-card-title v-text="card.title"></v-card-title>
										</v-img>
							
										
								</v-card>
							</v-flex>
						</v-layout>
					</v-carousel-item>
					<!--v-carousel-item>
						<v-layout row>
							<v-flex sm3 v-for="(card,index) in cards.slice(8,16)" :key="index" pl-2 pr-2>
								<v-card style="pointer:cursor;" class="my-5" router :to="{ name: 'search', 
												params: { location: {name:card.title}}}">
										<v-img
											:src="card.src"
											class="white--text align-end"
											gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
											height="200px"
										>
											<v-card-title v-text="card.title"></v-card-title>
										</v-img>
							
										
								</v-card>
							</v-flex>
						</v-layout>
					</v-carousel-item>
					<v-carousel-item>
						<v-layout row>
							<v-flex sm3 v-for="(card,index) in cards.slice(16,22)" :key="index" pl-2 pr-2>
								<v-card style="pointer:cursor;" class="my-5" router :to="{ name: 'search', 
									params: { location: {name:card.title}}}">
									<v-img
										:src="card.src"
										class="white--text align-end"
										gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
										height="200px"
									>
										<v-card-title v-text="card.title"></v-card-title>
									</v-img>
						
									
								</v-card>
							</v-flex>
						</v-layout>
					</v-carousel-item-->
				</v-carousel>
				</v-flex>
			</v-container>
			<div class="py-5"></div>
		</section>
		<section id="explora_mobile" style="background:#fff !important" class='d-flex d-sm-none'>
			<div class="py-5"></div>
			<v-container class="text-center">
     			<v-layout row>
					<v-flex xs6 v-for="(card,index) in cards" :key="index" pl-2 pr-2>
						<v-card style="pointer:cursor;" class="my-5" router :to="{ name: 'search', 
										params: { location: {name:card.title}}}">
								<v-img
									:src="card.src"
									class="white--text align-end"
									gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
									height="200px"
								>
									<v-card-title :class="[$vuetify.breakpoint.smAndDown ? 'body-1' : 'title']" v-text="card.title"></v-card-title>
								</v-img>
					
								
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
			<div class="py-5"></div>
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
						Tu inmueble a un solo click de distancia
					</span>	
				</v-responsive>	
				<v-row>
					<v-col
						v-for="({ icon, title, text }, i) in features"
						:key="i"
						cols="12"
						md="6"
						class="pa-3 d-flex flex-column"
					>
						<v-card
							class="py-4 px-4 elevation-2 flex d-flex flex-column"
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
							class="body-1 text-justify"
							v-html="text"
							></v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
			<div class="py-10"></div>
		</section>
		<v-divider></v-divider>
		<section id="stories" class="white">
			<div class="py-10"></div>
				<v-container class="text-center">
					<span align="center"
					:class="[$vuetify.breakpoint.smAndDown ? 'headline' : 'display-1']"
					class=" font-weight-regular">
						Historias de éxito
					</span>
     				<v-flex>
						<v-carousel hide-delimiters class="my-10">
							<v-carousel-item>
								<v-layout row px-12>
									<v-flex sm6 xs12>
										<v-card
											class="px-4 elevation-0"
											color="white"
											
											flat>
											<v-card-text
											class="title font-weight-light text-justify black--text px-3"
											:class="[$vuetify.breakpoint.smAndDown ? 'py-3' : 'py-12']">
											<v-img
											src="assets/img/comillas.png"
											height="50px"
											width="50px"
											class="my-3"></v-img>
											“No sabía que mover mis propiedades en Guatemala podia ser tan sencillo hasta que descubrí que en HS me ahorro mucho y obtengo al cliente ideal. Ahora me dedico a los Bienes Raíces” – Lucía Delgado
											</v-card-text>
											<v-card-actions>
											<v-btn
											color="secondary"
											outlined
											router to = "/login"
											>
											Publicar Propiedad
											</v-btn>
											
										</v-card-actions>
										</v-card>
									</v-flex>
									<v-flex sm6 xs12 :style="{display: $vuetify.breakpoint.smAndUp ? 'block' : 'none'}">
										
										<v-img
											src="assets/img/historia_exito_1.png"
											height="400px"
											width="500px"
											class="px-10"
										>
										</v-img>
									</v-flex>
								</v-layout>
							</v-carousel-item>
							<v-carousel-item>
								<v-layout row px-12 py-12>
									<v-flex sm6 xs12>
										<v-card
											class="py-4 px-4 elevation-0"
											color="white"
											
											flat>
											<v-card-text
											class="font-weight-light text-justify black--text"
											:class="[$vuetify.breakpoint.smAndDown ? 'title py-3' : 'title py-12']">
											<v-img
											src="assets/img/comillas.png"
											height="50px"
											width="50px"
											class="my-3"></v-img>
											“Busqué apartamento por tres meses y cuando encontré HS me enamoré de la plataforma” – Oscar Valdéz
											</v-card-text>
											<v-card-actions>
												<v-btn
												color="secondary"
												outlined
												router to = "/login"
												>
												Publicar Propiedad
												</v-btn>
												
											</v-card-actions>
										</v-card>
									</v-flex>
									<v-flex sm6 xs12 :style="{display: $vuetify.breakpoint.smAndUp ? 'block' : 'none'}">
										
										<v-img
											src="assets/img/historia_exito_2.jpg"
											height="400px"
											width="500px"
											class="px-10"
										>
										</v-img>
									</v-flex>
								</v-layout>
							</v-carousel-item>
						</v-carousel>
					</v-flex>
				</v-container>
			<div class="py-5"></div>
		</section>
		<v-divider></v-divider>
		<section id="features" class="white" light>
			<div class="py-10"></div>
			<v-container class="text-center">
				<v-responsive
					class="mx-auto title font-weight-light px-5 mb-10"
					max-width="820">
					<span align="center"
					:class="[$vuetify.breakpoint.smAndDown ? 'headline' : 'display-1']"
					class=" font-weight-regular mt-5 ">
						Te tenemos cubierto
					</span>	
				</v-responsive>	
				<v-row>
					<v-col cols="12" sm="6" md="6">
						<v-card
							class="px-4 elevation-0"
							color="white"
							flat>
							<v-card-text
							class="title font-weight-light text-justify black--text px-3"
							>
							
							Sabemos lo importante que es tu seguridad, y pensamos siempre en ti. Ya sea publicando tu espacio o buscando el lugar perfecto para comprar o alquilar, en HS hemos creado opciones seguras y confiables para que tu experiencia sea la mejor.
							</v-card-text>
						</v-card>
					</v-col>
					<v-col cols="12" sm="6" md="6">
						<v-card
							class="px-4 elevation-0"
							color="white"
							flat>
							<v-card-text
							class="title font-weight-light text-justify black--text px-3"
							>
							
							<ul>
								<li>Por seguridad, no utilizamos contraseñas sino tokens</li>
								<li>En nuestro sitio no existe publicidad invasiva</li>
								<li>El Sistema funciona 24 horas al día, 365 días del año</li>
								<li>Los cobros son seguros</li>
							</ul>
							</v-card-text>
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
		},
		{
			src: '../assets/img/house4.jpg',
		}
	],
	cards: [
				{ id:1, title: 'Petén', src: '../assets/img/departamentos/peten.jpg', flex: 3 },
				{ id:2, title: 'Izabal', src: '../assets/img/departamentos/izabal.jpg', flex: 3 },
				{ id:3, title: 'Alta Verapaz', src: '../assets/img/departamentos/alta_verapaz.jpg', flex: 3 },
				{ id:4, title: 'Quiché', src: '../assets/img/departamentos/quiche.jpg', flex: 3 },
				{ id:5, title: 'Huehuetenango', src: '../assets/img/departamentos/huehuetenango.jpg', flex: 3 },
				{ id:6, title: 'Escuintla', src: '../assets/img/departamentos/escuintla.jpg', flex: 3 },
				{ id:7, title: 'San Marcos', src: '../assets/img/departamentos/san_marcos.jpg', flex: 3 },
				{ id:8, title: 'Jutiapa', src: '../assets/img/departamentos/jutiapa.jpg', flex: 3 },
				{ id:9, title: 'Baja Verapaz', src: '../assets/img/departamentos/baja_verapaz.jpg', flex: 3 },
				{ id:10, title: 'Zacapa', src: '../assets/img/departamentos/zacapa.jpg', flex: 3 },
				{ id:11, title: 'Suchitepéquez', src: '../assets/img/departamentos/suchitepequez.jpg', flex: 3 },
				{ id:12, title: 'Chiquimula', src: '../assets/img/departamentos/chiquimula.jpg', flex: 3 },
				{ id:13, title: 'Guatemala', src: '../assets/img/departamentos/guatemala.jpg', flex: 3 },
				{ id:14, title: 'Jalapa', src: '../assets/img/departamentos/jalapa.jpg', flex: 3 },
				{ id:15, title: 'Chimaltenango', src: '../assets/img/departamentos/chimaltenango.jpg', flex: 3 },
				{ id:16, title: 'Quetzaltenango', src: '../assets/img/departamentos/quetzaltenango.jpg', flex: 3 },
				{ id:17, title: 'El Progreso', src: '../assets/img/departamentos/el_progreso.jpg', flex: 3 },
				{ id:18, title: 'Retalhuleu', src: '../assets/img/departamentos/retalhuleu.jpg', flex: 3 },
				{ id:19, title: 'Sololá', src: '../assets/img/departamentos/solola.jpg', flex: 3 },
				{ id:20, title: 'Totonicapán', src: '../assets/img/departamentos/totonicapan.jpg', flex: 3 },
				{ id:21, title: 'Sacatepéquez', src: '../assets/img/departamentos/sacatepequez.jpg', flex: 3 },
				{ id:22, title: 'Santa Rosa', src: '../assets/img/departamentos/santa_rosa.jpg', flex: 3 },

			],
			
		features: [
		{
			icon: 'mdi-account-star',
			title: '¿Quiénes Somos?',
			text: ' Somos una plataforma digital, que reune a todos las partes involucradas en la industria de bienes y raíces con el objetivo de facilitar los procesos en la búsqueda, venta y/o alquiler de propiedades en Guatemala, brindando una herramienta para promocionar y buscar inmuebles de manera práctica, segura y confiable; todo en el mismo lugar  ¡La propiedad que buscas está aquí, publicala o encuéntrala!',
		},
		{
			icon: 'mdi-home-city-outline',
			title: '¿Estás buscando alquilar o comprar un inmueble?',
			text: 'En HS encuentras el espacio perfecto para ti. Encontrar una propiedad, es el inicio de algo nuevo y lleno de historias; por eso, nos encargamos de hacer que cada inmueble que se publica en HS brille con luz propia y encuentre a su próximo inquilino o futuro dueño ideal. ',
		},
		{
			icon: 'mdi-briefcase-account',
			title: '¿Tienes propiedades o eres un agente inmobiliario? ',
			text: `En HS todos podemos dedicarnos a los bienes raíces. Publica tu(s) propiedad(es) y recibe solicitud de clientes interesados, estadísticas de views, obtiene leads y más herramientas para manejar todos tus inmuebles en el mismo lugar con la capacidad de actualizar en tiempo real para que todos puedan verlo en ese instante. 

				¿Por qué pagar un gran porcentaje de comisión cuando puedes a través de un pequeño Fee obtener excelentes resultados en tus ventas además de una herramienta tecnológica para manejarlo todo?`,
		},
		{
			
			icon: 'mdi-map-marker-radius',
			title: '¿Buscas algo más especifico?',
			text: 'Contáctanos para conocer más de los reglamentos o solicitar ayuda personalizada. Envía un correo electrónico a <a href="#">hola@hsguatemala.com</a> para más información.',
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

