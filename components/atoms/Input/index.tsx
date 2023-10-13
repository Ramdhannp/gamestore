export interface InputProps {
	label: string;
	placeHolder: string;
}
export default function Input(props) {
	const { label, placeHolder, ...nativeProps } = props;
	return (
		<>
			<label
				htmlFor="phone"
				className="form-label text-lg fw-medium color-palette-1 mb-10"
			>
				{label}
			</label>
			<input
				type="tel"
				className="form-control rounded-pill text-lg"
				id="phone"
				name="phone"
				aria-describedby="phone"
				placeholder={placeHolder}
				{...nativeProps}
			/>
		</>
	);
}
