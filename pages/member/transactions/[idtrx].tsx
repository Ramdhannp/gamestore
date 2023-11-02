import { jwtDecode } from 'jwt-decode'
import Sidebar from '../../../components/organisms/Sidebar'
import TransactionsDetailContent from '../../../components/organisms/TransactionDetailContent'
import { type TransactionDetailTypes, type JwtPayloadTypes, type UserTypes } from '../../../services/data-types'
import { getTransactionDetail } from '../../../services/member'
import Head from 'next/head'

interface TransactionDetailProps {
  transactionDetail: TransactionDetailTypes
}

export default function Transactionsdetail (props: TransactionDetailProps) {
  const { transactionDetail } = props
  return (
    <section className="transactions-detail overflow-auto">
      <Head><title>Detail Transaction</title></Head>
      <Sidebar activeMenu='transactions'/>
      <TransactionsDetailContent data={transactionDetail} />
    </section>
  )
}

interface getServerSidePropsTypes {
  req: {
    cookies: {
      token: string
    }
  }
  params: {
    idtrx: string
  }
}

export async function getServerSideProps ({ req, params }: getServerSidePropsTypes) {
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
  const { idtrx } = params
  const response = await getTransactionDetail(idtrx, jwtToken)
  return {
    props: {
      transactionDetail: response.data
    }
  }
}
