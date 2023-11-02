import { useState } from 'react'
import { type BanksTypes, type NominalsType, type PaymentsTypes } from '../../../services/data-types'
import NominalItem from './NominalItem'
import PaymentItem from './PaymentItem'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

interface TopUpFormProps {
  nominals: NominalsType[]
  payments: PaymentsTypes[]
}

export default function TopUpForm (props: TopUpFormProps) {
  const { nominals, payments } = props
  const [verifyID, setVerifyID] = useState('')
  const [bankAccountName, setBankAccountName] = useState('')
  const [nominalItem, setNominalItem] = useState({})
  const [paymentItem, setPaymentItem] = useState({})
  const router = useRouter()

  const onNominalItemChange = (data: NominalsType) => {
    setNominalItem(data)
  }
  const onPaymentBankChange = (bank: BanksTypes, payments: PaymentsTypes) => {
    setPaymentItem({ bank, payments })
  }

  const onSubmit = () => {
    if (verifyID === '' || bankAccountName === '' || !paymentItem || !nominalItem) {
      toast.error('Semua data harus disi')
    } else {
      const data = {
        verifyID,
        nominalItem,
        bankAccountName,
        paymentItem
      }
      localStorage.setItem('data-topup', JSON.stringify(data))
      router.push('/checkout')
    }
  }

  return (
    <>
      <div className="pt-md-50 pt-30">
        <div className="">
          <label
            htmlFor="ID"
            className="form-label text-lg fw-medium color-palette-1 mb-10"
          >
            Verify ID
          </label>
          <input
            type="text"
            className="form-control rounded-pill text-lg"
            id="ID"
            aria-describedby="verifyID"
            placeholder="Enter your ID"
            value={verifyID}
            onChange={(event) => { setVerifyID(event.target.value) }}
          />
        </div>
      </div>
      <div className="pt-md-50 pb-md-50 pt-30 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Nominal Top Up
        </p>
        <div className="row justify-content-between">
          {nominals.map((nominal) => {
            return (
              <NominalItem key={nominal._id} coinName={nominal.coinName} coinQuantity={nominal.coinQuantity} price={nominal.price} id={nominal._id} onChange={() => { onNominalItemChange(nominal) }} />
            )
          })}
          <div className="col-lg-4 col-sm-6"></div>
        </div>
      </div>
      <div className="pb-md-50 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Payment Method
        </p>
        <fieldset id="paymentMethod">
          <div className="row justify-content-between">
            {payments.map((payment) => payment.banks.map((bank) => {
              return (
                <PaymentItem key={bank._id} type={payment.type} bankName={bank.bankName} id={bank._id} onChange={() => { onPaymentBankChange(bank, payment) }} />
              )
            }
            ))
            }
            <div className="col-lg-4 col-sm-6"></div>
          </div>
        </fieldset>
      </div>
      <div className="pb-50">
        <label
          htmlFor="bankAccount"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Bank Account Name
        </label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          id="bankAccount"
          name="bankAccount"
          aria-describedby="bankAccount"
          placeholder="Enter your Bank Account Name"
          value={bankAccountName}
          onChange={(event) => { setBankAccountName(event.target.value) }}
        />
      </div>
      <div className="d-sm-block d-flex flex-column w-100">
        <button
          type="button"
          className="btn btn-submit rounded-pill fw-medium text-white border-0 text-lg"
          onClick={onSubmit}
        >
          Continue
        </button>
      </div>
    </>
  )
}
