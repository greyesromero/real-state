<template>
  <v-card outlined>
    <v-card-title
      class="font-weight-bold"
    >Q1200 <span class="ml-2 body-1 grey--text text--darken-2">/ por venta</span></v-card-title>
    <v-card-title
      class="font-weight-bold"
    >Q1000 <span class="ml-2 body-1 grey--text text--darken-2">/ por renta</span></v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-container grid-list-md>
        <p class="grey--text text--darken-3 mb-6">Te interesa esta propiedad?</p>
      
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment'

export default {
  name: 'schedule-form',
  props: ['property'],
  data() {
    return {
      scheduleForm: {
        agents: ['Agent one', 'Agent two', 'Agent three'],
        currentAgent: null,
        modalDate: false,
        modalHour: false,
        date: new Date().toISOString().substr(0, 10),
        hour: `${moment().hours()}:${moment().minutes()}`
      },
    }
  },
 
}
</script>
