import axios from 'axios'

const apiUrl = '/api'

export const sendDataToEmail = formData => {
  const baseUrl = `${apiUrl}/send`
  return axios.post(baseUrl, formData)
}
