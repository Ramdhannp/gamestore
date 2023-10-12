import Sidebar from "../../../components/organisms/Sidebar";
import TransactionsContent from "../../../components/organisms/TransactionsContent";

export default function Transactions() {
	return (
		<section className="transactions overflow-auto">
			<Sidebar activeMenu="transactions" />
			<TransactionsContent />
		</section>
	);
}
