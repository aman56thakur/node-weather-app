const request = require('request')
const fs = require('fs')
const chalk = require('chalk')
const path = require('path')

const loadData = () => {
    try {
        const jsonDirectory = path.join(__dirname, '/city.list.json')
        const dataBuffer = fs.readFileSync(jsonDirectory)
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const getWeather = (cityName, countryCode, callback) => {

    const weatherData = loadData()
    const requestedCity = weatherData.filter((city) => city.name === cityName && city.country === countryCode)

    if (requestedCity.length === 0) callback('City/Country is incorrect, Please try again!')
    else {
        const id = requestedCity[0].id
        const url = 'https://api.openweathermap.org/data/2.5/weather?id=' + id + '&appid=6b8630e18537115c76c10d09f8aa7ee3'

        request({
            url,
            json: true
        }, (error, response) => {

            if (error) callback('Unable to connect to weather service')
            else {
                const celcius = (response.body.main.temp - 273.15).toFixed(2)
                const farhen = ((celcius * 1.8) + 32).toFixed(2)
                const temp = celcius.toString() + '°C / ' + farhen.toString() + '°F'
                const condition = response.body.weather[0].main
                const city = response.body.name

                callback(undefined, temp, condition, city)
            }
        })
    }
}

module.exports = {
    getWeather: getWeather
}