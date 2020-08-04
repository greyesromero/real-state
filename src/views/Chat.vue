<template>
	<section id="contact" class="grey lighten-3">
		 <v-layout wrap >
      <v-flex xs4 class="side">
           <v-card
				
					class="mx-auto"
					style="height:100%!important;"
				>
				
					<v-list three-line>
					<template v-for="(item, index) in items">
						<v-subheader
						v-if="item.header"
						:key="item.header"
						v-text="item.header"
						></v-subheader>

						<v-divider
						v-else-if="item.divider"
						:key="index"
						:inset="item.inset"
						></v-divider>

						<v-list-item
						v-else
						:key="item.title"
						@click=""
						>
						<v-list-item-avatar>
							<v-img :src="item.avatar"></v-img>
						</v-list-item-avatar>

						<v-list-item-content>
							<v-list-item-title v-html="item.title"></v-list-item-title>
							<v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
						</v-list-item-content>
						</v-list-item>
					</template>
					</v-list>
				</v-card>
         
      </v-flex>
      <v-flex class="contenido  hidden-sm-and-down" >
         <v-layout column justify-space-between fill-height>
			  <v-card
				color="grey lighten-4"
				flat
			
				tile
			>
				<v-toolbar dense>

				<v-toolbar-title>Ali Connors</v-toolbar-title>

				<v-spacer></v-spacer>

				
				<v-btn icon>
					<v-icon>mdi-dots-vertical</v-icon>
				</v-btn>
				</v-toolbar>
			</v-card>
            <v-card flat style="overflow-x:hidden!important;overflow-y:scroll!important;height:100%!important;">
              	<section class="discussion py-12 px-2" style="margin-bottom:30px;">
	
					<div class="bubble sender first">Hello</div>
					<div class="bubble sender last">This is a CSS demo of the Messenger chat bubbles, that merge when stacked together.</div>
					
					<div class="bubble recipient first">Oh that's cool!</div>
					<div class="bubble recipient last">Did you use JavaScript to perform that kind of effect?</div>
					
					<div class="bubble sender first">No, that's full CSS3!</div>
					<div class="bubble sender middle">(Take a look to the 'JS' section of this Pen... it's empty! 😃</div>
					<div class="bubble sender last">And it's also really lightweight!</div>
					
					<div class="bubble recipient">Dope!</div>
					
					<div class="bubble sender first">Yeah, but I still didn't succeed to get rid of these stupid .first and .last classes.</div>
					<div class="bubble sender middle">The only solution I see is using JS, or a &lt;div&gt; to group elements together, but I don't want to ...</div>
					<div class="bubble sender last">I think it's more transparent and easier to group .bubble elements in the same parent.</div>
					
				</section>
            </v-card>
            <v-card class="white px-5">
               <v-text-field
							flat
							label="Escribe un mensaje ..."
							hide-details
							solo
							outlined
							rounded
							color="secondary"
							class=""
							
							></v-text-field>
            </v-card>
         </v-layout>
      </v-flex>
   </v-layout>
		<!--div class = "contenedor">
			<div class = "side">
				<v-card
				
					class="mx-auto"
				>
				
					<v-list three-line>
					<template v-for="(item, index) in items">
						<v-subheader
						v-if="item.header"
						:key="item.header"
						v-text="item.header"
						></v-subheader>

						<v-divider
						v-else-if="item.divider"
						:key="index"
						:inset="item.inset"
						></v-divider>

						<v-list-item
						v-else
						:key="item.title"
						@click=""
						>
						<v-list-item-avatar>
							<v-img :src="item.avatar"></v-img>
						</v-list-item-avatar>

						<v-list-item-content>
							<v-list-item-title v-html="item.title"></v-list-item-title>
							<v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
						</v-list-item-content>
						</v-list-item>
					</template>
					</v-list>
				</v-card>
			</div>
			<div class ="contenido position-relative">
			
				<section class="discussion py-12" style="margin-bottom:30px;">
	
					<div class="bubble sender first">Hello</div>
					<div class="bubble sender last">This is a CSS demo of the Messenger chat bubbles, that merge when stacked together.</div>
					
					<div class="bubble recipient first">Oh that's cool!</div>
					<div class="bubble recipient last">Did you use JavaScript to perform that kind of effect?</div>
					
					<div class="bubble sender first">No, that's full CSS3!</div>
					<div class="bubble sender middle">(Take a look to the 'JS' section of this Pen... it's empty! 😃</div>
					<div class="bubble sender last">And it's also really lightweight!</div>
					
					<div class="bubble recipient">Dope!</div>
					
					<div class="bubble sender first">Yeah, but I still didn't succeed to get rid of these stupid .first and .last classes.</div>
					<div class="bubble sender middle">The only solution I see is using JS, or a &lt;div&gt; to group elements together, but I don't want to ...</div>
					<div class="bubble sender last">I think it's more transparent and easier to group .bubble elements in the same parent.</div>
					<div class="px-12 position-relative">
						<v-text-field
							flat
							label="Escribe un mensaje ..."
							hide-details
							solo
							outlined
							rounded
							color="secondary"
							class="prueba position-absolute"
							
							></v-text-field>
					</div>
				</section>
				
				
			
			</div>
		</div-->
	</section>	
</template>

<script>
import axios from 'axios'
import PropertyList from '../components/PropertyList.vue'
export default {
	components: {
		PropertyList
	},
	data: () => ({
		properties: true,
		selected_gym:0,
		search: '',
		properties:[],
		loading: false,
		payment: [],
		items: [
        { header: 'Today' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Ali Connors',
          subtitle: " &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Alex, Scott, Jennifer',
          subtitle: " &mdash; Wish I could come, but I'm out of town this weekend.",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Sandra Adams',
          subtitle: "&mdash; Do you have Paris recommendations? Have you ever been?",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Trevor Hansen',
          subtitle: " &mdash; Have any ideas about what we should get Heidi for her birthday?",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Britta Holt',
          subtitle: " &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
		},
		{ divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Britta Holt',
          subtitle: " &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
		},
		{ divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Britta Holt',
          subtitle: "&mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
		},
		{ divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Britta Holt',
          subtitle: "&mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
        },
      ],
   
	
	}),
	computed: {

		filteredProperties: function() {
			let filtered = this.properties;
			if (this.search) {
				filtered = this.properties.filter(
				m => m.title.toLowerCase().indexOf(this.search) > -1
				);
			}

		
			
			return filtered;
		}
	},
	methods: {
		
		sortBy(prop) {
			this.properties.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
		},
		updateStatus(data){
			this.properties[data.index].active = data.state
		},
		//PAYMENT METHODS
		createPayment(data) {
			this.payment.push({
				card_holder: data.card_holder,
				credit_card_token: data.credit_card_token.substring(15,19),
				cvv: data.cvv,
				type: data.type,
				card_date: data.card_date,
				tin: '',
				address: '',
				invoice_name: ''
			})
			
			this.$store.dispatch('updatePayment', this.payment)
			
			/*this.$store.commit('changeLoadingState', true)
			axios.patch('https://gudker-api.herokuapp.com/api/staff/'+this.doctor_id+'/',{
				tin: data.tin,
				credit_card_token:  data.credit_card_token.substring(15,19),
				address: data.address
			})
			.then(response => {
				this.payment.push({
					card_holder: data.card_holder,
					card_number: data.credit_card_token.substring(15,19),
					cvv: data.cvv,
					type: data.type,
					card_date: data.card_date,
					tin: data.tin,
					address: data.address
				});
				
				this.$store.commit('changeLoadingState', false)
			})
			.catch(error => {
				this.$store.commit('changeLoadingState', false)
				console.log(error);
			})*/
			
			
		},
		deletePayment(index) {
		this.payment.splice(index, 1);
			/*this.$store.commit('changeLoadingState', true)
			axios.patch('https://gudker-api.herokuapp.com/api/staff/'+this.doctor_id+'/',{
				tin: null,
				credit_card_token:  null,
				address: null
			})
			.then(response => {
				this.payment.splice(index, 1);
				
				this.$store.commit('changeLoadingState', false)
			})
			.catch(error => {
				this.$store.commit('changeLoadingState', false)
				console.log(error);
			})*/
			
		},
	},
	created() {
	

	},
	mounted () {
		this.properties.push({
			image: '../assets/img/house4.jpg',
			title: ' Casa Deluxe en Antigua Guatemala',
			date: '2020-08-05',
			status: false
		})
	}
}
</script>
<style>

#home-footer{
	display:none!important;
}
.contenedor{
  display: flex;
  
}

.side{
 
  height: 90vh;
  color: white;
  background-color: white;
  overflow-y: scroll;
  overflow-x: hidden;
}

.contenido{
  flex: 8;
  height: 90vh;
  background-color: white;
  overflow:hidden!important;

}

.chatbox__messageInput {
    position: absolute;
    display: block;
    font: inherit;
    font-size: 13px;
    text-align: left;
    position: absolute;
    margin: 0 auto;
    right: 0;
    left: 0;
    height: 37px;
    padding: 2px 19px;
    border-radius: 50px;
    border: 1px solid #e4e4e4;
    bottom: 26px;
    z-index: 2;
}

.discussion {
	max-width: 900px;
	margin: 0 auto;
	
	display: flex;
	flex-flow: column wrap;
}

.discussion > .bubble {
	border-radius: 1em;
	padding: 0.25em 0.75em;
	margin: 0.0625em;
	max-width: 50%;
}

.discussion > .bubble.sender {
	align-self: flex-start;
	background-color: cornflowerblue;
	color: #fff;
}
.discussion > .bubble.recipient {
	align-self: flex-end;
	background-color: #efefef;
}

.discussion > .bubble.sender.first { border-bottom-left-radius: 0.1em; }
.discussion > .bubble.sender.last { border-top-left-radius: 0.1em; }
.discussion > .bubble.sender.middle {
	border-bottom-left-radius: 0.1em;
 	border-top-left-radius: 0.1em;
}

.discussion > .bubble.recipient.first { border-bottom-right-radius: 0.1em; }
.discussion > .bubble.recipient.last { border-top-right-radius: 0.1em; }
.discussion > .bubble.recipient.middle {
	border-bottom-right-radius: 0.1em;
	border-top-right-radius: 0.1em;
}



/**/ 

.messages--sent .message:first-child {
    border-top-right-radius: 15px;
}

.messages--sent .message {
    float: right;
    background-color: #1998e6;
    color: #fff;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
}

.message {
    display: inline-block;
    margin-bottom: 2px;
    clear: both;
    padding: 7px 13px;
    font-size: 12px;
    border-radius: 15px;
    line-height: 1.4;
}

.messages--received .message:last-child {
    border-bottom-left-radius: 15px;
}

.messages--received .message {
    float: left;
    background-color: #ddd;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
}

.prueba{
	
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: auto;
    height: 50px;
    z-index: 999;
    background: #fafafa;
    border: none;
    outline: none;
    padding-left: 55px;
    padding-right: 55px;
    color: #666;
    font-weight: 400;

}
.fixed-item {
  background: yellow;
  border: 2px solid red;
  height: 500px;
  left: 30px;
  top: 35px;
  position: fixed;
  width: 100px;
  z-index: 999;
}


</style>