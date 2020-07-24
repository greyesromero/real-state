<template>
<div>
	<v-speed-dial fixed bottom right >
		<template v-slot:activator>
			<v-btn color="primary " dark fab>
				<v-icon>mdi-tools</v-icon>
			</v-btn>
		</template>
		<v-tooltip left color="black">
			<template v-slot:activator="{ on }">
				<v-btn color="primary" v-on="on"  fab dark>
			<v-icon>mdi-trash-can-outline</v-icon>
		</v-btn>
			</template>
			<span>Eliminar Propiedad</span>
		</v-tooltip>
		<v-tooltip color="black" left>
			<template v-slot:activator="{ on }">
				<v-btn color="primary" v-on="on"  fab dark>
			<v-icon>mdi-square-edit-outline</v-icon>
		</v-btn>
			</template>
			<span>Editar Información</span>
		</v-tooltip>
		<v-tooltip left color="black">
			<template v-slot:activator="{ on }">
				<v-btn color="primary" v-on="on"  fab dark>
			<v-icon>mdi-image-multiple-outline</v-icon>
		</v-btn>
			</template>
			<span>Editar Galería</span>
		</v-tooltip>
	
	
	</v-speed-dial>

	<v-dialog v-model="note_dialog" width="500">
		<v-card>
			<v-card-title>
				Crear Nota Médica
				<v-spacer></v-spacer>
				<v-btn @click="startSpeechRecognition('note')" class="float-right" color="cyan darken-4" icon="">
					<v-icon>mdi-record</v-icon>
				</v-btn>
			</v-card-title>
			<v-card-text class="mb-0">
				<v-form v-model="validNote" :lazy-validation="lazyNote"  ref="formNote">
					<v-textarea v-model="text['note']" outlined color="secondary" label="Nota Médica" placeholder="Escribe tu nota médica aquí, o presiona el botón rojo para grabar." required :rules="[v => !!v || 'Al menos una descripción es requerida']"></v-textarea>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text v-on:click="resetNote()">Cancelar</v-btn>
				<v-btn outlined v-on:click="newNote()">Guardar</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>

	<v-dialog v-model="observation_dialog" width="500">
		<v-card>
			<v-card-title>
				Crear Observación/Recomendación
				<v-spacer></v-spacer>
				<v-btn @click="startSpeechRecognition('observation')" class="float-right" color="cyan darken-4" icon="">
					<v-icon>mdi-record</v-icon>
				</v-btn>
			</v-card-title>
			<v-card-text class="mb-0">
				<v-form v-model="validObservation" :lazy-validation="lazyObservation"  ref="formObservation">
					<v-textarea v-model="text['observation']" outlined color="secondary" label="Observación/Recomendación" placeholder="Escribe tu observación o recomendación aquí, o presiona el botón rojo para grabar." required :rules="[v => !!v || 'Al menos una descripción es requerida']"></v-textarea>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text v-on:click="resetObservation()">Cancelar</v-btn>
				<v-btn outlined v-on:click="newObservation()">Guardar</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>

	<v-dialog v-model="perscription_dialog" width="500">
		<v-card>
			<v-card-title>
				Crear Receta Médica
				<v-spacer></v-spacer>
				<v-btn @click="startSpeechRecognition('indications')" class="float-right" color="cyan darken-4" icon="">
					<v-icon>mdi-record</v-icon>
				</v-btn>
			</v-card-title>
			<v-card-text class="mb-0">
				<v-form v-model="validPrescription" :lazy-validation="lazyPrescription"  ref="formPrescription">
					<v-text-field v-model.lazy="drug" outlined color="secondary" label="Medicamento"  required :rules="[v => !!v || 'Medicamento es requerido']"></v-text-field>
					<v-textarea v-model="text['indications']" outlined color="secondary" label="Indicaciones" placeholder="Escribe las indicaciones para la receta médica aquí, o presiona el botón rojo para grabar."  required :rules="[v => !!v || 'Al menos una indicación es requerida']"></v-textarea>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text v-on:click="resetPrescription()">Cancelar</v-btn>
				<v-btn outlined v-on:click="newPrescription()">Guardar</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>

	<v-dialog v-model="diagnosis_dialog" width="500">
		<v-card>
			<v-card-title>
				Agregar Diagnóstico
			</v-card-title>
			<v-card-text class="mb-0">
				<v-form>
					<v-form v-model="validDiagnosis" :lazy-validation="lazyDiagnosis"  ref="formDiagnosis">
						<v-text-field v-model.lazy="diagnosis" outlined color="secondary" label="Diagnóstico" required :rules="[v => !!v || 'Diagnóstico es requerido']"></v-text-field>
					</v-form>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text v-on:click="resetDiagnosis()">Cancelar</v-btn>
				<v-btn outlined v-on:click="newDiagnosis()">Guardar</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</div>
</template>

<script>
import axios from 'axios'

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent
let recognition = SpeechRecognition ? new SpeechRecognition() : false

recognition.lang = 'es-GT'
recognition.interimResults = true
recognition.continous = true;

export default {
	props: ['appointment'],
	data() {
		return {
			validNote: true,
			lazyNote:false,
			validObservation: true,
			lazyObservation:false,
			validPrescription: true,
			lazyPrescription: false,
			validDiagnosis: true,
			lazyDiagnosis: false,
			note_dialog: false,
			observation_dialog: false,
			perscription_dialog: false,
			diagnosis_dialog: false,
			currentPatient: parseInt(localStorage.currentPatient),
			error: false,
			speaking: false,
			runtimeTranscription: '',
			note_type: null,
			diagnosis: '',
			drug: '',
			text: {
				'note': '',
				'observation': '',
				'indications': '',
			},
			left: false,
    transition: 'slide-y-reverse-transition',
    tooltips: false,
    tooltipsDisabled: false
		}
	},
	computed: {
		getUser : function(){ 
		return this.$store.getters.getUser
		}
	},
	methods: {
		newNote() {
			if (this.$refs.formNote.validate()){
				axios.post('https://gudker-api.herokuapp.com/api/records/medical_note/', {
					note: this.text['note'],
					doctor: this.getUser.id,
					patient: this.currentPatient,
					appointment: this.appointment.id
				})
				.then(response => {
					this.$refs.formNote.reset()
					response.data['images'] = [];
					response.data['files'] = [];
					response.data['doctor']= this.getUser;
					response.data['appointment'] = this.appointment
					this.$emit('newNote',response.data);
					this.text['note'] = '';
					this.note_dialog = false;
				})
				.catch(error => {
					console.log(error);
				});
			}
		},
		resetNote(){
			this.note_dialog=false
			this.$refs.formNote.reset()
		},
		newObservation() {
			if (this.$refs.formObservation.validate()){
				axios.post('https://gudker-api.herokuapp.com/api/records/observation/', {
					observation: this.text['observation'],
					doctor: this.getUser.id,
					patient: this.currentPatient,
					appointment: this.appointment.id
				})
				.then(response => {
					this.$refs.formObservation.reset()
					response.data['images'] = [];
					response.data['files'] = [];
					response.data['appointment'] = this.appointment
					response.data['doctor']= this.getUser;
					this.$emit('newObservation', response.data);
					this.text['observation'] = '';
					this.observation_dialog = false;
				})
				.catch(error => {
					console.log(error);
				});
			}
		},
		resetObservation(){
			this.observation_dialog=false
			this.$refs.formObservation.reset()
		},
		newDiagnosis() {
			if (this.$refs.formDiagnosis.validate()){
				axios.post('https://gudker-api.herokuapp.com/api/records/diagnosis/', {
					diagnosis: this.diagnosis,
					doctor: this.getUser.id,
					patient: this.currentPatient,
					appointment: this.appointment.id
				})
				.then(response => {
					this.$refs.formDiagnosis.reset()
					response.data['images'] = [];
					response.data['files'] = [];
					response.data['appointment'] = this.appointment
					response.data['doctor']= this.getUser;
					this.$emit('newDiagnosis', response.data);
					this.diagnosis = '';
					this.diagnosis_dialog = false;
				})
				.catch(error => {
					console.log(error);
				});
			}
		},
		resetDiagnosis(){
			this.diagnosis_dialog=false
			this.$refs.formDiagnosis.reset()
		},
		newPrescription() {
			if (this.$refs.formPrescription.validate()){
				axios.post('https://gudker-api.herokuapp.com/api/records/prescription/', {
					indications: this.text['indications'],
					drug: this.drug,
					doctor: this.getUser.id,
					patient: this.currentPatient,
					appointment: this.appointment.id
				})
				.then(response => {
					this.$refs.formPrescription.reset()
					response.data['doctor']= this.getUser;
					response.data['appointment'] = this.appointment
					this.$emit('newPrescription', response.data);
					this.text['indications'] = '';
					this.drug = '';
					this.perscription_dialog = false;
				})
				.catch(error => {
					console.log(error);
				});
			}
		},
		resetPrescription(){
			this.perscription_dialog=false
			this.$refs.formPrescription.reset()
		},
		checkCompatibility() {
			if (!recognition) {
				this.error = 'Speech Recognition is not available on this browser. Please use Chrome or Firefox'
			}
		},
		startSpeechRecognition(type) {
			this.note_type = type;
			if (!recognition) {
				this.error = 'Speech Recognition is not available on this browser. Please use Chrome or Firefox'
				return false
			}
			recognition.start()

			recognition.addEventListener('speechstart', event => {
				this.speaking = true
			})

			recognition.addEventListener('speechend', event => {
				this.speaking = false
			})

			recognition.addEventListener('result', event => {
				const text = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('')
				this.runtimeTranscription = text
			})

			recognition.addEventListener('end', () => {
				if (this.runtimeTranscription !== '') {
					this.text[this.note_type] += this.capitalizeFirstLetter(this.runtimeTranscription) + '. ';
				}
				this.runtimeTranscription = ''

			})
		},
		capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1)
		}
	},
	mounted() {
		this.checkCompatibility()
	
	}
}
</script>

<style>
.small-bottom{
	bottom:50px!important;
}

.big-bottom{
	bottom:50px!important;
}
</style>