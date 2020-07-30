<template>
	<div>
		<nav >
			<v-app-bar 
				app
				class="elevation-1"
				height="58"
				color="white"
				>
				<v-app-bar-nav-icon hidden></v-app-bar-nav-icon>
				
				<v-toolbar-title class="d-flex">
					<router-link
						to="/"
						class="d-flex align-center text-decoration-none title black--text">
						<v-icon color="primary" large>mdi-home-city-outline</v-icon>
						&nbsp;<span>HS</span>
					</router-link>
				</v-toolbar-title>		
				
				<v-spacer></v-spacer>
				<v-btn color="secondary" dark v-if="isLoggedIn" outlined  rounded router @click="newProperty()">
				<v-icon left dark>mdi-home-plus-outline</v-icon>
				Nueva Propiedad
				</v-btn>
				<!--v-menu
					v-if="isLoggedIn"
						close-on-click>
						<template v-slot:activator="{ on }">
						<v-btn
							class="text-none"
							text
							v-on="on"
						>
							<v-avatar
							height="28"
							left
							width="28">
							<img v-if="getUser.image==null" :src="'../assets/img/sin-imagen.jpg'">
							<img v-if="getUser.image!=null" :src="getUser.image">

							</v-avatar>
							
							<v-icon right>mdi-chevron-down</v-icon>
						</v-btn>
					</template>
					<v-card>
					<v-list>
						<v-list-item>
							
							<v-list-item-content>
						<v-list-item-title>{{ getUser.first_name }} {{ getUser.last_name }}</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						
						<v-divider></v-divider>
						<v-list-item to="/profile">
							<v-list-item-icon>
								<v-icon>mdi-account</v-icon>
							</v-list-item-icon>
						<v-list-item-title>Mi Perfil</v-list-item-title>
						</v-list-item>
						<v-list-item to="/my-properties">
							<v-list-item-icon>
								<v-icon>mdi-home-group</v-icon>
							</v-list-item-icon>
						<v-list-item-title>Mis Propiedades</v-list-item-title>
						</v-list-item>
					
						<v-list-item to="/my-appointments">
							<v-list-item-icon>
								<v-icon>mdi-calendar</v-icon>
							</v-list-item-icon>
						<v-list-item-title>Mis Citas</v-list-item-title>
						</v-list-item>
						<v-list-item to="/">
							<v-list-item-icon>
								<v-icon>mdi-message</v-icon>
							</v-list-item-icon>
						<v-list-item-title>Mis Mensajes</v-list-item-title>
						</v-list-item>
						
					</v-list>
					<v-divider></v-divider>
					<v-list>
						<v-list-item @click="logout">
								<v-list-item-icon>
								<v-icon>mdi-exit-to-app</v-icon>
							</v-list-item-icon>
						<v-list-item-title>Cerrar sesión</v-list-item-title>
						</v-list-item>
					</v-list>
					</v-card>
				</v-menu-->
				<v-btn color="primary" dark v-if="!isLoggedIn" router to="/login">Iniciar Sesión</v-btn>
				<v-btn v-if="!isLoggedIn" icon @click.stop="drawer = !drawer">
					<v-icon>mdi-menu</v-icon>
				</v-btn>

				<v-btn
					class="text-none"
					text
					
					v-if="isLoggedIn"
					@click.stop="drawer = !drawer">
					<v-avatar
					height="28"
					left
					width="28">
					<img v-if="getUser.image==null" :src="'../assets/img/sin-imagen.jpg'">
					<img v-if="getUser.image!=null" :src="getUser.image">
					</v-avatar>
					<v-icon right>mdi-chevron-down</v-icon>
				</v-btn>
			
			</v-app-bar>
			<v-navigation-drawer v-model="drawer" app temporary right >
				<v-list>
					<v-list-item>
						<v-list-item-content v-if="isLoggedIn">
							<v-list-item-title>
							<span>Hola, {{ getUser.first_name }} {{ getUser.last_name }}</span>
							</v-list-item-title>
						</v-list-item-content>
						<v-list-item-content v-if="!isLoggedIn">
							<v-list-item-title>
							<span>Menu</span>
							</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon>
							<v-btn icon @click.stop="drawer = !drawer">
								<v-icon>mdi-close</v-icon>
							</v-btn>
						</v-list-item-icon>
					</v-list-item>
				</v-list>

				<v-divider></v-divider>

				<v-list v-if="!isLoggedIn" class="mx-5">
					<v-list-item router to="/">
						<v-list-item-icon>
								<v-icon>mdi-home</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>Inicio</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item router to="/search">
						<v-list-item-icon>
								<v-icon>mdi-home-search</v-icon>
							</v-list-item-icon>
						<v-list-item-content>
								
							<v-list-item-title>Buscar casa</v-list-item-title>
						</v-list-item-content>
					</v-list-item>			
				</v-list>

				<v-list v-if="isLoggedIn" class="mx-5">
					<v-list-item router to="/">
						<v-list-item-icon>
								<v-icon>mdi-home</v-icon>
							</v-list-item-icon>
						<v-list-item-content>
							
							<v-list-item-title>Inicio</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item router to="/search">
						<v-list-item-icon>
								<v-icon>mdi-home-search</v-icon>
							</v-list-item-icon>
						<v-list-item-content>
								
							<v-list-item-title>Buscar casa</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item to="/profile">
							<v-list-item-icon>
								<v-icon>mdi-account</v-icon>
							</v-list-item-icon>
						<v-list-item-title>Mi Perfil</v-list-item-title>
					</v-list-item>
					<v-list-item to="/my-properties">
							<v-list-item-icon>
								<v-icon>mdi-home-group</v-icon>
							</v-list-item-icon>
						<v-list-item-title>Mis Propiedades</v-list-item-title>
					</v-list-item>
					
					<v-list-item to="/my-appointments">
							<v-list-item-icon>
								<v-icon>mdi-calendar</v-icon>
							</v-list-item-icon>
						<v-list-item-title>Mis Citas</v-list-item-title>
					</v-list-item>
					<v-list-item to="/">
							<v-list-item-icon>
								<v-icon>mdi-message</v-icon>
							</v-list-item-icon>
						<v-list-item-title>Mis Mensajes</v-list-item-title>
					</v-list-item>
						
					
					<v-divider></v-divider>
					<v-list-item @click="logout">
						<v-list-item-icon>
								<v-icon>mdi-exit-to-app</v-icon>
							</v-list-item-icon>
						<v-list-item-title>Cerrar sesión</v-list-item-title>
					</v-list-item>
				</v-list>
				
			</v-navigation-drawer>
		</nav>

		<v-row justify="center">
			<v-dialog v-model="dialog_fullscreen" fullscreen hide-overlay transition="dialog-bottom-transition">
				<NewProperty v-on:closeDialog="closeDialog($event)"></NewProperty>
			</v-dialog>
		</v-row>
		
	</div>
</template>

<script>
import NewProperty from '../components/NewProperty.vue'
	export default {
		components: {
			NewProperty
		},
		data: () => ({
			drawer: false,
			dialog_fullscreen:false,
			vertical: false,
			altLabels: false,
			editable: true,
		
		
		}),
		computed : {
			isLoggedIn : function(){ 
			return this.$store.getters.isLoggedIn
			},
			getUser : function(){ 
			return this.$store.getters.getUser
			},
			/*getNotificationsByDoctor : function(){ 
			return this.$store.getters.getNotificationsByDoctor(this.getUser.id)
			},*/
		},
		
		methods: {
			closeDialog(){
				this.dialog_fullscreen = false
			},
			logout: function () {
			this.$store.dispatch('logout')
			.then(() => {
				this.$router.push('/login')
			})
			
			},
			profile(){
				this.$router.push('/profile') 

			},
			newProperty(){
				this.dialog_fullscreen = true
			}
		},
		mounted(){
		}
	}
</script>

