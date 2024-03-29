'use client'

import Link from 'next/link'

import { ContentCardObject } from '@/lib/utils/createContentObject'

import GlobalPlayButton from './common/GlobalPlayButton'
import ContentCard from './ContentCard/ContentCard'
import ContentCardDescription from './ContentCard/ContentCardDescription'
import ContentCardImg from './ContentCard/ContentCardImg'
import ContentCardInfo from './ContentCard/ContentCardInfo'
import ContentCardName from './ContentCard/ContentCardName'

interface Props {
  content: ContentCardObject
}

export default function ContentCardListItem({ content }: Props) {
  const [domain, type, id] = content.uri.split(':')
  return (
    <li className={''}>
      <Link href={`/${type}/${id}`}>
        <ContentCard
          classNames="group w-[150px]"
          data={content}
          image={
            <div className="relative">
              <ContentCardImg />
              <GlobalPlayButton uri={content.uri} className={'group-hover:opacity-100 right-0 bottom-0'} />
            </div>
          }
          info={
            <ContentCardInfo>
              <ContentCardName />
              <ContentCardDescription />
            </ContentCardInfo>
          }
        />
      </Link>
    </li>
  )
}
