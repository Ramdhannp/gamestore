import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { type JwtPayloadTypes, type UserTypes } from '../../../services/data-types'
import { useRouter } from 'next/router'

export default function Auth () {
  const [user, setUser] = useState({
    avatar: '',
    email: '',
    name: ''
  })
  const [isLogin, setIsLogin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      const jwtToken = atob(token)
      const payload: JwtPayloadTypes = jwtDecode(jwtToken)
      const userFromPayload: UserTypes = payload.player
      const urlImage = process.env.NEXT_PUBLIC_IMAGE
      userFromPayload.avatar = `${urlImage}/${userFromPayload.avatar}`
      setUser(userFromPayload)
      setIsLogin(true)
    }
  }, [])

  const logOut = () => {
    Cookies.remove('token')
    setIsLogin(false)
    router.push('/')
  }

  if (isLogin) {
    return (
      <li className="nav-item my-auto dropdown d-flex">
        <div className="vertical-line d-lg-block d-none"></div>
        <div>
          <a
            className="dropdown-toggle ms-lg-40"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Image
              src={`${user.avatar}`}
              className="rounded-circle"
              width={40}
              height={40}
              alt=""
            />
          </a>

          <ul
            className="dropdown-menu border-0"
            aria-labelledby="dropdownMenuLink"
          >
            <li>
              <Link
                className="dropdown-item text-lg color-palette-2"
                href="/member"
              >
                My Profile
              </Link>
            </li>
            <li>
              <Link className="dropdown-item text-lg color-palette-2" href="/">
                Wallet
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item text-lg color-palette-2"
                href="/member/edit-profile"
              >
                Account Settings
              </Link>
            </li>
            <li onClick={logOut} style={{ cursor: 'pointer' }}>
              <a
                className="dropdown-item text-lg color-palette-2"
              >
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </li>
    )
  }
  return (
    <li className="nav-item my-auto">
      <Link
        className="btn btn-sign-in d-flex justify-content-center ms-lg-2 rounded-pill"
        href="/sign-in"
        role="button"
      >
        Sign In
      </Link>
    </li>
  )
}
