<template>
    <div>
        <Loader :visible="loading" />
        <Navbar></Navbar>
        <v-content>
			<section id="about-me" class="white--text" style="background:#ffffff !important">
				<div class="py-12"></div>
				<v-container class="text-center">
					<h1 class="headline secondary--text font-weight-bold bold mt-3 mb-3">Confirmación Pago</h1>

				

					<v-responsive
						class="mx-auto title font-weight-light mb-8 px-5 "
						max-width="720"
					>
						<p align="justify" class="subtitle-1 secondary--text">¡Tu pago ha sido procesado exitosamente! Se cargara mensualmente la cantidad de Q195.00 para mantener activa tu membresía.					
						</p>	
						
					
						</v-responsive>
					

				


					<v-btn tile color="secondary" large class="pl-10 pr-10 text-none font-weight-bold subtitle-1" @click="showClases()">Ver Clases</v-btn>

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
		showClases(){
			this.$router.push('/clases-en-vivo')
		}
	},
	mounted() {
		console.log(this.getUser)
	},
	created(){
	
	}

}
</script>

