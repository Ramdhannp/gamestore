import axios from 'axios'
import callApi from '../config/api'
import { type checkoutTypes } from './data-types'

const ROOT_API = process.env.NEXT_PUBLIC_API
const API_VERSION = 'api/v1'

export async function getFeaturedGame () {
  const URL = 'players/landingpage'

  const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`)
  const axiosResponse = response.data

  return axiosResponse.data
}

export async function getDetailVoucher (id: string) {
  const URL = `players/${id}/detail`

  const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`)
  const axiosResponse = response.data

  return axiosResponse.data
}

export async function getGameCategory () {
  const URL = 'players/category'

  const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`)
  const axiosResponse = response.data

  return axiosResponse.data
}

export async function setCheckout (data: checkoutTypes) {
  const url = `${ROOT_API}/${API_VERSION}/players/checkout`

  return await callApi({
    url,
    method: 'POST',
    data,
    token: true
  })
}
