<template>
	<div>	
		<v-divider></v-divider>
		<section v-if="!favorites"> 
			<v-container 
				v-if="loading"
				fluid 
				grid-list-md 
				class="px-2 ma-0" 
				:style="{width: $vuetify.breakpoint.lgAndUp ? '60%' : '100%'}">
				<div  class="center-container">
					<v-container fill-height>
						<v-layout align-center justify-center>
						<v-progress-circular
							:size="48"
							:width="4"
							color="primary lighten-1"
							indeterminate
						></v-progress-circular>
						</v-layout>
					</v-container>
				</div>
			</v-container>
			<v-container 
				v-if="!loading"
				fluid 
				grid-list-md 
				class="px-2 ma-0" 
				:style="{width: $vuetify.breakpoint.lgAndUp ? '60%' : '100%'}">
			
				<div v-if="errored" class="center-container">
					<v-container fill-height>
					<v-layout column align-center justify-center>
						<h1 class="display-2">Conéctate a Internet</h1>
						<p class="body-1 grey--text">Comprueba tu conexión y vuelve a intentarlo</p>
						<v-btn
						color="primary"
						outlined
						@click="fetchProperties"
						>Reintentar</v-btn>
					</v-layout>
					</v-container>
				</div>
				<div>
					<v-container fluid grid-list-md fill-height>
						
						<v-layout row wrap align-end>
							
								<v-flex xs12 md12 d-flex justify-end>
								<v-switch color="secondary" class="my-1" v-model="favorites" @change="infoWinOpen = false" label="Mis Favoritos" ></v-switch>

								<v-btn text v-on:click="dialog=true" style="float:right;" color="secondary">
									<v-icon >mdi-cog</v-icon>	FILTROS
								</v-btn>
							</v-flex>
							<v-flex xs12 md12 d-flex justify-start>
							<span class="body-2">{{visiblePages.length}} propiedades</span>
								</v-flex>
							<v-flex xs12 md12 d-flex justify-start>
								
								<h3>Propiedades en Antigua Guatemala</h3>
							</v-flex>
							
						</v-layout>
					</v-container>
					<v-dialog v-model="dialog" persistent max-width="600px">
						<v-card>
							<v-card-title>
							<span class="headline">Filtros de Búsqueda</span>
							<v-spacer></v-spacer>
							<v-btn icon v-on:click="dialog=false">
								<v-icon>mdi-close</v-icon>
							</v-btn>
							

							</v-card-title>
							<v-card-text>
								<v-form v-model="valid" :lazy-validation="lazy"  ref="form">
									<v-toolbar class="mb-3" style="background-color:transparent!important;box-shadow:none!important;">
										<v-subheader class="title" style="padding-left:0px!important;">Ubicación</v-subheader>
											
										<v-spacer></v-spacer>
									<v-switch color="secondary" class="mt-5" label="Trato directo con dueño"></v-switch>

									</v-toolbar>
									<v-container fluid>
										<v-flex xs12>
											<v-text-field
											prepend-inner-icon="mdi-map-marker"
											flat
											label="Busca por departamento, municipio, etc"
											hide-details
											solo
											outlined
											rounded
											color="secondary"
											v-model="city"
											></v-text-field>
										</v-flex>
									</v-container>
									<v-toolbar class="mb-3" style="background-color:transparent!important;box-shadow:none!important;">
										<v-subheader class="title" style="padding-left:0px!important;">Tipo</v-subheader>
											
										<v-spacer></v-spacer>
										 <v-row justify="space-around" class="mt-8">
												<v-checkbox class="mx-2" label="Renta" color="secondary"></v-checkbox>
												<v-checkbox class="mx-2" label="Venta" color="secondary"></v-checkbox>
											</v-row>

									</v-toolbar>
								
									<v-divider class="mx-5 mb-5"></v-divider>
									<v-subheader class="title">Precio</v-subheader>
									<v-container fluid>
										<v-layout>
												Q{{ range[0] }} 
											<v-flex>
											<v-range-slider
											v-model="range"
											:max="max"
											:min="min"
											height="50"
											thumb-label
											color="secondary"
											>
											</v-range-slider>
											</v-flex>
											Q{{ range[1] }}
										</v-layout>
									</v-container>
									<!--v-divider class="mx-5 mb-5"></v-divider>
									<v-subheader class="title">Habitaciones y baños</v-subheader>
									<v-container fluid grid-list-md fill-height px-5>
									
										<v-layout row wrap>
											<v-flex xs6 md10 d-flex justify-start>
												<span>Habitaciones</span>
											</v-flex>
											<v-flex xs6 md2 d-flex justify-end>
												<v-text-field 
												v-model.number="foo" 
												append-outer-icon="mdi-plus-circle-outline" 
												@click:append-outer="increment" 
												prepend-icon="mdi-minus-circle-outline" 
												@click:prepend="decrement"
												color="secondary">
												</v-text-field>
											</v-flex>
											<v-flex xs6 md10 d-flex justify-start>
												<span>Baños</span>
											</v-flex>
											<v-flex xs6 md2 d-flex justify-end>
												<v-text-field 
												color="secondary"
												v-model.number="foo2" 
												append-outer-icon="mdi-plus-circle-outline" 
												@click:append-outer="increment" 
												prepend-icon="mdi-minus-circle-outline" 
												@click:prepend="decrement">
												</v-text-field>
											</v-flex>
										</v-layout>
									</v-container-->
									<v-divider class="mx-5 mb-5"></v-divider>
									<v-subheader class="title">Comodidades</v-subheader>
								
									<v-container fluid>
											<v-row>
													<v-col cols="12" sm="4" md="4">
														<v-checkbox
														v-model="ex4"
														label="A/C"
														color="primary"
														append-icon="mdi-air-conditioner"
														
														hide-details
														></v-checkbox>
														<v-checkbox
														v-model="ex4"
														label="Secadora"
														color="primary"
														append-icon="mdi-tumble-dryer"											hide-details
														></v-checkbox>
													</v-col>
													<v-col cols="12" sm="4" md="4">
														<v-checkbox
														v-model="ex4"
														label="Pet Friendly"
														color="primary"
														hide-details
														append-icon="mdi-paw"
														></v-checkbox>
														<v-checkbox
														v-model="ex4"
														label="Extracción Basura"
														color="primary"
														append-icon="mdi-delete-empty"
														hide-details
														></v-checkbox>
													</v-col>
													<v-col cols="12" sm="4" md="4">
														<v-checkbox
														v-model="ex4"
														label="Calefacción"
														color="primary"
															append-icon="mdi-hvac"
														
														hide-details
														></v-checkbox>
														<v-checkbox
														v-model="ex4"
														label="Lavadora"
														color="primary"
														hide-details
															append-icon="mdi-dishwasher"
														></v-checkbox>
													</v-col>
											</v-row>
									</v-container>
									<v-divider class="mx-5"></v-divider>
								</v-form>
							</v-card-text>
							<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="primary darken-1" text @click="resetForm()">Quitar todos</v-btn>
							<v-btn color="secondary darken-1" text @click="dialog = false">Aplicar</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-layout row wrap  justify="space-around" align-center align-content-center> 
						<v-flex 
							xs12
							md6
							:key="property.id"
							v-for="(property,i) in visiblePages">
							<v-card
								:loading="loading"
								:class="[$vuetify.breakpoint.smAndDown ? 'mx-1 my-1' : 'mx-1 my-1']"
								
								style="cursor:pointer;"
								>
									
									<v-carousel hide-delimiters
									class="white--text align-end"
									height="175px">
										<v-carousel-item
										v-for="(item,i) in property.images"
										:key="i"
										:src="item.src"
										
										gradient="rgba(0,0,0,0.1),rgba(0,0,0,0.2),rgba(0,0,0,0.25),rgba(0,0,0,0.3),rgba(0,0,0,0.9)">
					
											<!--v-container fluid grid-list-md fill-height>
												<v-layout row wrap>
													<v-flex xs12 d-flex justify-start>
															<v-chip
															class="ma-2"
															label
															color="secondary"
															text-color="white"
															>
															RENT
														</v-chip>
														<v-chip
															class="ma-2"
															color="primary"
															label
															text-color="white"
															>
															NEW
														</v-chip>
													</v-flex>
													
												</v-layout>
												
												
												<v-layout row wrap align-end>
													
													<v-flex xs12 d-flex justify-end>
														<span class="text-truncante text-right title">Q1000</span>
														<v-btn icon color="white" class="mx-3">
														<v-icon>mdi-share-variant</v-icon>
														</v-btn>
														<v-btn icon color="white">
														<v-icon>mdi-heart-outline</v-icon>
														</v-btn> 
													</v-flex>
												</v-layout>
											</v-container-->
											<v-layout column justify-space-between fill-height px-5 py-5>
												<v-layout row wrap>
													<v-flex xs12 d-flex justify-start>
															<v-chip
															class="mx-1"
															label
															color="secondary"
															text-color="white"
															>
															RENT
														</v-chip>
														<v-chip
															class="mx-1"
															color="primary"
															label
															text-color="white"
															>
															NEW
														</v-chip>
													</v-flex>
													
												</v-layout>
												<v-layout row wrap align-end>
													
													<v-flex xs12 d-flex justify-end>
														<span class="text-truncante text-right title">Q1000</span>
														
													</v-flex>
												</v-layout>
											</v-layout>
										</v-carousel-item>
									</v-carousel>
						
									<v-card-title>
										<div class="text-truncate">{{property.title}}</div>
									</v-card-title>
									<v-card-text>
										2 cuartos<span class="font-weight-bold" aria-hidden="true"> ·</span>
										1 baño<span class="font-weight-bold" aria-hidden="true"> ·</span>
										1000 mts<sup>2</sup>
										<div>
											<v-chip-group
											
											column
											>
												<v-chip   small>
													<v-icon left small>mdi-wifi</v-icon>
												WIFI</v-chip>
												<v-chip   small>
													<v-icon left small>mdi-paw</v-icon>
												Mascotas</v-chip>
												<v-chip   small>
													<v-icon left small>mdi-spray-bottle</v-icon>
												Limpieza</v-chip>
												<v-chip   small>
													<v-icon left small>mdi-air-conditioner</v-icon>
												A/C</v-chip>
											</v-chip-group>
										</div>
										
									</v-card-text>
						
									<v-divider class="mx-4"></v-divider>
									<v-card-actions>
										<v-btn
										color="secondary"
										text
										router to = "/detail"
										>
										MÁS INFORMACIÓN
										</v-btn>
										<v-spacer></v-spacer>
										<v-btn icon>
											<v-icon>mdi-heart</v-icon>
										</v-btn>
										<v-btn icon>
											<v-icon>mdi-share-variant</v-icon>
										</v-btn>
									</v-card-actions>
							</v-card>
						</v-flex>
						<v-flex xs12>
							<v-pagination
								v-model="page"
								:length="Math.ceil(properties.length/perPage)"
							></v-pagination>
						</v-flex>
					</v-layout>
				</div>
        	</v-container>
			<div class="search-map-container grey lighten-2 hidden-sm-and-down">
				<gmap-map :center="center" :zoom="12" class="w-100 h-100">
					<gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
							<v-card
								:loading="loading"
								flat
								:class="[$vuetify.breakpoint.smAndDown ? 'mx-0 my-0' : 'mx-0 my-0']"
								:style="[{'max-width': $vuetify.breakpoint.smAndUp ? '250px' : '125px'}]"
								>
								
								<v-img
										class="white--text"
										height="150px"
										
										:src="items[1].src"
										gradient="rgba(0,0,0,0.1),rgba(0,0,0,0.2),rgba(0,0,0,0.25),rgba(0,0,0,0.3),rgba(0,0,0,0.9)">
						
												<!--v-container fluid grid-list-md fill-height>
													<v-layout row wrap>
														<v-flex xs12 d-flex justify-start>
																<v-chip
																class="ma-2"
																label
																color="secondary"
																text-color="white"
																x-small
																>
																RENT
															</v-chip>
															<v-chip
																class="ma-2"
																color="primary"
																label
																text-color="white"
																x-small
																>
																NEW
															</v-chip>
														</v-flex>
													</v-layout>
													<v-layout row wrap align-end>
														<v-flex xs12 d-flex justify-end>
															<span class="text-truncante text-right title">Q1000</span>
															 <v-btn icon color="white" class="mx-3">
															<v-icon>mdi-share-variant</v-icon>
															</v-btn>
															<v-btn icon color="white">
															<v-icon>mdi-heart-outline</v-icon>
															</v-btn> 
														</v-flex>
													</v-layout>
												</v-container-->
												<v-layout column justify-space-between fill-height px-5 py-5>
												<v-layout row wrap>
													<v-flex xs12 d-flex justify-start>
															<v-chip
															class="mx-1"
															label
															color="secondary"
															text-color="white"
															small
															>
															RENT
														</v-chip>
														<v-chip
															class="mx-1"
															color="primary"
															label
															text-color="white"
															small
															>
															NEW
														</v-chip>
													</v-flex>
												
													
												</v-layout>
												<v-layout row wrap align-end>
													
													<v-flex xs12 d-flex justify-end>
														<span class="text-truncante text-right title">Q1000</span>
														
													</v-flex>
												</v-layout>
											</v-layout>
										</v-img>
								<v-card-title class="justify-left">
									<span class="title">{{ selected_title }}</span>
									
								</v-card-title>
								<v-card-text>
											
											2 cuartos<span class="font-weight-bold" aria-hidden="true"> ·</span>
											1 baño<span class="font-weight-bold" aria-hidden="true"> ·</span>
											1000 mts<sup>2</sup>
											
										</v-card-text>
								
								<v-divider class="mx-4"></v-divider>
									<v-card-actions>
										<v-btn
										color="secondary"
										text
										router to = "/detail"
										>
										MÁS INFORMACIÓN
										</v-btn>
										<v-spacer></v-spacer>
										<v-btn icon>
											<v-icon>mdi-heart</v-icon>
										</v-btn>
										<v-btn icon>
											<v-icon>mdi-share-variant</v-icon>
										</v-btn>
									</v-card-actions>
							</v-card>
						</gmap-info-window>

					<gmap-marker :key="i" v-for="(m,i) in visiblePages" :position="m.position" :clickable="true" @click="toggleInfoWindow(m,i)"></gmap-marker>
				</gmap-map>
			</div>
      </section>
	  <section v-if="favorites"> 
			<v-container 
				v-if="loading"
				fluid 
				grid-list-md 
				class="px-2 ma-0" 
				:style="{width: $vuetify.breakpoint.lgAndUp ? '60%' : '100%'}">
				<div  class="center-container">
					<v-container fill-height>
						<v-layout align-center justify-center>
						<v-progress-circular
							:size="48"
							:width="4"
							color="primary lighten-1"
							indeterminate
						></v-progress-circular>
						</v-layout>
					</v-container>
				</div>
			</v-container>
			<v-container 
				v-if="!loading"
				fluid 
				grid-list-md 
				class="px-2 ma-0" 
				:style="{width: $vuetify.breakpoint.lgAndUp ? '60%' : '100%'}">
			
				<div v-if="errored" class="center-container">
					<v-container fill-height>
					<v-layout column align-center justify-center>
						<h1 class="display-2">Conéctate a Internet</h1>
						<p class="body-1 grey--text">Comprueba tu conexión y vuelve a intentarlo</p>
						<v-btn
						color="primary"
						outlined
						@click="fetchProperties"
						>Reintentar</v-btn>
					</v-layout>
					</v-container>
				</div>
				<div>
					<v-container fluid grid-list-md fill-height>
						
						<v-layout row wrap align-end>
							<v-flex xs6 md6 d-flex justify-start>
							<span class="body-2">{{favorites_properties.length}} propiedades</span>
								</v-flex>
								<v-flex xs6 md6 d-flex justify-end>
								<v-switch color="secondary" class="my-1" v-model="favorites" @change="infoWinOpen = false" label="Mis Favoritos" ></v-switch>

								<v-btn text v-on:click="dialog=true" style="float:right;" color="secondary">
									<v-icon >mdi-cog</v-icon>	FILTROS
								</v-btn>
							</v-flex>
							<v-flex xs12 md12 d-flex justify-start>
								
								<h3>Propiedades en Antigua Guatemala</h3>
							</v-flex>
							
						</v-layout>
					</v-container>
					<v-dialog v-model="dialog" persistent max-width="600px">
						<v-card>
							<v-card-title>
							<span class="headline">Filtros de Búsqueda</span>
							<v-spacer></v-spacer>
							<v-btn icon v-on:click="dialog=false">
								<v-icon>mdi-close</v-icon>
							</v-btn>
							

							</v-card-title>
							<v-card-text>
								<v-form v-model="valid" :lazy-validation="lazy"  ref="form">
									
									<v-toolbar class="mb-3" style="background-color:transparent!important;box-shadow:none!important;">
										<v-subheader class="title"  style="padding-left:0px!important;">Ubicación</v-subheader>
											
										<v-spacer></v-spacer>
									<v-switch color="secondary" class="mt-5" label="Trato directo con dueño"></v-switch>

									</v-toolbar>
									<v-container fluid>
										<v-flex xs12>
											<v-text-field
											prepend-inner-icon="mdi-map-marker"
											flat
											label="Busca por departamento, municipio, etc"
											hide-details
											solo
											outlined
											rounded
											color="secondary"
											v-model="city"
											></v-text-field>
										</v-flex>
									</v-container>
											<v-toolbar class="mb-3" style="background-color:transparent!important;box-shadow:none!important;">
										<v-subheader class="title" style="padding-left:0px!important;">Tipo</v-subheader>
											
										<v-spacer></v-spacer>
										 <v-row justify="space-around" class="mt-8">
												<v-checkbox class="mx-2" label="Renta" color="secondary"></v-checkbox>
												<v-checkbox class="mx-2" label="Venta" color="secondary"></v-checkbox>
											</v-row>

									</v-toolbar>
									<v-divider class="mx-5 mb-5"></v-divider>
									<v-subheader class="title">Precio</v-subheader>
									<v-container fluid>
										<v-layout>
												Q{{ range[0] }} 
											<v-flex>
											<v-range-slider
											v-model="range"
											:max="max"
											:min="min"
											height="50"
											thumb-label
											color="secondary"
											>
											</v-range-slider>
											</v-flex>
											Q{{ range[1] }}
										</v-layout>
									</v-container>
									<!--v-divider class="mx-5 mb-5"></v-divider>
									<v-subheader class="title">Habitaciones y baños</v-subheader>
									<v-container fluid grid-list-md fill-height px-5>
									
										<v-layout row wrap>
											<v-flex xs6 md10 d-flex justify-start>
												<span>Habitaciones</span>
											</v-flex>
											<v-flex xs6 md2 d-flex justify-end>
												<v-text-field 
												v-model.number="foo" 
												append-outer-icon="mdi-plus-circle-outline" 
												@click:append-outer="increment" 
												prepend-icon="mdi-minus-circle-outline" 
												@click:prepend="decrement"
												color="secondary">
												</v-text-field>
											</v-flex>
											<v-flex xs6 md10 d-flex justify-start>
												<span>Baños</span>
											</v-flex>
											<v-flex xs6 md2 d-flex justify-end>
												<v-text-field 
												color="secondary"
												v-model.number="foo2" 
												append-outer-icon="mdi-plus-circle-outline" 
												@click:append-outer="increment" 
												prepend-icon="mdi-minus-circle-outline" 
												@click:prepend="decrement">
												</v-text-field>
											</v-flex>
										</v-layout>
									</v-container-->
									<v-divider class="mx-5 mb-5"></v-divider>
									<v-subheader class="title">Comodidades</v-subheader>
								
									<v-container fluid>
											<v-row>
													<v-col cols="12" sm="4" md="4">
														<v-checkbox
														v-model="ex4"
														label="A/C"
														color="primary"
														append-icon="mdi-air-conditioner"
														
														hide-details
														></v-checkbox>
														<v-checkbox
														v-model="ex4"
														label="Secadora"
														color="primary"
														append-icon="mdi-tumble-dryer"											hide-details
														></v-checkbox>
													</v-col>
													<v-col cols="12" sm="4" md="4">
														<v-checkbox
														v-model="ex4"
														label="Pet Friendly"
														color="primary"
														hide-details
														append-icon="mdi-paw"
														></v-checkbox>
														<v-checkbox
														v-model="ex4"
														label="Extracción Basura"
														color="primary"
														append-icon="mdi-delete-empty"
														hide-details
														></v-checkbox>
													</v-col>
													<v-col cols="12" sm="4" md="4">
														<v-checkbox
														v-model="ex4"
														label="Calefacción"
														color="primary"
															append-icon="mdi-hvac"
														
														hide-details
														></v-checkbox>
														<v-checkbox
														v-model="ex4"
														label="Lavadora"
														color="primary"
														hide-details
															append-icon="mdi-dishwasher"
														></v-checkbox>
													</v-col>
											</v-row>

									</v-container>
									<v-divider class="mx-5"></v-divider>
								</v-form>
							</v-card-text>
							<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="primary darken-1" text @click="resetForm()">Quitar todos</v-btn>
							<v-btn color="secondary darken-1" text @click="dialog = false">Aplicar</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-layout row wrap  justify="space-around" align-center align-content-center> 
						<v-flex 
							xs12
							md6
							:key="property.id"
							v-for="(property,i) in favorites_properties">
							<v-card
								:loading="loading"
								:class="[$vuetify.breakpoint.smAndDown ? 'mx-1 my-1' : 'mx-1 my-1']"
								
								style="cursor:pointer;"
								>
									
									<v-carousel hide-delimiters
									class="white--text align-end"
									height="175px">
										<v-carousel-item
										v-for="(item,i) in property.images"
										:key="i"
										:src="item.src"
										
										gradient="rgba(0,0,0,0.1),rgba(0,0,0,0.2),rgba(0,0,0,0.25),rgba(0,0,0,0.3),rgba(0,0,0,0.9)">
					
											<v-layout column justify-space-between fill-height px-5 py-5>
												<v-layout row wrap>
													<v-flex xs12 d-flex justify-start>
															<v-chip
															class="mx-1"
															label
															color="secondary"
															text-color="white"
															>
															RENT
														</v-chip>
														<v-chip
															class="mx-1"
															color="primary"
															label
															text-color="white"
															>
															NEW
														</v-chip>
													</v-flex>
													
													
												</v-layout>
												<v-layout row wrap align-end>
													
													<v-flex xs12 d-flex justify-end>
														<span class="text-truncante text-right title">Q1000</span>
														
													</v-flex>
												</v-layout>
											</v-layout>
										</v-carousel-item>
									</v-carousel>
						
									<v-card-title>
										<div class="text-truncate">{{property.title}}</div>
									</v-card-title>
									<v-card-text>
										2 cuartos<span class="font-weight-bold" aria-hidden="true"> ·</span>
										1 baño<span class="font-weight-bold" aria-hidden="true"> ·</span>
										1000 mts<sup>2</sup>
										<div>
											<v-chip-group
											
											column
											>
												<v-chip   small>
														<v-icon left small>mdi-wifi</v-icon>
													WIFI</v-chip>
													<v-chip   small>
														<v-icon left small>mdi-paw</v-icon>
													Mascotas</v-chip>
													<v-chip   small>
														<v-icon left small>mdi-spray-bottle</v-icon>
													Limpieza</v-chip>
													<v-chip   small>
														<v-icon left small>mdi-air-conditioner</v-icon>
													A/C</v-chip>
											</v-chip-group>
										</div>
										
									</v-card-text>
						
									<v-divider class="mx-4"></v-divider>
									<v-card-actions>
										<v-btn
										color="secondary"
										text
										router to = "/detail"
										>
										MÁS INFORMACIÓN
										</v-btn>
										<v-spacer></v-spacer>
										<v-btn icon>
											<v-icon>mdi-heart</v-icon>
										</v-btn>
										<v-btn icon>
											<v-icon>mdi-share-variant</v-icon>
										</v-btn>
									</v-card-actions>
							</v-card>
						</v-flex>
						<v-flex xs12>
							<v-pagination
								v-model="page"
								:length="Math.ceil(properties.length/perPage)"
							></v-pagination>
						</v-flex>
					</v-layout>
				</div>
        	</v-container>
			<div class="search-map-container grey lighten-2 hidden-sm-and-down">
				<gmap-map :center="center" :zoom="12" class="w-100 h-100">
					<gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
							<v-card
								:loading="loading"
								flat
								:class="[$vuetify.breakpoint.smAndDown ? 'mx-0 my-0' : 'mx-0 my-0']"
								:style="[{'max-width': $vuetify.breakpoint.smAndUp ? '250px' : '125px'}]"
								>
								
								<v-img
										class="white--text"
										height="150px"
										
										:src="items[1].src"
										gradient="rgba(0,0,0,0.1),rgba(0,0,0,0.2),rgba(0,0,0,0.25),rgba(0,0,0,0.3),rgba(0,0,0,0.9)">
						
												<v-layout column justify-space-between fill-height px-5 py-5>
												<v-layout row wrap>
													<v-flex xs12 d-flex justify-start>
															<v-chip
															class="mx-1"
															label
															color="secondary"
															text-color="white"
															small
															>
															RENT
														</v-chip>
														<v-chip
															class="mx-1"
															color="primary"
															label
															text-color="white"
															small
															>
															NEW
														</v-chip>
													</v-flex>
													
													
												</v-layout>
												<v-layout row wrap align-end>
													
													<v-flex xs12 d-flex justify-end>
														<span class="text-truncante text-right title">Q1000</span>
														
													</v-flex>
												</v-layout>
											</v-layout>
										</v-img>
								<v-card-title class="justify-left">
									<span class="title">{{ selected_title }}</span>
									
								</v-card-title>
								<v-card-text>
											
											2 cuartos<span class="font-weight-bold" aria-hidden="true"> ·</span>
											1 baño<span class="font-weight-bold" aria-hidden="true"> ·</span>
											1000 mts<sup>2</sup>
											
										</v-card-text>
								
								<v-divider class="mx-4"></v-divider>
										<v-card-actions>
											<v-btn
											color="secondary"
											text
											router to = "/detail"
											>
											MÁS INFORMACIÓN
											</v-btn>
											<v-spacer></v-spacer>
											<v-btn icon>
												<v-icon>mdi-heart</v-icon>
											</v-btn>
											<v-btn icon>
												<v-icon>mdi-share-variant</v-icon>
											</v-btn>
										</v-card-actions>
							</v-card>
						</gmap-info-window>

					<gmap-marker :key="i" v-for="(m,i) in favorites_properties" :position="m.position" :clickable="true" @click="toggleInfoWindow(m,i)"></gmap-marker>
				</gmap-map>
			</div>
      </section>
   </div>
</template>

<script>
export default {
  name: 'search-page',
  data() {
    return {
		ex4: ['red', 'indigo', 'orange', 'primary', 'secondary', 'success', 'info', 'warning', 'error', 'red darken-3', 'indigo darken-3', 'orange darken-3'],
		page: 1,
		perPage: 10,
		favorites: null,
		range: [200, 5000],
		max: 9000,
		min: 100,
		dialog: false,
		loading: false,
		errored: false,
		selected_title: null,
		favorites_properties: [{
				id: 1,
				title: 'Villas Antigua',
				description: '',
				image: '../assets/img/house5.jpg',
				rooms: 1,
				bathrooms: 2,
				mts: 1200,
				position: {
					lat: 14.54665,
					lng:  -90.6247106
				},
				images:[
					{
						src: '../assets/img/house5.jpg',
					},
					{
						src: '../assets/img/house2.jpg',
					},
					{
						src: '../assets/img/house4.jpg',
					},
				]

			},
			{
				id: 2,
				title: 'Deluxe Panajachel',
				description: '',
				image: '../assets/img/house5.jpg',
				rooms: 1,
				bathrooms: 2,
				mts: 1200,
				position: {
					lat:  14.6038435915842,
					lng: -90.52177129981
				},
				images:[
					{
						src: '../assets/img/house5.jpg',
					},
					{
						src: '../assets/img/house2.jpg',
					},
					{
						src: '../assets/img/house4.jpg',
					},
				]

			},], 

		
		properties: [{
				id: 1,
				title: 'Hermosa casa en Antigua G',
				description: '',
				image: '../assets/img/house5.jpg',
				rooms: 1,
				bathrooms: 2,
				mts: 1200,
				position: {
					lat: 14.6319938,
					lng: -90.5167931
				},
				images:[
					{
						src: '../assets/img/house5.jpg',
					},
					{
						src: '../assets/img/house2.jpg',
					},
					{
						src: '../assets/img/house4.jpg',
					},
				]

			},
			{
				id: 2,
				title: 'Villas Antigua',
				description: '',
				image: '../assets/img/house5.jpg',
				rooms: 1,
				bathrooms: 2,
				mts: 1200,
				position: {
					lat: 14.54665,
					lng:  -90.6247106
				},
				images:[
					{
						src: '../assets/img/house5.jpg',
					},
					{
						src: '../assets/img/house2.jpg',
					},
					{
						src: '../assets/img/house4.jpg',
					},
				]

			},
			{
				id: 3,
				title: 'Deluxe Panajachel',
				description: '',
				image: '../assets/img/house5.jpg',
				rooms: 1,
				bathrooms: 2,
				mts: 1200,
				position: {
					lat:  14.6038435915842,
					lng: -90.52177129981
				},
				images:[
					{
						src: '../assets/img/house5.jpg',
					},
					{
						src: '../assets/img/house2.jpg',
					},
					{
						src: '../assets/img/house4.jpg',
					},
				]

			},
			{
				id: 4,
				title: 'Bella Vista',
				description: '',
				image: '../assets/img/house5.jpg',
				rooms: 1,
				bathrooms: 2,
				mts: 1200,
				position: {
					lat:  14.6002577,
					lng: -90.520534
				},
				images:[
					{
						src: '../assets/img/house5.jpg',
					},
					{
						src: '../assets/img/house2.jpg',
					},
					{
						src: '../assets/img/house4.jpg',
					},
				]

			}],
		map: null,
		marker: null,
		infowindow: null,
		center: {
			lat: 14.6319938,
			lng: -90.5167931
		},
		infoContent: '',
		infoWindowPos: null,
		infoWinOpen: false,
		currentMidx: null,
		infoOptions: {
			pixelOffset: {
			width: 0,
			height: -35
			}
		},
        markers: [{
				position: {
				lat: 14.6319938,
				lng: -90.5167931
				},
				infoText: 'Marker 1'
			}, {
				position: {
				lat: 14.54665,
				lng:  -90.6247106
				},
				infoText: 'Marker 2'
			}, {
				position: {
				lat: 14.5996762859023,
				lng: -90.519997558197
				},
				infoText: 'Marker 3'
			},
			{
				position: {
				lat:  14.6038435915842,
				lng: -90.52177129981
				},
				infoText: 'Marker 4'
			},
			{
				position: {
				lat:  14.6002577,
				lng: -90.520534
				},
				infoText: 'Marker 5'
		}],
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
		],
		foo: 0,
		foo2: 0,
		city: null,
		valid: true,
		lazy:false,
		}
	},
  	computed: {
		getUser : function(){ 
			return this.$store.getters.getUser
		},
		visiblePages () {
			return this.properties.slice((this.page - 1)* this.perPage, this.page* this.perPage)
		}
	},
	mounted() {
		this.fetchProperties()
	},
	methods: {
		increment () {
			this.foo = parseInt(this.foo,10) + 1
		},
		decrement () {
			this.foo = parseInt(this.foo,10) - 1
		},
		toggleInfoWindow: function(marker, idx) {
            this.infoWindowPos = marker.position;
			this.infoContent = marker.infoText;
			this.selected_title = marker.title

            //check if its the same marker that was selected if yes toggle
            if (this.currentMidx == idx) {
              this.infoWinOpen = !this.infoWinOpen;
            }
            //if different marker set infowindow to open and reset current marker index
            else {
              this.infoWinOpen = true;
              this.currentMidx = idx;

            }
          },
		resetForm() {
			this.$refs.form.reset()
			this.range = [200, 5000]
			this.foo = 0
			this.foo2 = 0
			this.city = null
		},
		showMarker({position, i}) {
			this.center = position
			this.infoWindowPos = position;
			this.infoContent ='Hi';
			this.infoWinOpen = true;
			this.currentMidx = i;

			/*this.map.panTo(position);
			this.marker.setPosition(position);
			this.marker.title = name;
			this.infowindowinfowindow = new google.maps.InfoWindow({ // Create a new InfoWindow
				content:"This is <strong>Megamall Penang</strong>, <em>one</em> of shopping centres that has a cinema!" // HTML contents of the InfoWindow
			});
			this.map.addListener(this.marker, 'click', function() { // Add a Click Listener to our marker
				this.infowindow.open(this.map,this.marker); // Open our InfoWindow
			});*/
			
		},
		fetchProperties() {
			if (this.errored) this.errored = false

		/*	this.loading = true
			this.properties.push({
				id: 1,
				title: 'Hermosa casa en Antigua G',
				description: '',
				image: '../assets/img/house5.jpg',
				rooms: 1,
				bathrooms: 2,
				mts: 1200,
				position: {
					lat: 14.6319938,
					lng: -90.5167931
				},
				images:[
					{
						src: '../assets/img/house5.jpg',
					},
					{
						src: '../assets/img/house2.jpg',
					},
					{
						src: '../assets/img/house4.jpg',
					},
				]

			})
			fetch('https://tuyo-api.herokuapp.com/api/property/')
			.then(response => response.json())
			.then(properties => {
				this.properties = properties.map(property => ({
				...property,
				position: {
					lat: property.latitude,
					lng: property.longitude
				},
				rooms: property.areas.filter(area => area.type === 'Cuarto'),
				bathrooms: property.areas.filter(area => area.type === 'Baño'),
				mts: property.areas.reduce((prev, curr) => prev + curr.area, 0)
				}))
				
			})
			.catch(err => {
				console.log({err})
				this.errored = true
			})
			.finally(() => this.loading = false)*/
		}
  	}
}
</script>
<style>
.gm-style .gm-style-iw-d{
	overflow: hidden!important;
	
}

.gm-style .gm-style-iw-c{
padding: 0px!important;
}

.gm-ui-hover-effect{
	display: none!important;
}
</style>
