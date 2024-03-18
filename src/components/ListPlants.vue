<template>
  <v-card v-for="plant in this.$store.state.plants" v-bind:key="plant.id">
      <v-card-title>
        {{plant.name}}
      </v-card-title>

      <v-card-text>
     asas
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">View</v-btn>
        <v-btn color="blue darken-1" text :disabled="!valid" @click="submit">Edit</v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    valid: true,
    dialog: true,
    plant: {
      // id: '',
      name: '',
      genetics: '',
      history: []
    },
    event: {
      date: '',
      event: '',
      note: '',
      image: ''
    },
    rules: {
      required: value => !!value || 'Required.'
    }
  }),
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        console.log('%cManagePlants.vue line:82 this.plant', 'color: #007acc;', this.plant);
        // make an axios post to localhost:3000 and send this.plant
        const response = await axios.post('http://localhost:3000/plants', {"plant": this.plant});
        console.log('%cManagePlants.vue line:87 response', 'color: #007acc;', response);
        // Send this.plant to your server or add it to your data store
      }
    }
  }
};
</script>