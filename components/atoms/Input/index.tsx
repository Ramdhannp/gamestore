export interface InputProps {
  label: string
  placeHolder: string
  value: string
  disabled?: boolean
  onChange?: (event) => void
}
export default function Input (props: InputProps) {
  const { label, placeHolder, ...nativeProps } = props
  return (
    <>
      <label
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
  )
}
