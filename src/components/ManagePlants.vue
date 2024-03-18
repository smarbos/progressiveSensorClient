<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">Open Dialog</v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="headline">Add Plant</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <!-- <v-text-field
            v-model="plant.id"
            :rules="[rules.required]"
            label="ID"
          ></v-text-field> -->
          <v-text-field
            v-model="plant.name"
            :rules="[rules.required]"
            label="Name"
          ></v-text-field>
          <v-text-field
            v-model="plant.genetics"
            :rules="[rules.required]"
            label="Genetics"
          ></v-text-field>
          <!-- <v-text-field
            v-model="event.date"
            :rules="[rules.required]"
            label="Event Date"
          ></v-text-field> -->
          <!-- <v-text-field
            v-model="event.event"
            :rules="[rules.required]"
            label="Event"
          ></v-text-field>
          <v-text-field
            v-model="event.note"
            label="Note"
          ></v-text-field>
          <v-text-field
            v-model="event.image"
            label="Image"
          ></v-text-field> -->
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text :disabled="!valid" @click="submit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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