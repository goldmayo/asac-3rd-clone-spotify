'use client'
import Image from 'next/image'
import { useState } from 'react'
import { LuClock3 } from 'react-icons/lu'
import { VscHeart } from 'react-icons/vsc'

import { Item } from '@/types/raw-api-data-type/playlist/get-playlist-type'

interface TracksProps {
  tracks: Item[];
}

function formatDateToLocaleString(date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(date).toLocaleDateString('ko-KR');
}
function Tracks({ tracks }: TracksProps) {
  const [hover, setHover] = useState<number | null>(null)

  return (
    <section>
      <div className="mb-2 text-sm border-b text-color-text-secondary border-color-text-secondary">
        <div className="flex items-center justify-around px-2 py-3 ">
          <span>#</span>
          <span className="w-2/6">제목</span>
          <span className="w-2/6">앨범</span>
          <span className="w-1/6 mr-[48px]">추가한 날짜</span>
          <span className="pr-2">
            <LuClock3 size={15} />
          </span>
        </div>
      </div>
      <div className="w-full h-full text-color-text-secondary">
        {tracks.map((item, index) => (
          <div
            className="flex items-center justify-around px-2 py-3 rounded-md hover:bg-color-hover-primary"
            onMouseOver={() => setHover(index)}
            onMouseOutCapture={() => setHover(null)}
            key={item.track.id}
          >
            <span>{index + 1}</span>
            <span className="relative flex w-2/6">
              <Image className="mr-3" src={item.track.album.images[0].url} width={40} height={40} alt="track image" />
              <div>
                <p className="font-semibold text-color-text-primary">{item.track.name}</p>
                <p className="text-sm text-[#B3B3B3]">{item.track.artists[0].name}</p>
              </div>
            </span>
            <span className="w-2/6 text-sm">{item.track.album.name}</span>
            <span className="w-1/6 pl-2 text-sm">{formatDateToLocaleString(item.added_at)}</span>
            <div className="w-[16px]">{index === hover && <VscHeart size={16} className="hover:text-white" />}</div>
            <span className=" text-[#B3B3B3] text-sm">
              {Math.floor(item.track.duration_ms / 60000)}:{((item.track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Tracks
