<template>
<div>
	<nav >
		<v-app-bar 
			app
			class="elevation-1"
			height="58"
			color="white"
			>
			<v-app-bar-nav-icon @click="drawer = !drawer" v-if="isLoggedIn"></v-app-bar-nav-icon>
			
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
			<v-menu
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
					<v-list-item to="/">
						<v-list-item-icon>
							<v-icon>mdi-home-group</v-icon>
						</v-list-item-icon>
					<v-list-item-title>Mis Propiedades</v-list-item-title>
					</v-list-item>
				
					<v-list-item to="/">
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
			</v-menu>
			<v-btn color="primary" dark v-if="!isLoggedIn" router to="/login">Iniciar Sesión</v-btn>
			<v-btn icon @click.stop="drawer = !drawer">
				<v-icon>mdi-menu</v-icon>
			</v-btn>
		
		</v-app-bar>
		<v-navigation-drawer v-model="drawer" app temporary right >
			<v-list>
				<v-list-item>
					<v-list-item-content>
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

			<v-list class="mx-5">
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
		</v-navigation-drawer>
	</nav>

	<v-row justify="center">
    <v-dialog v-model="dialog_fullscreen" fullscreen hide-overlay transition="dialog-bottom-transition">
     
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog_fullscreen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Nueva Propiedad</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog_fullscreen = false">Guardar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
		<v-stepper v-model="e1" class="elevation-0">
      <v-stepper-header class="elevation-0">
        <v-stepper-step step="1" :complete="e1 > 1">Estado de la cita 1</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="e1 > 2">Segundo estado de la cita</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Tercer estado</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items >
        <v-stepper-content step="1">
          <v-card color="lighten-1" class="mb-5" height="200px" flat>
            <ul>
              <li>evento estado 1</li>
              <li>evento estado 1</li>
              <li>evento estado 1</li>
              <li>evento estado 1</li>
            </ul>
          </v-card>
          <v-container fluid grid-list-md fill-height>
									
							<v-layout row wrap align-end>
								<v-flex xs6 d-flex justify-start>
								
									<v-btn
									v-if="e1!=1"
									color="primary"
									@click="previewStep(e1)"
									>
									Anterior
									</v-btn>
								</v-flex>
								<v-flex xs6 d-flex justify-end>
									<v-btn
										color="primary"
										@click="nextStep(e1)"
										>
										Siguiente
										</v-btn>
									
								</v-flex>
								
							</v-layout>
						</v-container>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card color="lighten-1" class="mb-5" height="200px" flat>
            <ul>
              <li>evento estado 2</li>
              <li>evento estado 2</li>
              <li>evento estado 2</li>
              <li>evento estado 2</li>
            </ul>
          </v-card>
          <v-container fluid grid-list-md fill-height>
									
							<v-layout row wrap align-end>
								<v-flex xs6 d-flex justify-start>
								
									<v-btn
									v-if="e1!=1"
									color="primary"
									@click="previewStep(e1)"
									>
									Anterior
									</v-btn>
								</v-flex>
								<v-flex xs6 d-flex justify-end>
									<v-btn
										color="primary"
										@click="nextStep(e1)"
										>
										Siguiente
										</v-btn>
									
								</v-flex>
								
							</v-layout>
						</v-container>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card color="lighten-1" class="mb-5" height="200px" flat>
            <ul>
              <li>evento estado 3</li>
              <li>evento estado 3</li>
              <li>evento estado 3</li>
              <li>evento estado 3</li>
            </ul>
          </v-card>
          <v-container fluid grid-list-md fill-height>
									
							<v-layout row wrap align-end>
								<v-flex xs6 d-flex justify-start>
								
									<v-btn
									v-if="e1!=1"
									color="primary"
									@click="previewStep(e1)"
									>
									Anterior
									</v-btn>
								</v-flex>
								<v-flex xs6 d-flex justify-end>
									<v-btn
										color="primary"
										@click="nextStep(e1)"
										>
										Siguiente
										</v-btn>
									
								</v-flex>
								
							</v-layout>
						</v-container>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
	
      </v-card>
    </v-dialog>
  </v-row>
	
</div>
</template>

<script>

	export default {
		components: {
		},
		data: () => ({
			drawer: false,
			dialog_fullscreen:false,
			e1: 1,
			steps: 5,
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
			nextStep (n) {
        		if (n === this.steps) {
				this.e1 = 1
				} else {
				this.e1 = n + 1
				}
			},
			previewStep (n) {
        		if (n === this.steps) {
				this.e1 = 1
				} else {
				this.e1 = n - 1
				}
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
			console.log(this.getUser)
		}
	}
</script>

