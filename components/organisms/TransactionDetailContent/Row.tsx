import { NumericFormat } from 'react-number-format'

interface RowProps {
  label: string
  value: string | number
  className?: string
  price?: boolean
}

export default function Row (props: Partial<RowProps>) {
  const { label, value, className, price } = props
  return (
    <p className="text-lg color-palette-1 mb-20">
      {label} <span className={`purchase-details ${className}`}>
        {price ? <NumericFormat value={value} prefix="Rp. " displayType="text" thousandSeparator='.' decimalSeparator=","/> : value}
        </span>
    </p>
  )
}
