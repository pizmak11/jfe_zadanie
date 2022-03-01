//current view
var date = new Date()
var day = date.getDay()
var month = date.toLocaleString('default', { month: 'long' }).substring(0, 3)
var year = date.getFullYear()
var currentView = day + ' ' + month + ' ' + year

localStorage.setItem("currentView", currentView)


//last view
if (localStorage.getItem("lastView")) {
    localStorage.setItem("lastView", currentView)
}


//views counter
if (localStorage.getItem("views")) {
    var views = parseInt(localStorage.getItem("views"))
    localStorage.setItem("views", ++views)
} else {
    localStorage.setItem("views", 1)
}

console.log("Page views:", localStorage.getItem("views"))
console.log("Last view date:", localStorage.getItem("lastView"))
console.log("Current view date:", localStorage.getItem("currentView"))

//set current view as last view
localStorage.setItem("lastView", currentView)