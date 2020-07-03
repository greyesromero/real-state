<template>
    <div>
        <Loader :visible="loading" />
        <Navbar></Navbar>
        <v-content>
			<section id="about-me" class="white--text" style="background:#ef6a49 !important">
				<div class="py-12"></div>
				<v-container class="text-center">
					<h1 class="headline secondary--text font-weight-bold bold mt-3 mb-3">Tu Mejor Versión</h1>

				

					<v-responsive
						class="mx-auto title font-weight-light mb-8 px-5 "
						max-width="720"
					>
						<p align="justify" class="subtitle-1">En una sola membresía tendrás acceso a todo tipo de rutinas y clases que tengan que ver con el fitness, así como también contaras con diferentes especialistas el cual te ayudarán a llevarte a tu mejor versión.					
						</p>	
						
						<ul style="list-style: none;text-align:justify;" class="pl-0 body-2">
							<li class="mb-2">
								<v-icon color="white">mdi-check</v-icon> Diversidad de opciones con una sola membresía 
							</li>
							<li class="mb-2">
								<v-icon color="white">mdi-check</v-icon> Todo tipo de rutinas de Fitneess 
							</li>
							<li class="mb-2">
								<v-icon color="white">mdi-check</v-icon> Tips y consejos de especialistas (Nutricionistas, fisioterapeutas, personal trainer) y mucho más
							</li>
							<li class="mb-2">
								<v-icon color="white">mdi-check</v-icon> Descubre tu mejor versión 
							</li>
						</ul>
						</v-responsive>
					

					<div></div>
					<h1 class="display-3 white--text font-weight-bold bold mt-3 mb-0 pb-0" style="font-weight:900!important;">Q195</h1>
					<h1 class="title secondary--text font-weight-regular mt-0 pt-0 mb-3">Pago Único</h1>


					<v-btn tile color="secondary" large class="pl-10 pr-10 text-none font-weight-bold subtitle-1" @click="BuyNow()">Comprar</v-btn>

				</v-container>

				<div class="py-12"></div>
			</section>
    	</v-content>
		<Footer></Footer>
      
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Loader from '../components/Loader.vue'
import store from '../store'


export default {
	components: {
		Navbar,
		Loader,
        Footer
	
	},
	data: () => ({
		loading: false,
		icons: [
        'mdi-facebook',
        'mdi-instagram',
      ],
	}),
	computed: {
		getUser : function(){ 
			return this.$store.getters.getUser
		},
	},
	methods: {
		BuyNow(){
			if(store.getters.isLoggedIn == true){
				this.$router.push('/payment')
			}else{
				this.$router.push('/login')
			}
		}
	},
	mounted() {
		
	},
	created(){
	
	}

}
</script>

