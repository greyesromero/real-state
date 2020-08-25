<template>
    <v-footer
    id="home-footer"
    color="white black--text"
    dark
    min-height="72"
  >
  
    <v-container>
      <v-row>
        <v-col cols="12" class=" py-0">
           <v-row align="center" justify="center" >
            <v-img
                class="white--text py-0"
                height="150px"
                max-width="auto"
                
                src="../assets/img/grafica.png"
                >
              
                </v-img>
               </v-row>
        </v-col>
          
        <v-col
          cols="12"
          md="6"
        >
          <div class="d-flex flex-wrap justify-md-start justify-center justify-md-none">
            <template v-for="(s, i) in social">
               <v-btn
					:key="i"
					icon
					dark
					class="mx-1"
				>
					<v-icon size="24px" class="black--text">{{ s }}</v-icon>
				</v-btn>
              <!--v-responsive
                v-if="i < social.length - 1"
                :key="`divider-${s}`"
                class="mx-4 shrink hidden-sm-and-down"
                max-height="24"
              >
                <v-divider vertical />
              </v-responsive-->
            </template>
          </div>
        </v-col>
		<!--v-col
          cols="12"
          md="4"
		  class="py-0"
        >
          <div class="d-flex flex-wrap justify-center justify-md-none py-0">
           <v-img src="../assets/img/grafica.png" class="position-absolute" width="350px"></v-img>
          </div>
        </v-col-->

        <v-col
          class="text-center text-md-right"
          cols="12"
          md="6"
        >
          Copyright &copy; 2020 HS
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
	name: 'App',
	components: {},
	data: () => ({
		 social: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-instagram',
      ],
		icons: [{
			icon: 'mdi-facebook',
			url:'https://www.facebook.com/choosemyfitness/'
		},
        {
			icon: 'mdi-instagram',
			url:'https://www.instagram.com/choosemyfitness/'
		}],
	}),
	methods:{
		goTo(url){
			 window.open(url, '_blank');
		}
	},
};
</script>
<style>
.small-logo{
	width:60%;
}
.medium-logo{
	width:60%;
}
</style>