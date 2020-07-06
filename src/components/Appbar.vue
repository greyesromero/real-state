<template>
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
					&nbsp;<span>Real Estate</span>
				</router-link>
			</v-toolbar-title>		
			
			<v-spacer></v-spacer>
		
			<v-btn color="primary" dark v-if="!isLoggedIn" router to="/">Iniciar Sesión</v-btn>
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
					<v-list-item-content>
						<v-list-item-title>Inicio</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title>Rentar una casa</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item >
					<v-list-item-content>
						<v-list-item-title>Comprar una casa</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item >
					<v-list-item-content>
						<v-list-item-title>Vender una casa</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</nav>
</template>

<script>
	export default {
		data: () => ({
			drawer: false,
		
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
		
		},
		
	}
</script>

