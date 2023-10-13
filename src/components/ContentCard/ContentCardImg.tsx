'use client'
import Image from 'next/image'

import useContentCardContext from '@/components/ContentCard/ContentCardContext'
import { cn } from '@/lib/utils/classNames'
import { convertUriToDomainTypeId } from '@/lib/utils/convert'

export default function ContentCardImg() {
  const data = useContentCardContext()
  return (
    <Image
      className={cn('rounded-md', {
        'rounded-full': convertUriToDomainTypeId(data.uri).type === 'artist',
      })}
      src={data.image.url}
      alt={data.name}
      width={160}
      height={160}
    />
  )
}
