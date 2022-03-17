type LatLngLiteral = {
  lat: string
  lng: string
}

type Response = {
  latt: string
  longt: string
}

const geocode = async (city: string, country: string): Promise<LatLngLiteral> => {
  const res = await fetch(`https://geocode.xyz/${city},${country}?json=1`)
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  if (res.body === null) {
    throw new Error('Geocode failed')
  }
  const data = (await res.json()) as Response
  return {
    lat: data.latt,
    lng: data.longt,
  }
}

export default geocode
