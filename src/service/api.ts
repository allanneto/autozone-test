import axios from 'axios'

const api = axios.create({
  baseURL: 'https://vpic.nhtsa.dot.gov/api/',
})

export const getAllMakes = async () => {
    const response = await api.get('vehicles/GetAllMakes?format=json')
    return response.data
}

export const getModelsByMakeIdAndYear = async (makeId: string, year: string) => {
  console.log(makeId, year)
  try {
    const response = await api.get(`vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`)
    return response.data
  } catch (error) {
    console.log(error)
    window.alert("Error getting models for make and year.")
  }
}
