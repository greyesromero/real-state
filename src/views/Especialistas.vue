<template>
    <div>
        <Loader :visible="loading" />
        <Navbar></Navbar>
        <v-content>
			 <section id="especialistas">
				 
				<v-row no-gutters>
					<v-img
						:height="'500px'"  
						src="../assets/Banners/3x/especialistas@3x.png">
						<v-container fill-height 
						:class="[$vuetify.breakpoint.smAndDown ? 'mt-0 mb-0' : 'mt-5 mb-10']" >
							<v-row
							align="center"
							class="white--text mx-auto"
							justify="center"
							>
								<v-col
									class="white--text text-center"
									cols="12"
									tag="h1">
									<span
									:class="[$vuetify.breakpoint.smAndDown ? 'headline align-self-start' : 'display-1 align-self-start']"
									class="font-weight-bold "
									>
									Especialistas
									</span>
									<v-row class="mx-auto mt-5">
										<v-col
											v-for="(item, i) in options" :key="i"
											cols="4"
											md="4">
											<div class="text-center" style="cursor:pointer;" @click="clicked(item,i)">
												<div>
													<img :class="{'small-icon': $vuetify.breakpoint. smAndDown, 'medium-icon': $vuetify.breakpoint. mdAndUp}" :src="'../assets/SVG/'+item.icon+'.svg'" alt="alt">
												</div>
												<div
													class=" font-weight-regular text-uppercase"
													:class="{'subtitle-2': $vuetify.breakpoint. smAndDown, 'subtitle-1': $vuetify.breakpoint. mdAndUp}"
													v-text="item.name"
													v-if="item.name != 'Fisioterapeuta'"
												></div>
												<div
													class="text-center font-weight-regular text-uppercase"
													:class="{'subtitle-2 margin-left': $vuetify.breakpoint. smAndDown, 'subtitle-1': $vuetify.breakpoint. mdAndUp}"
													v-text="item.name"
													v-if="item.name == 'Fisioterapeuta'"
												></div>
											</div>
										</v-col>
									</v-row>
					
								</v-col>
								
							</v-row>
						</v-container>
					</v-img>
				</v-row>
			</section>
			
			<section id="content" class="white--text" style="background:#ffffff !important">
				<div class="py-5"></div>
				<v-container class="text-center">
					<span
					:class="[$vuetify.breakpoint.smAndDown ? 'headline align-self-start' : 'display-1 align-self-start']"
					class="secondary--text font-weight-bold">
						Especialistas
					</span>
					<v-row>
						<v-col cols="12" sm="4" md="4" v-for="(item, index) in visiblePages" :key="index" >
							<v-card
									class="mx-auto"
									max-width="374"
								>
									<youtube  class="white--text align-end" style="width:100%!important;"
									:video-id="item.video" player-height="200" player-width="100%"></youtube>

									<v-card-text>
										<v-list>
											<v-list-item >
												<v-list-item-avatar tile>
													<v-img
														:src="'../assets/SVG/'+all_options[item.type-1].icon+'.svg'" class="no-radius" 
													></v-img>
												</v-list-item-avatar>
												<v-list-item-content style="text-align:left!important;">
													<v-list-item-title class="">{{item.publisher}} </v-list-item-title>
													<v-list-item-subtitle class="primary--text">{{moment(item.publish_after,"YYYY-MM-DD h:mm:ss A").locale('es').format("dddd D, [de] MMMM hh:mm a")}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</v-list>
									
										<div style="text-align:left;" class="secondary--text title">{{item.title}}</div>

										<div style="text-align:justify;" v-html="item.body.substring(0,130)+' ...'"></div>
									</v-card-text>
									 <v-card-actions>
										<v-btn
											text
											color="primary"
											router :to="'/detail/'+item.id"
										>
											Leer Más
										</v-btn>
										</v-card-actions>
								<v-divider class="mx-4"></v-divider>
							</v-card>
						</v-col>
						<v-col v-if="visiblePages.length > 0" cols="12" class="text-center">
							
							<v-pagination
								v-if="visible"
								v-model="page"
								:length="Math.ceil(videos.length/perPage)"
							></v-pagination>
							
						</v-col>
						<v-col v-if="visiblePages.length == 0" cols="12">
	
							 <v-alert
							 type="error"
								border="top"
								color="secondary lighten-2"
								dark
								class="text-left"
								>
								No hay resultados para la búsqueda, intenta con un filtro diferente. 
								
								</v-alert>
								<v-btn  large depressed outlined @click="showAll()">Ver Todos</v-btn>

						</v-col>
					</v-row>
				</v-container>
				<div class="py-5"></div>
			</section>
		
			<section id="download" style="background:#fff !important">
				<div class="py-3"></div>
				<v-container class="text-center">
					<span
					:class="[$vuetify.breakpoint.smAndDown ? 'headline align-self-start' : 'display-1 align-self-start']"
					class="secondary--text font-weight-bold">
						Próximamente Descarga el App
					</span>
					<v-responsive
						class="mx-auto title font-weight-light px-5 mt-5"
						max-width="820">
							<img :class="{'small-app-img': $vuetify.breakpoint. smAndDown, 'medium-app-img': $vuetify.breakpoint. mdAndUp}" :src="'../assets/img/download.png'" alt="alt">

					</v-responsive>	
				</v-container>
				<div class="py-3"></div>
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
		visible: true,
		page: 1,
      	perPage: 3,
		loading: false,
		selected_type: null,
		loading: false,
		icons: [
			'mdi-facebook',
			'mdi-instagram',
		],
		videos: [],
	  	options: [
			{
				id: 7,
				icon: 'nutricion',
				name: 'Nutrición'
			},
			{
				id: 8,
				icon: 'meditacion',
				name: 'Meditación'
			},
			{
				id: 9,
				icon: 'Mindfulness',
				name: 'Mindfulness'
			},
			{
				id: 10,
				icon: 'fisioterapeuta',
				name: 'Fisioterapeuta'
			},
			{
				id: 11,
				icon: 'salud',
				name: 'Salud'
			},
			{
				id: 12,
				icon: 'personal trainer',
				name: 'Personal Trainer'
			}
		],
		all_options: [
			{
				id: 1,
				icon: 'yoga',
				name: 'Yoga'
			},
			{
				id: 2,
				icon: 'crossfit',
				name: 'Crossfit'
			},
			{
				id: 3,
				icon: 'baile',
				name: 'Baile'
			},
			{
				id: 4,
				icon: 'calistenia',
				name: 'Calistenia'
			},
			{
				id: 5,
				icon: 'funtional',
				name: 'Functional'
			},
			{
				id: 6,
				icon: 'box',
				name: 'Box'
			},
			{
				id: 7,
				icon: 'nutricion',
				name: 'Nutrición'
			},
			{
				id: 8,
				icon: 'meditacion',
				name: 'Meditación'
			},
			{
				id: 9,
				icon: 'Mindfulness',
				name: 'Mindfulness'
			},
			{
				id: 10,
				icon: 'fisioterapeuta',
				name: 'Fisioterapeuta'
			},
			{
				id: 11,
				icon: 'salud',
				name: 'Salud'
			},
			{
				id: 12,
				icon: 'personal trainer',
				name: 'Personal Trainer'
			}
		],

	}),
	computed: {
		getUser : function(){ 
			return this.$store.getters.getUser
		},
		visiblePages () {
			let filtered = this.videos;
			this.visible = true
			if (this.selected_type!=null) {
				
				filtered = this.videos.filter(
				m => m.type == this.selected_type
				);
				this.visible = false
				return filtered;
			}else{
				return filtered.slice((this.page - 1)* this.perPage, this.page* this.perPage)

			}
			
		}
	},
	methods: {
		clicked(item,index){

			this.options = this.options.map(function(obj){
				obj.icon = obj.icon.replace('_active','');
				return obj;
			});
			this.options[index].icon = item.icon + '_active'
			this.selected_type = this.options[index].id

		},
		showAll(){
			this.page = 1
			this.selected_type = null
			this.options = this.options.map(function(obj){
				obj.icon = obj.icon.replace('_active','');
				return obj;
			});
		}
	},
	mounted() {
		
	},
	created(){
		if(store.getters.isLoggedIn == false){
			this.$router.push('/login')
		}else{
			if(this.getUser.active == true){
				this.loading = true
				axios.get('https://choosemyfitness-api.herokuapp.com/api/blog/posts/')
				.then(response => {
					let blog_types = [7,8,9,10,11,12]
					this.videos = response.data.sort(function(a, b) {
									var dateA = new Date(a.created), dateB = new Date(b.created);
									return dateB - dateA
								}).filter(v => blog_types.indexOf(v.type) !== -1); //Unicamente los tipos de blog que corresponden a clases
					this.videos = this.videos.filter(date => {
						return this.moment(date.publish_after,'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm') < this.moment(new Date()).format('YYYY-MM-DD HH:mm');
					});
					this.loading = false
				})
				.catch(error => {
					this.loading = false
					console.log(error);
				})
			}else{
				this.$router.push('/payment')
			}
		}
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

.margin-left{
	margin-left: -10px!important;
}

.no-radius .v-image__image--cover{
	background-size: unset!important;
	-webkit-border-radius: 0px;
    -moz-border-radius: 0px;
    border-radius: 0px;
    border: none;
	
}
</style>

