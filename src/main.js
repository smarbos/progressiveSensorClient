import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import VuexPersistence from 'vuex-persist'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import axios from 'axios';

const vuetify = createVuetify({
  components,
  directives,
});

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

const store = createStore({
    state () {
        return {
            count: 0,
            sensor1: [],
            sensor2: [],
            sensor3: [],
            currentTemp: 0,
            currentHum: 0,
            currentTime: "0:00",
            soilHumThresholds: {
                min: 0,
                max: 99
            },
            timeStamps: [],
            lightStatus: true,
            fanStatus: false,
            currentStage: "vegetative", // vegetative, flowering, harvest,
            referenceTemp: {
                min: 0,
                max: 99
            },
            referenceHum: {
                min: 0,
                max: 99
            },
            plants: [],
            notifications: [],
            logs: [],
            serverStatus: "UP",
            lastServerResponse: {}
        }
    },
    actions: {
        async fetchSensor1 ({ commit }) {
            console.log('%cmain.js line:57 "[fetchSensor1]"', 'color: #007acc;', "[fetchSensor1]");
            try {
                const response = await axios.get('http://localhost:3000/zones');
                const hum = response.data.zones[0].sensors[0][[response.data.zones[0].sensors[0].length - 1]].value;
                const temperatura = response.data.zones[0].sensors[1][response.data.zones[0].sensors[1].length - 1].value;
                const light = response.data.zones[0].sensors[2][response.data.zones[0].sensors[2].length - 1].value;
                const soilHum = 1337;
                commit('updateHum', hum);
                commit('updateTemperature', temperatura);
                commit('updateTime');
                commit('updateTimeStamps');
                const lightStatus = light == "1" ? true : false;
                commit('updateLightStatus', lightStatus);
                commit('updateServerStatus', "UP");
                commit('updatePlants', [
                    {
                        name: "Plant 1",
                        soilHum: soilHum,
                        genetic: "Haze",
                        daysOld: 32
                    },
                    {
                        name: "Plant 2",
                        soilHum: 0,
                        genetic: "Haze",
                        daysOld: 53
                    },
                    {
                        name: "Plant 3",
                        soilHum: 0,
                        genetic: "Destroyer",
                        daysOld: 53
                    },
                    {
                        name: "Plant 4",
                        soilHum: 0,
                        genetic: "Destroyer",
                        daysOld: 53
                    }
                ]);
              } catch (error) {
                console.log('%cApp.vue line:68 error', 'color: #007acc;', error);
                commit('updateNotifications', "Update Failed");
                commit('updateServerStatus', "DOWN");
              }
        },
        async fetchPlantsSensors ({ commit }) {
            try {
                const response = await axios.get('http://192.168.0.7/sensor3');
                let currentTime = new Date();
                commit('updateLastServerResponse', currentTime);
                const {soilHum} = response.data;
                console.log('%cmain.js line:103 soilHum', 'color: #007acc;', soilHum);
                commit('updateServerStatus', "UP");
                // commit('updatePlants', [
                //     {
                //         name: "Plant 1",
                //         soilHum: soilHum,
                //         genetic: "Haze",
                //         daysOld: 32
                //     },
                //     {
                //         name: "Plant 2",
                //         soilHum: 0,
                //         genetic: "Haze",
                //         daysOld: 53
                //     },
                //     {
                //         name: "Plant 3",
                //         soilHum: 0,
                //         genetic: "Destroyer",
                //         daysOld: 53
                //     },
                //     {
                //         name: "Plant 4",
                //         soilHum: 0,
                //         genetic: "Destroyer",
                //         daysOld: 53
                //     }
                // ]);
              } catch (error) {
                console.log('%cApp.vue line:68 error', 'color: #007acc;', error);
                commit('updateNotifications', "Update Failed");
                commit('updateServerStatus', "DOWN");
              }
        },
        async switchLight ({ commit }) {
            try {
                const response = await axios.get('http://localhost:3000/switch-light');
                console.log('%cmain.js line:146 response', 'color: #007acc;', response.data.lightStatus);
                const lightStatus = response.data.lightStatus == "ON" ? true : false;
                commit('updateLogs', (lightStatus) ? "Light turned on" : "Light turned off");
                commit('updateLightStatus', lightStatus);
            } catch (error) {
                console.log('%cApp.vue line:68 [switchLight] error', 'color: #007acc;', error);
                commit('updateNotifications', "SwitchLight Failed");
            }
        },
        switchFan ({ commit }) {
            commit('updateFanStatus');
        },
        getReferenceTemp ({ commit }) {
            let referenceTemp = {min: 0, max: 99};
            if (this.state.currentStage === "vegetative") {
                if (this.state.lightStatus === false) {
                    referenceTemp =  { min: 20, max: 25 };
                } else {
                    referenceTemp = { min: 20, max: 30 };
                }
            } else if (this.state.currentStage === "flowering") {
                if (this.state.lightStatus === false) {
                    referenceTemp = { min: 18, max: 23 };
                } else {
                    referenceTemp = { min: 18, max: 26 };
                }
            } else if (this.state.currentStage === "harvest") {
                if (this.state.lightStatus === false) {
                    referenceTemp = { min: 18, max: 23 };
                } else {
                    referenceTemp = { min: 18, max: 26 };
                }
            }
            commit('updateReferenceTemp', referenceTemp);
        },
        getReferenceHum ({ commit }) {
            let referenceHum = {};
            if (this.state.currentStage == "vegetative") {
                referenceHum =  { min: 40, max: 60 };
            } else if (this.state.currentStage == "flowering") {
                referenceHum = { min: 40, max: 50 };
            } else if (this.state.currentStage == "harvest") {
                referenceHum = { min: 0, max: 99 };
            }
            commit('updateReferenceHum', referenceHum);
        },
        async getPlants ({ commit }) {
            console.log('%cmain.js line:190 getPlants', 'color: #007acc;', "[getPlants]");
            try {
                const response = await axios.get('http://localhost:3000/plants');
                const plants = response.data.plants;
                console.log('%cmain.js line:215 plants', 'color: #007acc;', plants);
                commit('updateLogs', "Updated plants from server");
                commit('updateServerStatus', "UP");
                commit('updatePlants', plants);
            } catch (error) {
                console.log('%cApp.vue line:68 [switchLight] error', 'color: #007acc;', error);
                commit('updateNotifications', "Updated plants Failed");
            }
        },
        clearLogs ({ commit }) {
            commit('updateLogs', []);
        },
        clearNotifications ({ commit }) {
            commit('updateNotifications', []);
        },
        changeStage ({ commit, dispatch }) {
            let newStage = "";
            if (this.state.currentStage === "") {
                newStage = "vegetative";
            }
            if (this.state.currentStage === "vegetative") {
                newStage = "flowering";
            }
            if (this.state.currentStage === "flowering") {
                newStage = "harvest";
            }
            if (this.state.currentStage === "harvest") {
                newStage = "vegetative";
            }
            commit('updateLogs', "Stage changed to " + newStage);
            commit('updateCurrentStage', newStage);
            dispatch('getReferenceTemp');
            dispatch('getReferenceHum');
        }
    },
    mutations: {
        increment (state) {
            state.count++
        },
        updateSensor1 (state, payload) {
            let newValue = [...state.sensor1];
            newValue.push(payload);
            state.sensor1 = newValue;
        },
        updateHum (state, payload) {
            if (payload > 99) {
                return;
            }
            let newValue = [...state.sensor2];
            newValue.push(payload);
            state.sensor2 = newValue;
            state.currentHum = payload;
        },
        updateTemperature (state, payload) {
            // Temp
            if (payload > 99) {
                return;
            }
            let newValue = [...state.sensor3];
            newValue.push(payload);
            state.sensor3 = newValue;
            state.currentTemp = payload;
        },
        updateTime (state) {
            let currentTime = new Date();
            let hours = currentTime.getHours();
            let minutes = currentTime.getMinutes();
            state.currentTime = hours + ":" + minutes;
        },
        updateTimeStamps (state) {
            let currentTime = new Date();
            let hours = currentTime.getHours();
            let minutes = currentTime.getMinutes();
            let newValue = [...state.timeStamps];
            newValue.push(hours + ":" + minutes);
            state.timeStamps = newValue;
        },
        updateLightStatus (state, payload) {
            state.lightStatus = payload;
        },
        updateFanStatus (state) {
            state.fanStatus = !state.fanStatus;
        },
        updateReferenceTemp (state, payload) {
            state.referenceTemp = payload;
        },
        updateReferenceHum (state, payload) {
            state.referenceHum = payload;
        },
        updatePlants (state, payload) {
            console.log('%cmain.js line:305 "[updatePlants]"', 'color: #007acc;', "[updatePlants]");
            // console.log('%cmain.js line:284 payload', 'color: #007acc;', payload);
            state.plants = payload;
            // payload.forEach((plant, index) => {
            //     console.log('%cmain.js line:272 state.plants[index].soilHum', 'color: #007acc;', state.plants[index]);
            //     let newPlantsArray = [...state.plants[index].soilHum];
            //     console.log('%cmain.js line:273 newPlantsArray', 'color: #007acc;', newPlantsArray);
            //     let newTimeStampValue = (state.plants[index].timeStamps) ? [...state.plants[index].timeStamps] : [];
            //     let currentTime = new Date();
            //     let hours = currentTime.getHours();
            //     let minutes = currentTime.getMinutes();
            //     const timeStamp = hours + ":" + minutes
            //     newPlantsArray.push(plant.soilHum);
            //     console.log('%cmain.js line:280 newPlantsArray', 'color: #007acc;', newPlantsArray);
            //     newTimeStampValue.push(timeStamp);
            //     state.plants[index].soilHum = newPlantsArray;
            //     state.plants[index].name = plant.name;
            //     state.plants[index].genetic = plant.genetic;
            //     state.plants[index].daysOld = plant.daysOld;
            //     state.plants[index].timeStamps = newTimeStampValue;
            // });
        },
        updateNotifications (state, payload) {
            if (payload.length == 0) {
                state.notifications = [];
                return;
            }
            let newNotificationsArray = [...state.notifications];
            newNotificationsArray.push(payload);
            state.notifications = newNotificationsArray;
        },
        updateLogs (state, payload) {
            if (payload.length == 0) {
                state.logs = [];
                return;
            }
            let newLogsArray = [...state.logs];
            let currentTime = new Date();
            newLogsArray.push({
                message: payload,
                timeStamp: currentTime
            });
            state.logs = newLogsArray;
        },
        updateCurrentStage (state, payload) {
            state.currentStage = payload;
        },
        updateServerStatus (state, payload) {
            state.serverStatus = payload;
        },
        updateLastServerResponse (state, payload) {
            state.lastServerResponse = payload;
        }
    },
    plugins: [vuexLocal.plugin]
})

createApp(App).use(store).use(vuetify).mount('#app')