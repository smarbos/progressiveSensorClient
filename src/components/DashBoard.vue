<template>
  <v-row>
    <v-col cols="12" sm="3">
        <v-card elevation="16" class="fill-height">
          <v-card-item>
            <v-row>
              <v-col cols="12" sm="6">
                <v-card-title>
                </v-card-title>
                <v-card-subtitle>
                  <h1 class="pa-2 ma-4">
                    {{this.$store.state.currentTime}}
                  </h1>
                </v-card-subtitle>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card-title>
                  <v-chip variant="outlined" class="ma-4">
                    Mes 3
                  </v-chip>
                  <v-chip variant="outlined">
                    Dia 4
                  </v-chip>
                </v-card-title>
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3">
        <v-card elevation="16" class="fill-height" :color="currentTempStatusColor">
          <v-card-item>
            <v-card-title>
              Temperatura
            </v-card-title>
            <v-card-subtitle>
              <h1 class="pa-2">
                {{this.$store.state.currentTemp}}°C
              </h1>
              <!-- [{{this.$store.state.referenceTemp.min}}° / {{this.$store.state.referenceTemp.max}}°]<br> -->
              <span v-if="currentTempStatus === 'UNDER_MIN'">
                {{Math.abs(Math.round(this.$store.state.referenceTemp.min - this.$store.state.currentTemp))}}° bajo el minimo<br>
              </span>
              <span v-if="currentTempStatus === 'ABOVE_MAX'">
                {{Math.abs(Math.round(this.$store.state.referenceTemp.max - this.$store.state.currentTemp))}}° sobre el maximo<br>
              </span>
            </v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3">
        <v-card elevation="16" class="fill-height" :color="currentHumStatusColor">
          <v-card-item>
            <v-card-title>
              Humedad
            </v-card-title>
            <v-card-subtitle>
              <h1 class="pa-2">
                {{this.$store.state.currentHum}}%
              </h1>
              <!-- {{this.$store.state.referenceHum.min}}° / {{this.$store.state.referenceHum.max}}°<br> -->
              <span v-if="currentHumStatus === 'UNDER_MIN'">
                ({{Math.abs(Math.round(this.$store.state.referenceHum.min - this.$store.state.currentHum))}}% bajo el minimo)
              </span>
              <span v-if="currentHumStatus === 'ABOVE_MAX'">
                ({{Math.abs(Math.round(this.$store.state.referenceHum.max - this.$store.state.currentHum))}}% sobre el maximo)
              </span>
            </v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3">
        <v-card :disabled="currentServerStatus === 'DOWN'" elevation="16" class="fill-height" @click="switchLight()" :color="currentLightStatusColor">
          <v-card-item>
            <v-card-title>
              Luz
            </v-card-title>
            <v-card-subtitle>
              <h2 class="pa-2">
                {{this.$store.state.lightStatus ? "Encendida" : "Apagada"}}
              </h2>
            </v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="3">
        <v-card elevation="16" class="fill-height" :color="currentServerStatusColor">
          <v-card-item>
            <v-card-title>
              Server Status
            </v-card-title>
            <v-card-subtitle>
              <h2 v-if="currentServerStatus === 'UP'">
                UP
              </h2>
              <h2 v-if="currentServerStatus === 'DOWN'">
                DOWN
              </h2>
              <span v-if="currentServerStatus === 'DOWN'">Last: {{ lastServerResponse }}</span>
            </v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3">
        <v-card elevation="16" class="fill-height" :color="currentHumStatusColor">
          <v-card-item>
            <v-card-title>
              Reference Hum
            </v-card-title>
            <v-card-subtitle>
              {{this.$store.state.referenceHum.min}}° / {{this.$store.state.referenceHum.max}}°<br>
              <span v-if="currentHumStatus === 'UNDER_MIN'">
                {{Math.abs(Math.round(this.$store.state.referenceHum.min - this.$store.state.currentHum))}}% bajo el minimo<br>
              </span>
              <span v-if="currentHumStatus === 'ABOVE_MAX'">
                {{Math.abs(Math.round(this.$store.state.referenceHum.max - this.$store.state.currentHum))}}% sobre el maximo<br>
              </span>
            </v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3">
        <v-card :disabled="currentServerStatus === 'DOWN'" elevation="16" class="fill-height" @click="changeStage()">
          <v-card-item>
            <v-card-title>
              Stage
            </v-card-title>
            <v-card-subtitle>
              <h2 class="pa-2">
                {{ this.$store.state.currentStage }}
              </h2>
              Dia 4
            </v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3">
        <v-card :disabled="currentServerStatus === 'DOWN'" elevation="16" class="fill-height" @click="switchFan()">
          <v-card-item>
            <v-card-title>
              Ventilacion
            </v-card-title>
            <v-card-subtitle>
              <h2 class="pa-2">
                {{this.$store.state.fanStatus ? "Encendida" : "Apagada"}}
              </h2>
            </v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <v-card elevation="16" class="fill-height">
          <v-card-item>
            <v-card-title @click="hideLogs()">
              Logs
              <span v-if="this.$store.state.logs.length > 0">
                [{{ this.$store.state.logs.length }}]
                <span @click="clearLogs()">
                  [X]
                </span>
              </span>
            </v-card-title>
            <v-card-subtitle v-if="showLogs">
              <span v-if="this.$store.state.logs.length <= 0">
                All clear
              </span>
              <ol v-for="log in this.$store.state.logs" :key="log">
                <li>
                  [{{ log.timeStamp }}]{{ log.message }}
                </li>
              </ol>
            </v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card elevation="16" class="fill-height">
          <v-card-item>
            <v-card-title @click="hideNotifications()">
              Notifications
              <span v-if="this.$store.state.notifications.length > 0">
                [{{ this.$store.state.notifications.length }}]
                <span @click="clearNotifications()">
                  [X]
                </span>
              </span>
            </v-card-title>
            <v-card-subtitle v-if="showNotifications">
              <span v-if="this.$store.state.notifications.length <= 0">
                All clear
              </span>
              <ol v-for="notification in this.$store.state.notifications" :key="notification">
                <li>
                  {{ notification }}
                </li>
              </ol>
            </v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
</template>

<script>
export default {
  name: 'DashBoard',
  props: {
    msg: String
  },
  data: () => ({
    showNotifications: false,
    showLogs: false,
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
      { title: 'Plants', icon: 'mdi-flower', to: '/plants' },
      { title: 'Settings', icon: 'mdi-cog', to: '/settings' },
    ],
  }),
  methods: {
    switchLight() {
      this.$store.dispatch('switchLight');
      this.$store.dispatch('getReferenceTemp');
      this.$store.dispatch('getReferenceHum');
    },
    switchFan() {
      this.$store.dispatch('switchFan');
    },
    hideNotifications() {
      this.showNotifications = !this.showNotifications;
    },
    hideLogs() {
      this.showLogs = !this.showLogs;
    },
    clearLogs() {
      this.$store.dispatch('clearLogs');
    },
    clearNotifications() {
      this.$store.dispatch('clearNotifications');
    },
    changeStage() {
      this.$store.dispatch('changeStage');
    }
  },
  computed: {
    lastServerResponse() {
      const last = this.$store.state.lastServerResponse;
      const date = new Date(last);
      const now = new Date();
      const diff = now - date;
      const seconds = Math.round(diff / 1000);
      const minutes = Math.round(seconds / 60);
      const hours = Math.round(minutes / 60);
      const days = Math.round(hours / 24);
      const months = Math.round(days / 30);
      const years = Math.round(months / 12);
      return `${(years) ? years + "years, " : ""} ${(months) ? months + "months, " : ""} ${(days) ? days + "days, " : ""} ${(hours) ? hours + "hours, " : ""} ${minutes} minutes, ${seconds} seconds ago`;
    },
    currentTempStatus() {
      let status = 'OK';
      const isUnderMinimum = Math.abs(Math.round(this.$store.state.currentTemp < this.$store.state.referenceTemp.min));
      const isAboveMaximum = Math.abs(Math.round(this.$store.state.currentTemp > this.$store.state.referenceTemp.max));
      if (isUnderMinimum) {
        status = "UNDER_MIN"
      }
      if (isAboveMaximum) {
        status = "ABOVE_MAX"
      }
      return status;
    },
    currentHumStatus() {
      let status = 'OK';
      const isUnderMinimum = Math.abs(Math.round(this.$store.state.currentHum < this.$store.state.referenceHum.min));
      const isAboveMaximum = Math.abs(Math.round(this.$store.state.currentHum > this.$store.state.referenceHum.max));
      if (isUnderMinimum) {
        status = "UNDER_MIN"
      }
      if (isAboveMaximum) {
        status = "ABOVE_MAX"
      }
      return status;
    },
    currentServerStatus() {
      let status = 'UP';
      if (this.$store.state.serverStatus === "DOWN") {
        status = "DOWN"
      }
      return status;
    },
    currentTempStatusColor() {
      let color = 'green';
      const isUnderMinimum = Math.abs(Math.round(this.$store.state.currentTemp < this.$store.state.referenceTemp.min));
      const isAboveMaximum = Math.abs(Math.round(this.$store.state.currentTemp > this.$store.state.referenceTemp.max));
      if (isUnderMinimum) {
        color = "blue"
      }
      if (isAboveMaximum) {
        color = "red"
      }
      return color;
    },
    currentHumStatusColor() {
      let color = 'green';
      const isUnderMinimum = Math.abs(Math.round(this.$store.state.currentHum < this.$store.state.referenceHum.min));
      const isAboveMaximum = Math.abs(Math.round(this.$store.state.currentHum > this.$store.state.referenceHum.max));
      if (isUnderMinimum) {
        color = "blue"
      }
      if (isAboveMaximum) {
        color = "red"
      }
      return color;
    },
    currentLightStatusColor() {
      let color = 'green';
      if (this.$store.state.lightStatus) {
        color = "blue"
      }
      if (!this.$store.state.lightStatus) {
        color = "red"
      }
      return color;
    },
    currentServerStatusColor() {
      let color = 'green';
      if (this.$store.state.serverStatus === "DOWN") {
        color = "red"
      }
      return color;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
