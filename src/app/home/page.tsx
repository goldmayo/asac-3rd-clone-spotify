import BarContentCard from '@/components/BarContentCard'
import ContentCardListItem from '@/components/CardContentListItem'
import HomeBanner from '@/components/common/banner/HomeBanner'
import ContentCardContainer from '@/components/common/ContentContainer'
import Header from '@/components/common/Header'
import getAvailableGenreSeeds from '@/core/api/genre/getAvailableGenreSeeds'
import getRecommendations from '@/core/api/track/getRcommendations'
import getFollowedArtists from '@/core/api/user/getUserFollowedArtists'
import getUsersTopItems from '@/core/api/user/getUsersTopItems'
import getCurrentUsersProfile from '@/core/api/user/geUserProfile'
import { createContentFromItem } from '@/lib/utils/createContentObject'
import { GetAvailableGenreSeeds } from '@/types/raw-api-data-type/genre/get-available-genre-seeds'
import { GetRecommendations } from '@/types/raw-api-data-type/track/get-recommandations-data-type'
import { FollowedArtist } from '@/types/raw-api-data-type/user/followed-artist-data-type'
import { GetCurrentUserProfile } from '@/types/raw-api-data-type/user/get-current-user-profile-data-type'
import { GetUserTopItems, UserTopArtistItem } from '@/types/raw-api-data-type/user/get-user-top-items-data-type'

export default async function Home() {
  // compound component pattern을 사용한 client component는 server component에서 사용할 수 없다
  // => dot notation을 사용할 수 없다.
  const allTimeUserTopItems: GetUserTopItems = await getUsersTopItems(6, 'artist', 'long')
  const usersTopItems: GetUserTopItems = await getUsersTopItems(10, 'artist', 'short')
  const usersTopTracks: GetUserTopItems = await getUsersTopItems(10, 'track', 'short')
  const followedArtists: FollowedArtist = await getFollowedArtists(6)
  const genreSeeds: GetAvailableGenreSeeds = await getAvailableGenreSeeds()
  const recommendedTracks: GetRecommendations = await getRecommendations(
    usersTopItems.items[0].id,
    genreSeeds.genres,
    usersTopTracks.items[0].id,
  )
  const userProfile: GetCurrentUserProfile = await getCurrentUsersProfile()
  return (
    <>
      <Header type={'home'} />
      <section className="flex flex-col gap-10 mt-2 px-4 mb-10">
        <HomeBanner>
          <BarContentCard
            content={allTimeUserTopItems.items.map((item) => createContentFromItem.artist(item as UserTopArtistItem))}
          />
        </HomeBanner>
        <ContentCardContainer title={'좋아하는 아티스트'} linkPath={'/test'}>
          {followedArtists.artists.items.map((artist) => (
            <ContentCardListItem key={artist.id} content={createContentFromItem.artist(artist)} />
          ))}
        </ContentCardContainer>
        <ContentCardContainer title={'다시 들어보세요'} linkPath={'/test'}>
          {usersTopTracks?.items.map((track) => (
            <ContentCardListItem key={track.id} content={createContentFromItem.track(track)} />
          ))}
        </ContentCardContainer>
        <ContentCardContainer title={`${userProfile.display_name} 님을 위한 트랙 추천`} linkPath={'/test'}>
          {recommendedTracks?.tracks.map((track) => (
            <ContentCardListItem key={track.id} content={createContentFromItem.track(track)} />
          ))}
        </ContentCardContainer>
      </section>
    </>
  )
}
