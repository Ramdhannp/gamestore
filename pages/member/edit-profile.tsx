import Image from 'next/image'
import Sidebar from '../../components/organisms/Sidebar'
import Input from '../../components/atoms/Input'
import Cookies from 'js-cookie'
import { type JwtPayloadTypes, type UserTypes } from '../../services/data-types'
import { jwtDecode } from 'jwt-decode'
import { useCallback, useEffect, useState } from 'react'
import { editProfile } from '../../services/member'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function EditProfile () {
  const [user, setUser] = useState({
    avatar: '',
    email: '',
    name: ''
  })
  const [imagePreview, setImagePreview] = useState('')
  const [image, setImage] = useState<string | Blob>('')
  const router = useRouter()

  const editProfileApi = useCallback(async (data) => {
    const response = await editProfile(data)
    if (response.error) {
      toast.error(response.message)
    } else {
      toast.success('Berhasil edit profile. Silahkan sign in kembali')
      Cookies.remove('token')
      router.push('/sign-in')
    }
  }, [])

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      const jwtToken = atob(token)
      const payload: JwtPayloadTypes = jwtDecode(jwtToken)
      const userFromPayload: UserTypes = payload.player
      const urlImage = process.env.NEXT_PUBLIC_IMAGE
      userFromPayload.avatar = `${urlImage}/${userFromPayload.avatar}`
      setUser(userFromPayload)
    }
  }, [])

  const onSubmit = () => {
    const data = new FormData()

    data.append('name', user.name)
    data.append('avatar', image)
    editProfileApi(data)
  }
  return (
    <section className="edit-profile overflow-auto">
      <Head><title>Edit Profile</title></Head>
      <Sidebar activeMenu="settings" />
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
          <div className="bg-card pt-30 ps-30 pe-30 pb-30">
            <form action="">
              <div className="photo d-flex">
                <div className="image-upload">
                  <label htmlFor="avatar">
                    <div className="position-relative me-20">
                      {imagePreview
                        ? (
                        <Image
                          src={imagePreview}
                          width={90}
                          height={90}
                          className="avatar"
                          style={{ borderRadius: '100%', objectFit: 'cover' }}
                          alt="avatar"
                        />
                          )
                        : (
                        <Image
                        src={user.avatar}
                        width={90}
                        height={90}
                        className="avatar"
                        style={{ borderRadius: '100%', objectFit: 'cover' }}
                        alt="avatar"
                      />
                          )}
                      <div className="avatar-overlay position-absolute top-0 d-flex justify-content-center align-items-center">
                        <Image
                          src="/icon/upload.svg"
                          width={90}
                          height={90}
                          alt="uplod"
                        />
                      </div>
                    </div>
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
              <div className="pt-30">
                <Input label="Full Name" value={user.name} placeHolder="Enter your full name" onChange={event => {
                  setUser({
                    ...user,
                    name: event.target.value
                  })
                }} />
              </div>
              <div className="pt-30">
                <Input label="Email" value={user.email} placeHolder="Enter your email address" disabled/>
              </div>
              <div className="button-group d-flex flex-column pt-50">
                <button
                  type="button"
                  className="btn btn-save fw-medium text-lg text-white rounded-pill"
                  onClick={onSubmit}
                >
                  Save My Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  )
}
