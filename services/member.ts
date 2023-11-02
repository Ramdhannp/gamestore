import callApi from '../config/api'

const ROOT_API = process.env.NEXT_PUBLIC_API
const API_VERSION = 'api/v1'

export async function getMemberOverview () {
  const url = `${ROOT_API}/${API_VERSION}/players/dashboard`

  return await callApi({
    url,
    method: 'GET',
    token: true
  })
}

export async function getMemberHistory (params: string) {
  if (params === 'all') {
    params = ''
  } else {
    params = `?status=${params}`
  }
  const url = `${ROOT_API}/${API_VERSION}/players/history${params}`

  return await callApi({
    url,
    method: 'GET',
    token: true
  })
}

export async function getTransactionDetail (id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/players/history/${id}/detail`

  return await callApi({
    url,
    method: 'GET',
    serverToken: token
  })
}

export async function editProfile (data: FormData) {
  const url = `${ROOT_API}/${API_VERSION}/players/profile`

  return await callApi({
    url,
    method: 'PUT',
    data,
    token: true
  })
}
