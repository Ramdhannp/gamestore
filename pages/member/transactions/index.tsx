import { jwtDecode } from 'jwt-decode'
import Sidebar from '../../../components/organisms/Sidebar'
import TransactionsContent from '../../../components/organisms/TransactionsContent'
import { type JwtPayloadTypes, type UserTypes } from '../../../services/data-types'
import Head from 'next/head'

export default function Transactions () {
  return (
    <section className="transactions overflow-auto">
      <Head><title>Transactions</title></Head>
      <Sidebar activeMenu="transactions" />
      <TransactionsContent />
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
