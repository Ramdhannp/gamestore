import Link from "next/link";
interface FooterItemProps {
	listItem: string;
	goTo?: string;
}

export default function FooterItem(props: FooterItemProps) {
	const { listItem, goTo = "" } = props;
	return (
		<li className="mb-6">
			<Link
				href={goTo}
				className="text-lg color-palette-1 text-decoration-none"
			>
				{listItem}
			</Link>
		</li>
	);
}
