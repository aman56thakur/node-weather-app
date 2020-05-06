const weatherForm = document.querySelector('form')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const city = document.getElementById('input_city').value
    const country = document.getElementById('input_country').value
    const url = '/weather?city=' + city + '&country=' + country

    fetch(url).then((response) => {
        response.json().then((data) => {
            document.getElementById('para_2').innerHTML = ""
            document.getElementById('para_3').innerHTML = ""
            if (data.error) return document.getElementById('para_1').innerHTML = data.error
            document.getElementById('para_1').innerHTML = "City:\t" + data.city
            document.getElementById('para_2').innerHTML = "Condition:\t" + data.condition
            document.getElementById('para_3').innerHTML = "Temp:\t" + data.temperature
        })
    })
    document.getElementById("input_city").blur
    document.getElementById("input_country").blur
})