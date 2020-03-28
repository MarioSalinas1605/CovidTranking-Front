import mapStyles from './map-styles.js'

const $map = document.querySelector('#map')
const map = new window.google.maps.Map($map, {
    center: { lat: 20, lng: 0 },
    zoom: 2.2,
    styles: mapStyles
})
const popup = new window.google.maps.InfoWindow()

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
        if (item.confirmed) {
            const marker = new window.google.maps.Marker({
                position: { lat: item.location.lat, lng: item.location.lng },
                map,
                icon: './icon.png'
            })
            marker.addListener('click', () => {
                popup.setContent(renderExtraData(item))
                popup.open(map, marker)
            })
        }
    });
}

function renderExtraData({ confirmed, deaths, recovered, provincestate, countryregion}) {
    return `
    <div>
        <p> <strong> ${provincestate} - ${countryregion} </strong> </p>
        <p> Confirmados: ${confirmed} </p>
        <p> Muertes: ${deaths}  </p>
        <p> Recuperados: ${recovered} </p>
    </div>
    `
}