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
			<v-col cols="9">
			  <v-text-field
			  prepend-inner-icon="mdi-map-marker"
				flat
				label="Busca por departamento, municipio, etc"
				hide-details
				solo
				></v-text-field>
			</v-col>
		
			<v-col cols="3">
				<v-btn
				depressed
				block 
				class="btn-xl"
				color="primary">
				Buscar
				</v-btn>
			</v-col>
		</v-row>
	</v-responsive>

</template>

<script>

</script>