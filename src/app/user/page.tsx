import Bannerpage from '@/app/user/bannerpage'
import ContentCardListItem from '@/components/CardContentListItem'
import ContentCardContainer from '@/components/common/ContentContainer'
import getUsersTopItems from '@/core/api/user/getUsersTopItems'
import { createContentFromItem } from '@/lib/utils/createContentObject'
import { GetUserTopItems, UserTopArtistItem } from '@/types/raw-api-data-type/user/get-user-top-items-data-type'
export default async function Home() {
  const usersTopItems: GetUserTopItems | undefined = await getUsersTopItems(10, 'artist')

  return (
    <div className="flex-col">
      <Bannerpage></Bannerpage>

      {usersTopItems ? (
        <ContentCardContainer title={'이번달 인기 아티스트'} linkPath={'/user'}>
          {usersTopItems.items.map((artist) => (
            <ContentCardListItem key={artist.id} content={createContentFromItem.artist(artist as UserTopArtistItem)} />
          ))}
        </ContentCardContainer>
      ) : (
        ''
      )}
    </div>
  )
}
