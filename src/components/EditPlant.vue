<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="plant.id"
      :rules="[rules.required]"
      label="ID"
    ></v-text-field>

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

    <v-text-field
      v-model="event.date"
      :rules="[rules.required]"
      label="Event Date"
    ></v-text-field>

    <v-text-field
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
    ></v-text-field>

    <v-btn :disabled="!valid" @click="submit">Submit</v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    plant: {
      id: '',
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
    submit() {
      if (this.$refs.form.validate()) {
        this.plant.history.push(this.event);
        // Send this.plant to your server or add it to your data store
      }
    }
  }
};
</script>