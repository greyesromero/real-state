<template>
	<div>	
    
	
    <v-divider></v-divider>
      <section > 
        
        <v-container 
          fluid 
          grid-list-md 
          class="px-2 ma-0" 
          :style="{width: $vuetify.breakpoint.lgAndUp ? '50%' : '100%'}">
          <div v-if="loading" class="center-container">
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
          <div v-else>
			       
          <v-layout row wrap px-5>
            <v-flex xs12 mt-5>
              <!-- call method searchName after leaving textfield-->
                <v-text-field
			  prepend-inner-icon="mdi-map-marker"
				flat
				label="Busca por departamento, municipio, etc"
				hide-details
				solo
				outlined
				rounded
				></v-text-field>
            </v-flex>
            <v-flex xs6 my-5 mx-5>
              <!-- call method searchDept after leaving textfield-->
           <v-row>
    
        <v-range-slider
		
            v-model="range"
            :max="max"
            :min="min"
            hide-details
			label="Precio"
            class="align-center"
          >
            <template v-slot:prepend>
              <v-text-field
                :value="range[0]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
                @change="$set(range, 0, $event)"
              ></v-text-field>
            </template>
            <template v-slot:append>
              <v-text-field
                :value="range[1]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
                @change="$set(range, 1, $event)"
              ></v-text-field>
            </template>
          </v-range-slider>
    </v-row>
            </v-flex>
            <v-flex xs5>
              <!-- call method searchCity after leaving textfield-->
              
          <v-select
            
            :items="items_select"
            attach
            chips
            label="Filtros"
            multiple
			hide-details
          ></v-select>
		    	
            </v-flex>
			<!--v-flex xs12>
				<v-row justify="space-around">
                      <v-checkbox
						class="mx-1"
				v-model="value_select"
				label="primary"
				color="primary"
				value="foo"
				hide-details
				></v-checkbox>
				<v-checkbox
				class="mx-1"
				v-model="value_select"
				label="primary"
				color="primary"
				value="bar"
				hide-details
				
				></v-checkbox>
				<v-checkbox
				class="mx-1"
				v-model="value_select"
				label="primary"
				color="primary"
				value="fizz"
				hide-details
				
				></v-checkbox>
				</v-row>
				
			 </v-flex-->
          </v-layout>
            <v-layout row wrap mt-5  justify="space-around" align-center align-content-center> 
              <v-flex 
                xs6
                :key="property.id"
                v-for="(property,i) in properties">
                 <v-card
							:loading="loading"
							
							:class="[$vuetify.breakpoint.smAndDown ? 'mx-1 my-1' : 'mx-1 my-1']"
					  @mouseover.capture="showMarker(property,i)"
            style="cursor:pointer;"
							>
							<v-img
							 class="white--text v-sheet"
                    gradient="rgba(0,0,0,0.1),rgba(0,0,0,0.2),rgba(0,0,0,0.25),rgba(0,0,0,0.3),rgba(0,0,0,0.9)"
                   
							height="150px"
							:src="items[1].src"
							>
							<v-container class="align-end d-flex fill-height">
                      <span class="title">Q 1000</span>
                    </v-container>
							</v-img>
						
							  <v-card-title>
                    <div class="text-truncate">Villas Antigua</div>
                  </v-card-title>
							 <v-card-text>
                    2 cuartos<span class="font-weight-bold" aria-hidden="true"> ·</span>
                    1 baño<span class="font-weight-bold" aria-hidden="true"> ·</span>
                   1000 mts<sup>2</sup>
                  </v-card-text>
						
							<v-divider class="mx-4"></v-divider>
						
							
						
							<v-card-actions>
								<v-btn
								color="primary lighten-2"
								text
								router to = "/detail"
								>
								MÁS INFORMACIÓN
								</v-btn>
							</v-card-actions>
						</v-card>
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
							 :style="[{'max-width': $vuetify.breakpoint.smAndUp ? '200px' : '125px'}]"
							>
							<v-carousel hide-delimiters
								class="white--text align-end"
							height="100px">
									<v-carousel-item
									 v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
									
									></v-carousel-item>
								</v-carousel>
							
							 <v-card-title class="justify-center">
          <span class="body-1 font-weight-bold">Villas Antigua</span>
        </v-card-title>
							<v-divider class="mx-0 my-1"></v-divider>
							<v-card-text class="pt-0">
							
								<div >

                                  	<v-layout row wrap>
										<v-flex sm6 d-flex justify-start>
											<span class="subtitle-2 font-weight-bold mt-2">Q1000/mes</span>
										</v-flex>
										<v-flex sm6 d-flex justify-end>
													<v-btn
													color="primary"
													icon
													router to="/detail"
													
													>
													<v-icon>mdi-alert-circle-outline</v-icon>
													</v-btn>
										</v-flex>
                                  	</v-layout>
                                </div>

								
						
							</v-card-text>
						
							
						
							
						
						</v-card>
      </gmap-info-window>

      <gmap-marker :key="i" v-for="(m,i) in markers" :position="m.position" :clickable="true" @click="toggleInfoWindow(m,i)"></gmap-marker>
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
		 items_select: ['foo', 'bar', 'fizz', 'buzz'],
      value_select: ['foo', 'bar', 'fizz', 'buzz'],
		min: 100,
      max: 9000,
      slider: 5000,
	  range: [200, 5000],
	  value: 10,
        value2: [20, 40],
 
      loading: false,
      errored: false,
      properties: [],
      map: null,
      marker: null,
       e3: 0,
      e31: true,
      infowindow: null,
       center: {
                    lat: 14.6319938,
                    lng: -90.5167931
                },
                infoContent: '',
                infoWindowPos: null,
                infoWinOpen: false,
                currentMidx: null,
                //optional: offset infowindow so it visually sits nicely on top of our marker
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
    }
  },
  mounted() {
    this.fetchProperties()
  },
  methods: {
    toggleInfoWindow: function(marker, idx) {
            this.infoWindowPos = marker.position;
            this.infoContent = marker.infoText;

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
    initMap() {
   
      
	
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

      this.loading = true

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
          this.initMap()
        })
        .catch(err => {
          console.log({err})
          this.errored = true
        })
        .finally(() => this.loading = false)
    }
  }
}
</script>

