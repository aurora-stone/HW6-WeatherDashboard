function displayHistory(){
document.getElementById("history").innerHTML = ""
var storage = JSON.parse(localStorage.getItem("cities")) || []
for (var i = 0; i < storage.length; i++){
    var item = document.createElement("button")
    item.innerText = storage[i]
    item.addEventListener("click", function(event){
    search(event.target.innerText)
    })
    document.getElementById("history").appendChild(item)
}
}

displayHistory()
function search(history){
    var city = history || document.getElementById("input").value
    var url = "https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&appid=60ebe634619c5700bf67dc2646a55408&units=imperial"
    var storage = JSON.parse(localStorage.getItem("cities")) || []
    
if(!storage.includes(city)){
    storage.push(city)
}

    
    localStorage.setItem("cities", JSON.stringify(storage))
displayHistory()

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
        document.getElementById("five").innerHTML = ""
        for(var i = 7; i < data.list.length; i += 8){
            
            var cardEl = document.createElement("div")
            cardEl.classList.add("card")
            var day = data.list[i]
            var fiveDate = document.createElement("p")
            fiveDate.innerText = dayjs.unix(day.dt).format("M/D")
            // document.getElementById("five").appendChild(fiveDate)
            cardEl.appendChild(fiveDate)
            // append fiveDate to the card div

            var fiveTemp = document.createElement("p")
            fiveTemp.innerText = "Temperature: " + day.main.temp
            // document.getElementById("five").appendChild(fiveTemp)
            cardEl.appendChild(fiveTemp)

            var fiveWind = document.createElement("p")
            fiveWind.innerText = "Wind Speed: " + day.wind.speed
            // document.getElementById("five").appendChild(fiveWind)
            cardEl.appendChild(fiveWind)

            var fiveHumidity = document.createElement("p")
            fiveHumidity.innerText = "Humidity: " + day.main.humidity
            // document.getElementById("five").appendChild(fiveHumidity)
            cardEl.appendChild(fiveHumidity)

            var fiveIcon = document.createElement("img")
            fiveIcon.src = "https://openweathermap.org/img/wn/"+ day.weather[0].icon +"@2x.png"
            // document.getElementById("five").appendChild(fiveIcon)
            cardEl.appendChild(fiveIcon)

            document.getElementById("five").appendChild(cardEl)
        }
    })
} 

document.getElementById("search").addEventListener("click", function(){
search()
 
}
)