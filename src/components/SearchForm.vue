<template>
	<v-responsive
		class="px-0 mx-auto center"
		max-width="600"
		width="100%"
	>
		<v-row
			no-gutters
			align="center"
			class="mx-auto"
			justify="center"
			
			>
			<v-col cols=1>
					<v-btn
					d-flex
				icon
				depressed
				block 
				class="btn-xl rounded"
				color="primary" x-large>
				<v-icon>mdi-map-marker</v-icon>
				
				</v-btn>
			</v-col>
			<v-col cols="11">
			  <!--v-text-field
			  prepend-inner-icon="mdi-map-marker"
				flat
				label="Busca por departamento, municipio, etc"
				hide-details
				solo
				
				></v-text-field-->
				
				<v-card>
				
					<gmap-autocomplete
					 
						ref="autocomplete"
						@place_changed="setPlace"
						:options="autocompleteOptions"
						:placeholder="'¿En qué área/lugar buscas tu propiedad?'"
						:value="searchAddressInput"
					
						class="py-3 px-3 w-100"></gmap-autocomplete>
				</v-card>
				
			<!--v-autocomplete
					v-model="model"
					:items="items"
					:loading="isLoading"
					:search-input.sync="search"
					chips
					clearable
					hide-details
					hide-selected
					item-text="name"
					item-value="name"
					label="Selecciona un lugar"
					solo
					>
					<template v-slot:no-data>
						<v-list-item>
						<v-list-item-title>
							Busca tu lugar  
							<strong>favorito</strong>
						</v-list-item-title>
						</v-list-item>
					</template>
					<template v-slot:selection="{ attr, on, item, selected }">
						<v-chip
						v-bind="attr"
						:input-value="selected"
						color="secondary"
						class="white--text"
						v-on="on"
						>
						<v-icon left>mdi-map-marker</v-icon>
						<span v-text="item.name"></span>
						</v-chip>
					</template>
					<template v-slot:item="{ item }">
						<v-list-item-avatar
						color="secondary"
						class="headline font-weight-light white--text"
						>
						{{ item.name.charAt(0) }}
						</v-list-item-avatar>
						<v-list-item-content>
						<v-list-item-title v-text="item.name"></v-list-item-title>
						</v-list-item-content>
						<v-list-item-action>
						<v-icon>mdi-coin</v-icon>
						</v-list-item-action>
					</template>
				</v-autocomplete-->
			</v-col>
		</v-row>
	</v-responsive>

</template>

<script>
export default {
	name: 'search-form',
	components: {},
	data: () => ({
		isLoading: false,
		items: [],
		model: null,
		search: null,
		searchAddressInput:'',
		autocompleteOptions: {
			componentRestrictions: { country: 'gt' },
			
		},
		
		
	}),
	 watch: {
     
      search (val) {
        // Items have already been loaded
        if (this.items.length > 0) return

		this.isLoading = true
		this.items = [
			{"id":1,"name":"Antigua Guatemala, Sacatepéquez"},
			{"id":2,"name":"Jocotenango, Sacatepéquez"},
			{"id":3, "name":"Zona 1, Ciudad de Guatemala"}
		]

		this.isLoading = false

        // Lazily load input items
        /*fetch('https://api.coingecko.com/api/v3/coins/list')
          .then(res => res.clone().json())
          .then(res => {
            this.items = res
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))*/
      },
    },
	methods:{
		setPlace(place) {
			
			if (!place) return
			console.log(place)
			this.$router.push({name: 'search', params: {location: place }})

		},
		showSearch(){
			console.log(this.model)
			this.$router.push({name: 'search', params: {foo: 1}})
			this.$router.push('/search')

		}
	},
	
};
</script>