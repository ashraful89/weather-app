
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const add = document.querySelector('#add')
const temp = document.querySelector('#temp')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    
    add.textContent = 'Loading.....'

    const location = search.value

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error)
            } else {
                add.textContent = 'Location : ' + data.Forecast.location
                temp.textContent = 'Temperature : ' + data.Forecast.temperature + '  degree celcius'
            }
        })
    })
})