import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { setSignUp } from '../services/auth'
import { type CategoryTypes } from '../services/data-types'
import { getGameCategory } from '../services/player'
import Head from 'next/head'

export default function SignUpPhot () {
  const [categories, setCategories] = useState([])
  const [favorite, setFavorite] = useState('')
  const [image, setImage] = useState<string | Blob>('')
  const [imagePreview, setImagePreview] = useState('')
  const [localForm, setLocalForm] = useState({
    name: '',
    email: ''
  })
  const router = useRouter()

  const getGameCategoryAPI = useCallback(async () => {
    const data = await getGameCategory()
    setCategories(data)
    setFavorite(data[0]._id)
  }, [getGameCategory])

  useEffect(() => {
    getGameCategoryAPI()
  }, [])

  useEffect(() => {
    const getLocalForm = localStorage.getItem('user-form')
    setLocalForm(JSON.parse(getLocalForm ?? ''))
  }, [])

  const onSubmit = async () => {
    const getLocalForm = localStorage.getItem('user-form')
    const form = JSON.parse(getLocalForm ?? '')
    const data = new FormData()

    data.append('avatar', image)
    data.append('name', form.name)
    data.append('userName', form.name)
    data.append('email', form.email)
    data.append('password', form.password)
    data.append('status', 'Y')
    data.append('phoneNumber', '089621253726')
    data.append('favorite', favorite)
    data.append('role', 'user')

    const result = await setSignUp(data)
    if (result.error) {
      toast.error(result.message)
    } else {
      toast.success('Pendaftaran Berhasil')
      localStorage.removeItem('user-form')
      setTimeout(() => {
        router.push('/sign-up-success')
      }, 1000)
    }
  }

  return (
    <section className="sign-up-photo mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
      <Head>
        <title>Sign Up Photo</title>
      </Head>
      <div className="container mx-auto">
        <form action="">
          <div className="form-input d-md-block d-flex flex-column">
            <div>
              <div className="mb-20">
                  <div className="image-upload text-center">
                      <label htmlFor="avatar">
                        {imagePreview
                          ? <Image
                              src={imagePreview}
                              className='img-upload'
                              width={120}
                              height={120}
                              alt="uplod"
                          />
                          : <Image
                              src="icon/upload.svg"
                              width={120}
                              height={120}
                              alt="uplod"
                          />
                          }
                      </label>
                      <input
                          id="avatar"
                          type="file"
                          name="avatar"
                          accept="image/png, image/jpeg"
                          onChange={(event) => {
                            if (event.target.files) {
                              const img = event.target.files[0]
                              setImagePreview(URL.createObjectURL(img))
                              setImage(img)
                            }
                          }}
                      />
                  </div>
              </div>
              <h2 className="fw-bold text-xl text-center color-palette-1 m-0">
                  {localForm.name}
              </h2>
              <p className="text-lg text-center color-palette-1 m-0">
                  {localForm.email}
              </p>
              <div className="pt-50 pb-50">
                  <label
                      htmlFor="category"
                      className="form-label text-lg fw-medium color-palette-1 mb-10"
                  >
                      Favorite Game
                  </label>
                  <select
                      id="category"
                      name="category"
                      className="form-select d-block w-100 rounded-pill text-lg"
                      aria-label="Favorite Game"
                      value={favorite}
                      onChange={(event) => { setFavorite(event.target.value) }}
                  >
                      {categories.map((category: CategoryTypes) => {
                        return (
                          <option key= {category._id } value= {category._id }>{ category.name }</option>
                        )
                      })}
                  </select>
              </div>
            </div>

            <div className="button-group d-flex flex-column mx-auto">
                <button
                  type='button'
                  className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16"
                  onClick={onSubmit}
                >
                  Create My Account
                </button>

                <Link
                  className="btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15"
                  href="#"
                  role="button"
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </form>
        </div>
    </section>
  )
}
