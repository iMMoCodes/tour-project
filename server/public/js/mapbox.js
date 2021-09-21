export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiaW1tb21tbyIsImEiOiJja3RzMjhlMWMxYzE2MnZxdXNzZGRvZDNuIn0.bM8T0Qj9qdHYRALU2wuvZQ'

  let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/immommo/ckts2ydw330y017o2neuuenm2',
    scrollZoom: false,
  })

  const bounds = new mapboxgl.LngLatBounds()

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div')
    el.className = 'marker'

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map)

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map)

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates)
  })

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  })
}
