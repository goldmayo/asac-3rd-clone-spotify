'use client'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'

import { usePlaylistInfoContext } from '@/app/myplaylist/[slug]/PlaylistProvider'

export default function PlaylistInfo() {
  const storage = getStorage()

  const { playlistInfo, setPlaylistInfo } = usePlaylistInfoContext()
  console.log('playlistInfo.coverImg', playlistInfo)

  const [coverImgPreview, setCoverImgPreview] = useState('/img/playlistDefault.png')
  const [coverHover, setCoverHover] = useState(false)
  const coverImgRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    async function getImage() {
      const storageRef = ref(storage, `images/${playlistInfo.coverImg}`)
      await getDownloadURL(storageRef)
        .then((url) => {
          console.log('get Image')
          setCoverImgPreview(url)
        })
        .catch((e) => {
          console.log('error', e)
        })
    }
    if (playlistInfo.coverImg !== null) {
      getImage()
    }
  }, [playlistInfo.coverImg])
  async function uploadImage({ file }) {
    const storage = getStorage()
    const imageRef = ref(storage, `images/${file.name}`)
    uploadBytes(imageRef, file).then((snapshot) => {
      console.log('image uploaded:')
    })
    setPlaylistInfo({ ...playlistInfo, coverImg: file.name })
  }

  const handleTitleChange = (e) => {
    setPlaylistInfo({ ...playlistInfo, title: e.target.value })
  }
  //파일선택 버튼을 감추고 기능만 실행
  const handleCoverImg = () => {
    coverImgRef.current?.click()
  }
  const handleCoverChange = (e) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    if (file) {
      let image = window.URL.createObjectURL(file)
      setCoverImgPreview(image)
      uploadImage({ file: file })
    }
  }
  return (
    <div className="relative flex w-full px-4 h-72 bg-gradient-to-b from-transparent to-color-card-primary">
      <input type="file" className="hidden" ref={coverImgRef} onChange={handleCoverChange} />
      <button
        className="relative mr-5 shadow-xl top-16 w-52 h-52"
        onMouseOver={() => {
          setCoverHover(true)
        }}
        onMouseOut={() => {
          setCoverHover(false)
        }}
        onClick={handleCoverImg}
      >
        <Image fill={true} src={coverImgPreview} alt="playlist cover image" />
        {coverHover && (
          <div className="relative flex flex-col items-center justify-center w-full h-full gap-2 text-white bg-black bg-opacity-50">
            <FiEdit2 size={48} />
            <span>사진 선택</span>
          </div>
        )}
      </button>
      <div className="flex flex-col gap-4 text-white pt-36">
        <span className="text-sm">플레이리스트</span>
        <input
          type="text"
          className="text-5xl font-extrabold placeholder-white bg-black border-none"
          placeholder="플레이리스트 제목"
          value={playlistInfo.title}
          onChange={handleTitleChange}
        ></input>
        <div className="flex gap-2">
          <div className="relative w-6 h-6 overflow-hidden rounded-full ">
            <Image fill={true} src="/img/userDefaultProfile.jpeg" alt="author profile image" />
          </div>
          <p>{playlistInfo.author}</p>
        </div>
      </div>
    </div>
  )
}
