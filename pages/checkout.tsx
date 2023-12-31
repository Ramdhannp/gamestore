import { jwtDecode } from 'jwt-decode'
import Image from 'next/image'
import CheckoutConfirmation from '../components/organisms/CheckoutConfirmation'
import CheckoutDetail from '../components/organisms/CheckoutDetail'
import CheckoutItem from '../components/organisms/CheckoutItem'
import { type JwtPayloadTypes, type UserTypes } from '../services/data-types'
import Head from 'next/head'

interface CheckoutTypes {
  user: UserTypes
}

export default function Checkout (props: CheckoutTypes) {
  return (
    <section className="checkout mx-auto pt-md-100 pb-md-145 pt-30 pb-30">
      <Head><title>Checkout</title></Head>
      <div className="container-fluid">
        <div className="logo text-md-center text-start pb-50">
          <a className="" href="#">
            <Image src="/icon/logo.svg" alt="logo" width={60} height={60} />
          </a>
        </div>
      <div className="title-text pt-md-50 pt-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-10">Checkout</h2>
        <p className="text-lg color-palette-1 mb-0"> Waktunya meningkatkan cara bermain</p>
      </div>
      <CheckoutItem />
      <hr />
      <CheckoutDetail />
      <CheckoutConfirmation />
      </div>
    </section>
  )
}

interface getServerSidePropsTypes {
  req: {
    cookies: {
      token: string
    }
  }
}

export async function getServerSideProps ({ req }: getServerSidePropsTypes) {
  const { token } = req.cookies
  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false
      }
    }
  }
  const jwtToken = Buffer.from(token, 'base64').toString('ascii') // decode menjadi jwt
  const payload: JwtPayloadTypes = jwtDecode(jwtToken)
  const userFromPayload: UserTypes = payload.player
  const urlImage = process.env.NEXT_PUBLIC_IMAGE
  userFromPayload.avatar = `${urlImage}/${userFromPayload.avatar}`
  return {
    props: {
      user: userFromPayload
    }
  }
}
