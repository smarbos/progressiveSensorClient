<template>
  <v-item-group mandatory>
    <v-container>
      <v-row>
        <v-col
          v-for="plant in this.plantsData"
          :key="plant"
          cols="12"
          md="4"
        >
          <v-item v-slot="{ isSelected }">
            <v-card
              :color="isSelected ? 'primary' : ''"
              class="d-flex align-center"
              dark
              height="200"
            >
            <v-row>
              <v-col>
                <v-card-item>
                  <v-card-title>
                    {{plant.name}}
                  </v-card-title>
                  <v-card-subtitle>
                    <LinearScale
                  backgroundColor="#13738b"
                  :key="plant.soilHum"
                  :data="plant.soilHum"
                  :timeStamps="plant.timeStamps"
                />
                </v-card-subtitle>
              </v-card-item>
              </v-col>
              <v-col>
                <v-card-item>
                  <v-card-title>
                    Data
                  </v-card-title>
                  <v-card-subtitle>
                    Genetic: {{plant.genetic}}
                    <br>
                    Days Old: {{plant.daysOld}}
                    <br>
                    Soil Hum: {{lastSoilHum(plant)}}
                </v-card-subtitle>
              </v-card-item>
              </v-col>
            </v-row>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
import LinearScale from '../components/LinearScale.vue'

export default {
  name: 'PlantsSummary',
  props: {
    plantsData: Array
  },
  components: {
    LinearScale
  },
  methods: {
    lastSoilHum(plant) {
      // console.log('%cPlantsSummary.vue line:70 plant.soilHum', 'color: #007acc;', plant);
      const lastSoilHum = plant.soilHum[plant.soilHum.length - 1];
      // console.log('%cPlantsSummary.vue line:72 lastSoilHum', 'color: #007acc;', lastSoilHum);
      return (lastSoilHum) ? lastSoilHum.value : 0;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
