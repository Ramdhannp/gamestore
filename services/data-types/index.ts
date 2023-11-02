export interface CategoryTypes {
  _id: string
  name: string
  __v: number
}

export interface GameItemTypes {
  _id: string
  name: string
  thumbnail: string
  status: string
  category: CategoryTypes
}

export interface BanksTypes {
  _id: string
  bankName: string
}

export interface PaymentsTypes {
  _id: string
  type: string
  banks: BanksTypes[]
}

export interface NominalsType {
  _id: string
  price: number
  coinQuantity: number
  coinName: string
}

export interface setLogInTypes {
  email: string
  password: string
}

export interface UserTypes {
  name: string
  email: string
  avatar: string
  _id: string
  userName: string
}

export interface JwtPayloadTypes {
  player: UserTypes
  iat: number
}

export interface checkoutTypes {
  voucher: string
  nominal: string
  payment: string
  bank: string
  name: string
  accountUser: string
}

export interface categoryTopupTypes {
  name: string
  value: number
  _id: string
}

export interface historyVoucherTopupTypes {
  gameName: string
  coinQuantity: number
  coinName: string
  price: number
  thumbnail: string
}

export interface historyTransactionTypes {
  _id: string
  historyVoucherTopup: historyVoucherTopupTypes
  status: string
  category: CategoryTypes
}

export interface HistoryPaymentsTypes {
  name: string
  type: string
  bankname: string
  noRekening: string
}

export interface TransactionDetailTypes {
  historyVoucherTopup: {
    gameName: string
    category: string
    thumbnail: string
    coinName: string
    coinQuantity: number
    price: number
  }
  historyPayment: HistoryPaymentsTypes
  historyUser: {
    name: string
    phoneNumber: number
  }
  _id: string
  name: string
  accountUser: string
  tax: number
  value: number
  status: string
  player: string
  category: string
  user: string
  __v: number
}
