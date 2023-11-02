import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function CheckoutItem () {
  const [dataItem, setDataItem] = useState({
    name: '',
    thumbnail: '',
    category: {
      name: ''
    }
  })

  useEffect(() => {
    const datafromLocal = localStorage.getItem('data-item')
    const dataItemLocal = JSON.parse(datafromLocal!)

    setDataItem(dataItemLocal)
  }, [])
  const urlImage = process.env.NEXT_PUBLIC_IMAGE
  return (
    <div className="game-checkout d-flex flex-row align-items-center pt-md-50 pb-md-50 pt-30 pb-30">
      <div className="pe-4">
        <div className="cropped">
          <Image src={`${urlImage}/${dataItem.thumbnail}`} width={200} height={200} className="img-fluid" alt="" />
        </div>
      </div>
      <div>
        <p className="fw-bold text-xl color-palette-1 mb-10">
          {dataItem.name}
        </p>
        <p className="color-palette-2 m-0">Category: {dataItem.category.name}</p>
      </div>
    </div>
  )
}
