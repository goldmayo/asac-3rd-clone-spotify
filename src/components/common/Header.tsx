'use client'
import { RGBColor } from 'colorthief'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs'
import { BsChevronRight } from 'react-icons/bs'
import { MdOutlinePersonOutline } from 'react-icons/md'

import Dropdown from '@/components/common/Dropdown'
import { useGetCurrentUserProfileQuery } from '@/ducks/service/user-api'
import { cn } from '@/lib/utils/classNames'
import { defaultUserImage } from '@/lib/utils/staticImages'

import HeaderBackground from './HeaderBackground'

interface Typeprops {
  type: 'search' | 'default' | 'home'
  bgColor?: RGBColor
}
function Header({ type, bgColor }: Typeprops): React.ReactElement {
  const [open, setopen] = useState(false)
  const { data } = useGetCurrentUserProfileQuery(null)
  const router = useRouter()

  const back = () => {
    router.back()
  }
  const forward = () => {
    router.forward()
  }

  return (
    <>
      <header
        className={cn('flex sticky justify-between top-0 h-[64px] items-center bg-transparent rounded-lg z-20 p-4')}
      >
        <HeaderBackground type={'default'} bgColor={bgColor} />
        <div className="flex gap-x-2 z-10">
          <button className="flex items-center justify-center w-8 h-8 bg-black rounded-full" onClick={back}>
            <BsChevronLeft fontSize="16px;" color="white" />
          </button>
          <button className="flex items-center justify-center w-8 h-8 bg-black rounded-full" onClick={forward}>
            <BsChevronRight fontSize="16px;" color="white" />
          </button>
        </div>
        <ul
          className="relative z-10"
          onClick={() => {
            setopen(!open)
          }}
        >
          <button className="bg-transparent flex justify-center items-center">
            {data?.images[0] !== undefined ? (
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
    </>
  )
}

export default Header
