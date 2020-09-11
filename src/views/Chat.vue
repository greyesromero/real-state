<template>
	<div>
	<section>
			<v-container 
				v-if="loading"
				fluid 
				grid-list-md 
				class="px-2 ma-0" 
				:style="{width: $vuetify.breakpoint.lgAndUp ? '100%' : '100%'}">
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
				v-if="!loading && conversations.length == 0"
				fluid 
				grid-list-md 
				class="px-2 ma-0" 
				:style="{width: $vuetify.breakpoint.lgAndUp ? '100%' : '100%'}">
				<div  class="center-container">
					<v-container fill-height>
						<v-layout column align-center justify-center>
						<h1 class="display-2">Sin Resultados</h1>
						<p class="body-1 grey--text">Aún no tienes mensajes</p>
						
					</v-layout>
					</v-container>
				</div>
			</v-container>

	</section>
	<section v-if="!loading && conversations.length>0" id="contact" class="grey lighten-3">
	
		<v-layout wrap >
			<v-flex md4 xs12 class="side" v-if="mobile_bar">
				<v-card
						
							class="mx-auto"
							style="height:100%!important;"
						>
						
							<v-list three-line>
								<template v-for="(item, index) in conversations">
								
								<v-list-item
									
									:key="item.id"
									@click="selectChat(index)"
								>
									<v-list-item-avatar>
									<v-img :src="'../assets/img/sin-imagen.jpg'"></v-img>
									</v-list-item-avatar>
						
									<v-list-item-content>
									<v-list-item-title v-html="item.name"></v-list-item-title>
									<v-list-item-subtitle></v-list-item-subtitle>
									</v-list-item-content>
									<v-list-item-icon>
										<v-btn icon >
											<v-icon>mdi-trash-can</v-icon>
										</v-btn>
									</v-list-item-icon>
								</v-list-item>
								<v-divider ></v-divider>
								</template>
							</v-list>
						</v-card>
				
			</v-flex>
			<v-flex xs12 md8 class="contenido" v-if="!mobile" >
				<v-layout column justify-space-between fill-height>
					<v-card
						color="grey lighten-4"
						flat
					
						tile
					>
						<v-toolbar dense>
						<v-btn icon @click="mobile = true, mobile_bar = true" class=" hidden-sm-and-up">
							<v-icon>mdi-arrow-left-circle</v-icon>
						</v-btn>
						<v-toolbar-title>{{conversations[selected_conversation].name}} </v-toolbar-title>

						<v-spacer></v-spacer>

						
						<v-btn icon>
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>
						</v-toolbar>
					</v-card>
					<v-card id="chat" flat style="overflow-x:hidden!important;overflow-y:scroll!important;height:100%!important;">
						<section v-if="conversations[selected_conversation].messages.length!=0" class="discussion px-5 py-5">
								<template v-for="(msg, index) in conversations[selected_conversation].messages" >
									<div class="bubble last recipient" :key="msg.id" v-if="getUser.id == msg.user">{{ msg.message}} </div>
									<div class="bubble last sender" :key="msg.id" v-if="getUser.id != msg.user">{{ msg.message}} </div>
							</template>
						</section>
					</v-card>
					<v-card class="white px-5">
						<v-text-field
								
								v-model="message"
								:append-outer-icon=" 'mdi-send'"
								:prepend-icon="icon"
								filled
								clear-icon="mdi-close-circle"
								clearable
								label="Escribe un mensaje ..."
								type="text"
								@click:append="toggleMarker"
								@click:append-outer="sendMessage"
								@click:prepend="changeIcon"
								@click:clear="clearMessage"
				></v-text-field>
					</v-card>
				</v-layout>
			</v-flex>
		</v-layout>
	
	</section>
	</div>	
</template>

<script>
import axios from 'axios'
import PropertyList from '../components/PropertyList.vue'
export default {
	components: {
		PropertyList
	},
	props: {
        id: Number
	},
	data: () => ({
		selected_conversation: 0,
		conversations: [],
		mobile: false,
		mobile_bar: true,
		properties: true,
		selected_gym:0,
		selected_conversation: 0,
		search: '',
		properties:[],
		loading: false,
		payment: [],
		password: 'Password',
      show: false,
      message: 'Hey!',
      marker: true,
      iconIndex: 0,
      icons: [
        'mdi-emoticon',
        'mdi-emoticon-cool',
        'mdi-emoticon-dead',
        'mdi-emoticon-excited',
        'mdi-emoticon-happy',
        'mdi-emoticon-neutral',
        'mdi-emoticon-sad',
        'mdi-emoticon-tongue',
      ],
		items: [
       
        {
		  id: 1,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Ali Connors',
          subtitle: " &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
		  messages:[{
			  msg:'Hello',
			  type:'recipient'
		  },
		  {
			  msg:'This is a CSS demo of the Messenger chat bubbles, that merge when stacked together.',
			  type:'recipient'
		  },
		  {
			  msg:'Oh thats cool!',
			  type:'sender'
		  },
		  {
			  msg:'Did you use JavaScript to perform that kind of effect?',
			  type:'recipient'
		  },
		  {
			  msg:'The only solution I see is using JS, or a &lt;div&gt; to group elements together, but I dont want to ...',
			  type:'sender'
		  },
		  {
			  msg:'This is a CSS demo of the Messenger chat bubbles, that merge when stacked together.',
			  type:'recipient'
		  },
		  {
			  msg:'Oh thats cool!',
			  type:'sender'
		  },
		  {
			  msg:'I think its more transparent and easier to group .bubble elements in the same parent.',
			  type:'sender'
		  }]
		},
     
        {
		  id: 2,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Alex, Scott, Jennifer',
		  subtitle: " &mdash; Wish I could come, but I'm out of town this weekend.",
		  messages: [{
			  msg:'Hello',
			  type:'recipient'
		  },
		  {
			  msg:'How are you?.',
			  type:'recipient'
		  },
		  {
			  msg:'Fine Thanks',
			  type:'sender'
		  },
		  {
			  msg:'What are you doing?',
			  type:'recipient'
		  },
		  {
			  msg:'Nothing',
			  type:'sender'
		  },
		  {
			  msg:'Ok bye.',
			  type:'recipient'
		  },
		  {
			  msg:'Oh thats cool!',
			  type:'sender'
		  }]
        },
       
      ],
   
	
	}),
	computed: {
		getUser : function(){ 
			return this.$store.getters.getUser
		},
		isLoggedIn : function(){ 
			return this.$store.getters.isLoggedIn
		},
		size () {
			const size = {xs:'x-small',sm:'small',lg:'large',xl:'x-large'}[this.$vuetify.breakpoint.name];
			return size
		},
		icon () {
			return this.icons[this.iconIndex]
		},
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
		selectChat(index){
			this.selected_conversation = index
			if(this.size == 'x-small' || this.size == 'small'){
				this.mobile = false
				this.mobile_bar = false
			}
		},
		toggleMarker () {
			this.marker = !this.marker
		},
		sendMessage () {
			this.items[this.selected_conversation].messages.push({
				msg: this.message,
				type: 'recipient'
			})
			this.resetIcon()
			this.clearMessage()
			var container = this.$el.querySelector("#chat");
			container.scrollTop = container.scrollHeight;
			
		},
		clearMessage () {
			this.message = ''
		},
		resetIcon () {
			this.iconIndex = 0
		},
		changeIcon () {
			this.iconIndex === this.icons.length - 1
			? this.iconIndex = 0
			: this.iconIndex++
		},
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
		scrollToEnd: function () {
            // scroll to the start of the last message
            this.$el.scrollTop = this.$el.lastElementChild.offsetTop;
        }
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

		if(this.size == 'x-small' || this.size == 'small'){
			this.mobile = true
		}

		this.loading = true
		axios.get('https://hsrealestate-api.herokuapp.com/api/users/'+this.getUser.id+'/')
		.then(response => {
			this.conversations = response.data.conversations
			if(this.conversations.length>0){
				if(this.id){
					let index = this.conversations.findIndex(x => x.id === this.id);
					this.selected_conversation = index
				}else{
					this.selected_conversation = 0
				}
			}
			
			this.loading = false
		})
		.catch(error => {
			this.loading = false
			console.log(error);
		})

		
	}
}
</script>
<style>


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
	background-color: #479f85;
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





</style>