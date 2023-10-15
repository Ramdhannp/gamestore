import Sidebar from '../../../components/organisms/Sidebar'
import TransactionsDetailContent from '../../../components/organisms/TransactionDetailContent'

export default function Transactionsdetail () {
  return (
    <section className="transactions-detail overflow-auto">
      <Sidebar activeMenu='transactions'/>
      <TransactionsDetailContent />
    </section>
  )
}
