# Progressive Sensor Client

### Some definitions

We have tents, we have plants.

Each tent can have more than one plant.
Each tent will have at least Hummidity and Temperature sensors.
Each tent should have a unique name.

tent:
    Name
    Stage
    Temperature:
        {
            "value": 0,
            "timestamp": 0
        }
    Humidity
    Plants
    Air Status
    Water Status

plants: [
    {
    name: "",
    genetic: "",
    soil_humidity:
        [
            {
                "value": 0,
                "timestamp": 0
            }
        ]
    }
]


### Server project
[Progressive Sensor Server](https://github.com/smarbos/progressiveSensorServer)

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
