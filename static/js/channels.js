import * as channelsList from '../channels.json' assert { type: "json" };
const channelsDefault = channelsList.default
var channels = channelsList.default

//create initial channels list from default
document.getElementById("main-channels").innerHTML = ""
channelsDefault.forEach(function (item, index) {
    createChannelBlock(item)
});


//render block with channel data
function createChannelBlock(channelData) {
    //wrapper
    var channelBlock = document.createElement("button")
    channelBlock.className = "channel"
    channelBlock.setAttribute("value", channelData.customUrl)

    //image
    var channelImg = document.createElement("img")
    channelImg.className = "channel__img"
    channelImg.src = channelData.thumbnails.medium.url

    //title
    var channelTitle = document.createElement("div")
    channelTitle.className = "channel__title"
    channelTitle.innerText = channelData.title

    //stats
    var channelStats = document.createElement("div")
    channelStats.className = "channel__stats"

    //stats children
    function createStatsChildren(label, value) {
        var stats = document.createElement("div")
        stats.className = "stats__child"

        var statsLabel = document.createElement("label")
        statsLabel.innerText = label

        var statsValue = document.createElement("span")
        statsValue.innerText = value.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ","); //add commas to number values

        stats.append(statsLabel, statsValue)
        return stats
    }

    var channelStatsSubs = createStatsChildren("Subscribers", channelData.statistics.subscriberCount)
    var channelStatsVideos = createStatsChildren("Videos", channelData.statistics.videoCount)
    var channelStatsViews = createStatsChildren("Views", channelData.statistics.viewCount)

    channelStats.append(channelStatsSubs, channelStatsVideos, channelStatsViews)

    //create structure and add it to chanel wrapper
    channelBlock.append(channelImg, channelTitle, channelStats)
    document.querySelector("#main-channels").append(channelBlock)
}


//render all chanels
function displayChannels(channelsData) {
    document.getElementById("main-channels").innerHTML = ""
    channelsData.forEach(function (item, index) {
        createChannelBlock(item)
    })
}


//open channel link after click
document.getElementsByClassName("channel")[0].onclick = function () {
    window.open(this.value + "?timestamp=" + Date.now(), '_blank');
}


//radio buttons sort
var sortChannelsRadios = document.querySelectorAll('.sort input[name=sort]')
var sortChannelsDirection = document.querySelectorAll('.sort input[name=sort-type]')
var lastCheckedRadio = null

//event after choose "sort channels by" radio button
sortChannelsRadios.forEach(radio => radio.addEventListener('change', () => {
    lastCheckedRadio = radio
    sortChannels(radio)
}))

//event after choose ascending or descending sorting direction
sortChannelsDirection.forEach(radio => radio.addEventListener('change', () => {
    sortChannels(lastCheckedRadio)
}))

function sortChannels(radio) {
    var radioSelected = radio.id.slice(5)
    var sortDir = document.getElementById('sort-asc').checked

    switch (radioSelected) {
        case "title":
            if (sortDir) channels.sort((a, b) => (a.title > b.title) ? 1 : -1)
            else channels.sort((a, b) => (a.title < b.title) ? 1 : -1)
            break;
        case "subscribers":
            if (sortDir) channels.sort((a, b) => (a.statistics.subscriberCount.toString().replace(/\D/g, '') > b.statistics.subscriberCount.toString().replace(/\D/g, '')) ? 1 : -1)
            else channels.sort((a, b) => (a.statistics.subscriberCount.toString().replace(/\D/g, '') < b.statistics.subscriberCount.toString().replace(/\D/g, '')) ? 1 : -1)
            break;
        case "videos":
            if (sortDir) channels.sort((a, b) => (a.statistics.videoCount.toString().replace(/\D/g, '') > b.statistics.videoCount.toString().replace(/\D/g, '')) ? 1 : -1)
            else channels.sort((a, b) => (a.statistics.videoCount.toString().replace(/\D/g, '') < b.statistics.videoCount.toString().replace(/\D/g, '')) ? 1 : -1)
            break;
        case "views":
            if (sortDir) channels.sort((a, b) => (a.statistics.viewCount.toString().replace(/\D/g, '') > b.statistics.viewCount.toString().replace(/\D/g, '')) ? 1 : -1)
            else channels.sort((a, b) => (a.statistics.viewCount.toString().replace(/\D/g, '') < b.statistics.viewCount.toString().replace(/\D/g, '')) ? 1 : -1)
            break;
    }

    displayChannels(channels)
}

//clear sorting - it works for filtering, but for some reason it
//won't reset channelsDefault order (const changed??)
document.querySelector('#sort__clear').addEventListener('click', () => {
    document.getElementsByClassName("filter__input")[0].value = ""
    channels = channelsDefault
    displayChannels(channels)
})


//text filtering
document.querySelector('.filter__input').addEventListener('keyup', function () {
    channels = channelsDefault
    var filteredChannels = []
    channels.find(o => {
        if (o.title.includes(this.value)) filteredChannels.push(o)
    })
    channels = filteredChannels;
    (channels.length > 0) ? displayChannels(channels) : document.getElementById("main-channels").innerHTML = "<p class='channel__not_found'>No channels found</p>"
})
