import { useCallback, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { toast } from 'react-toastify'
import { getMemberHistory } from '../../../services/member'
import ButtonTab from './ButtonTab'
import TableRow from './TableRow'

export default function TransactionsContent () {
  const [total, setTotal] = useState('')
  const [data, setData] = useState<any[]>([])
  const [tab, setTab] = useState('all')

  const getMemberHistoryApi = useCallback(async (params: string) => {
    const response = await getMemberHistory(params)
    if (response.error) {
      toast.error(response.message)
    } else {
      setTotal(response.data.total)
      setData(response.data.data)
    }
  }, [getMemberHistory])

  const onTab = (value: string) => {
    getMemberHistoryApi(value)
    setTab(value)
  }
  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          My Transactions
        </h2>
        <div className="mb-30">
          <p className="text-lg color-palette-2 mb-12">You’ve spent</p>
          <h3 className="text-5xl fw-medium color-palette-1">
          <NumericFormat value={total} prefix="Rp. " displayType="text" thousandSeparator='.' decimalSeparator=","/>
          </h3>
        </div>
        <div className="row mt-30 mb-20">
          <div className="col-lg-12 col-12 main-content">
            <div id="list_status_title">
              <ButtonTab title="All Trx" onClick= {() => { onTab('all') } } active={tab === 'all'} />
              <ButtonTab title="Success" onClick= {() => { onTab('success') } } active={tab === 'success'} />
              <ButtonTab title="Pending" onClick= {() => { onTab('pending') } } active={tab === 'pending'} />
              <ButtonTab title="Failed" onClick= {() => { onTab('failed') } } active={tab === 'failed'} />
            </div>
          </div>
        </div>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">
            Latest Transactions
          </p>
          <div className="main-content main-content-table overflow-auto">
            <table className="table table-borderless">
              <thead>
                <tr className="color-palette-1">
                  <th className="" scope="col">
                    Game
                  </th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list_status_item">
                {data.map((item) => (
                  <TableRow
                    key={item._id}
                    title= {item.historyVoucherTopup.gameName}
                    category={item.historyVoucherTopup.category}
                    item={`${item.historyVoucherTopup.coinQuantity} ${item.historyVoucherTopup.coinName}`}
                    price={item.historyVoucherTopup.price}
                    status={item.status}
                    image={item.historyVoucherTopup.thumbnail}
                    id={item._id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
