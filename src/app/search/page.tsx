import Genre from '@/components/common/Searchpage/Genre'
import getAuthSession from '@/core/api/auth/getAuthSession'
import getCategories from '@/core/api/category/getUserCategories'
import { Getseveralbrowsecategories } from '@/types/raw-api-data-type/category/get-several-browse-categories-data-type'
export default async function page() {
  const session = await getAuthSession()
  const color = {
    1: '#006450',
    2: '#7358FF',
    3: '#1E3264',
    4: '#E8115B',
    5: '#2D46B9',
    6: '#148A08',
    7: '#503750',
    8: '#BA5D07',
    9: '#8D67AB',
    10: '#A56752',
    11: '#FF0090',
    12: '#056952',
    13: '#E91429',
    14: '#8D67AB',
    15: '#E1118C',
    16: '#D84000',
    17: '#E1118C',
    18: '#148A08',
    19: '#E91429',
    20: '#777777',
    21: '#D84000',
    22: '#D84000',
    23: '#1E3264',
    24: '#537AA1',
    25: '#517AA1',
    26: '#BA5D07',
    27: '#0D72EA',
    28: '#E61E32',
    29: '#E91429',
    30: '#777777',
    31: '#B02897',
    32: '#2D46B9',
    33: '#7D4B32',
    34: '#BC5900',
    35: '#503750',
    36: '#DC148C',
    37: '#8D67AB',
    38: '#E81161',
    39: '#E41D63',
    40: '#B02896',
    41: '#E61E32',
    42: '#537AA1',
    43: '#1E3264',
    44: '#477D95',
    45: '#B06239',
    46: '#BA5D07',
    47: '#BC5900',
    48: '#E91429',
    49: '#0D72ED',
    50: '#0D73EC',
  }
  const Categories: Getseveralbrowsecategories | undefined = await getCategories(50)
  Categories?.categories?.items?.forEach((item, index) => {
    item.color = color[index + 1]
  })
  return (
    <>
      <div>
        <div className="text-white">최근 검색 기록 </div> <div className="text-white">모두 둘러보기</div>
        <div className="flex flex-wrap gap-5">
          {Categories?.categories?.items?.map((item: any) => (
            <Genre key={item.index} name={item.name} url={item?.icons[0].url} color={item.color}></Genre>
          ))}
        </div>
      </div>
    </>
  )
}
