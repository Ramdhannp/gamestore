import { type setLogInTypes } from './data-types'
import callApi from '../config/api'

const ROOT_API = process.env.NEXT_PUBLIC_API
const API_VERSION = 'api/v1'

export async function setSignUp (data: FormData) {
  const url = `${ROOT_API}/${API_VERSION}/auth/signup`

  return await callApi({
    url,
    method: 'POST',
    data
  })
}

export async function setLogIn (data: setLogInTypes) {
  const url = `${ROOT_API}/${API_VERSION}/auth/signin`

  return await callApi({
    url,
    method: 'POST',
    data
  })
}
