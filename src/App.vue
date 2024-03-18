<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <v-container>

    <DashBoard />
    <v-row>
      <v-col cols="12" sm="6">
        <v-card elevation="16" class="fill-height">
          <v-card-item>
          <!-- <v-card-title>
            Humedad
            </v-card-title>
            <v-card-subtitle>
              <LinearScale
                backgroundColor="#13738b"
                :key="this.$store.state.sensor2"
                :data="this.$store.state.sensor2"
                :timeStamps="this.$store.state.timeStamps"
              />
            </v-card-subtitle> -->
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card elevation="16" class="fill-height">
          <v-card-item>
            <v-card-title>
              Temperatura
            </v-card-title>
            <v-card-subtitle>
              <LinearScale
                backgroundColor="#70d785"
                :key="this.$store.state.sensor3"
                :data="this.$store.state.sensor3"
                :timeStamps="this.$store.state.timeStamps"
              />
            </v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12">
        <v-card elevation="16" class="fill-height">
          <PlantsSummary :plantsData="this.$store.state.plants" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import LinearScale from './components/LinearScale.vue'
import PlantsSummary from './components/PlantsSummary.vue'
import DashBoard from './components/DashBoard.vue'

export default {
  name: 'App',
  components: {
    LinearScale,
    PlantsSummary,
    DashBoard
  },
  data() {
    return {
      name: "test"
    };
  },
  async mounted() {
    console.log('App created');
    await this.makeRequest();
    await this.$store.dispatch('getReferenceTemp');
    await this.$store.dispatch('getReferenceHum');
  },
  methods: {
    async makeRequest() {
      await this.$store.dispatch('getPlants');
      await this.$store.dispatch('fetchSensor1');
      // this.$store.dispatch('fetchPlantsSensors');
      setTimeout(() => {
        this.makeRequest();
      }, 10000);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
