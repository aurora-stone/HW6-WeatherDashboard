document.getElementById("search").addEventListener("click", function(){

    var city = document.getElementById("input").value
    var url = "http://api.openweathermap.org/data/2.5/forecast?q="+ city +"&appid=60ebe634619c5700bf67dc2646a55408&units=imperial"

    fetch(url)
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        console.log(data)
    
        document.getElementById("city").innerText = data.city.name
        document.getElementById("date").innerText = dayjs.unix(data.list[0].dt).format("M/D/YYYY")
        document.getElementById("temp").innerText = data.list[0].main.temp
        document.getElementById("wind").innerText = data.list[0].wind.speed
        document.getElementById("humidity").innerText = data.list[0].main.humidity
        document.getElementById("icon").src = "https://openweathermap.org/img/wn/"+ data.list[0].weather[0].icon +"@2x.png"
        for(var i = 7; i < data.list.length; i += 8){
            var day = data.list[i]
            var fiveDate = document.createElement("p")
            fiveDate.innerText = dayjs.unix(day.dt).format("M/D/YYYY")
            document.getElementById("five").appendChild(fiveDate)

            var fiveTemp = document.createElement("p")
            fiveTemp.innerText = day.main.temp
            document.getElementById("five").appendChild(fiveTemp)

            var fiveWind = document.createElement("p")
            fiveWind.innerText = day.wind.speed
            document.getElementById("five").appendChild(fiveWind)

            var fiveHumidity = document.createElement("p")
            fiveHumidity.innerText = day.main.humidity
            document.getElementById("five").appendChild(fiveHumidity)

            var fiveIcon = document.createElement("img")
            fiveIcon.src = "https://openweathermap.org/img/wn/"+ day.weather[0].icon +"@2x.png"
            document.getElementById("five").appendChild(fiveIcon)
        }
    })
}
)