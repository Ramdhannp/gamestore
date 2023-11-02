import Image from 'next/image'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { type JwtPayloadTypes, type UserTypes } from '../../../services/data-types'

export default function Profile () {
  const [user, setUser] = useState({
    avatar: '',
    email: '',
    name: ''
  })

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      const jwtToken = atob(token)
      const payload: JwtPayloadTypes = jwtDecode(jwtToken)
      const userFromPayload: UserTypes = payload.player
      const urlImage = process.env.NEXT_PUBLIC_IMAGE
      userFromPayload.avatar = `${urlImage}/${userFromPayload.avatar}`
      setUser(userFromPayload)
    }
  }, [])
  return (
    <div className="user text-center pb-50 pe-30">
      <Image
        src={user.avatar}
        width={90}
        height={90}
        className="mb-20 image-profile" alt={''}/>
      <h2 className="fw-bold text-xl color-palette-1 m-0">{user.name}</h2>
      <p className="color-palette-2 m-0">{user.email}</p>
    </div>
  )
}
