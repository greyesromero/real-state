<template>
    <div>
        <Loader :visible="loading" />
        <Navbar></Navbar>
        <v-content style="background:#ffffff !important">
			<section style="background:#ffffff !important">
				<div class="py-12"></div>
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


export default {
	components: {
		Navbar,
		Loader,
        Footer
	
	},
	data: () => ({
        loading: false
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
