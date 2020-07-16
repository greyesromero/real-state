<template>
	<div>	
		<section id="hero">
		</section>
	</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Loader from '../components/Loader.vue'


export default {
	components: {
		Loader,
	
	
	},
	data: () => ({
		loading: false,
		model: 1,
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

