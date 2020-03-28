const $map = document.querySelector('#map')
const map = new window.google.maps.Map($map, {
    center: { lat: 0, lng: 0 },
    zoom: 2
})

renderData()

async function getData() {
    const response = await fetch('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest')
    const data = await response.json()
    return data 
}

async function renderData() {
    const data = await getData()
    console.log(data);

    data.forEach(item => {
        new window.google.maps.Marker({
            position: { lat: item.location.lat, lng: item.location.lng },
            map
        })
    });
}