// const ColorThief = require('colorthief')

import { RGBColor } from 'colorthief'

export function getAverageColorOfImage(imgElement: HTMLImageElement) {
  // imgElement -> <img src='https://...' alt='...' />
  const canvas = document.createElement('canvas') // canvas element 생성
  const context = canvas.getContext && canvas.getContext('2d') // 2d 그래픽을 그릴 수 있는 메서드를 지닌 HTML5 object
  const averageColor = { r: 0, g: 0, b: 0 }

  if (!context) return averageColor

  const width = (canvas.width = imgElement.naturalWidth || imgElement.offsetWidth || imgElement.width)
  const height = (canvas.height = imgElement.naturalHeight || imgElement.offsetHeight || imgElement.height)
  context.drawImage(imgElement, 0, 0) // drawImage는 캔버스에서 이미지를 그려준다.

  const imageData = context.getImageData(0, 0, width, height).data // 지정된 좌표와 폭과 높이를 갖는 사각형으로 표시된 캔버스 영역에 대한 기본 픽셀 데이터를 나타내는 ImageData 객체를 반환한다.
  const length = imageData.length

  for (let i = 0; i < length; i += 4) {
    averageColor.r += imageData[i]
    averageColor.g += imageData[i + 1]
    averageColor.b += imageData[i + 2]
  }
  const count = length / 4
  averageColor.r = ~~(averageColor.r / count)
  averageColor.g = ~~(averageColor.g / count)
  averageColor.b = ~~(averageColor.b / count)

  return averageColor
}

export async function extractDominantColorFromImage(img: string) {
  const ColorThief = require('colorthief')
  const dominantColor: RGBColor = await ColorThief.getColor(img)
  return dominantColor
}
