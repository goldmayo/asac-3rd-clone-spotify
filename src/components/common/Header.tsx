'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs'
import { BsChevronRight } from 'react-icons/bs'
import { MdOutlinePersonOutline } from 'react-icons/md'

import Dropdown from '@/components/common/Dropdown'
import { useGetCurrentUserProfileQuery } from '@/ducks/service/user-api'
import { defaultUserImage } from '@/lib/utils/staticImages'

interface Typeprops {
  type: 'search' | ''
}
function Header({ type }: Typeprops): React.ReactElement {
  const router = useRouter()

  const back = () => {
    router.back()
  }
  const forward = () => {
    router.forward()
  }
  const [open, setopen] = useState(false)
  const session = useSession()
  const { data, error, isLoading } = useGetCurrentUserProfileQuery(`${session.data?.user?.id}`)
  return (
    <header className="flex justify-between sticky top-0 h-[64px] items-center bg-transparent rounded-lg z-10 py-4">
      <div className="ml-1.5 flex gap-x-2">
        <button className="flex items-center justify-center w-8 h-8 bg-black rounded-full" onClick={back}>
          <BsChevronLeft fontSize="16px;" color="white" />{' '}
        </button>
        <button className="flex items-center justify-center w-8 h-8 bg-black rounded-full" onClick={forward}>
          <BsChevronRight fontSize="16px;" color="white" />
        </button>
      </div>
      <ul
        className="relative"
        onClick={() => {
          setopen(!open)
        }}
      >
        <button className="bg-transparent flex justify-center items-center">
          {session.status === 'authenticated' && data?.images[0] !== undefined ? (
            <Image
              className="rounded-full border-2 border-gray-700"
              src={data ? `${data?.images[0].url} ` : defaultUserImage}
              width={32}
              height={32}
              alt={`${data?.display_name}`}
            />
          ) : (
            <MdOutlinePersonOutline color="#fff" fontSize="large" alt={data?.display_name} />
          )}
        </button>
        {open && (
          <div className="absolute z-50 top full" style={{ marginLeft: '-165px', marginTop: '8px' }}>
            <Dropdown />
          </div>
        )}
      </ul>
    </header>
  )
}

export default Header
