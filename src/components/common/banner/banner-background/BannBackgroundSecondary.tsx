import { RGBColor } from 'colorthief'

interface Props {
  dominantColor: RGBColor
}

export default async function BannerBackgroundSecondary({ dominantColor }: Props) {
  return (
    <>
      <div
        style={{
          backgroundColor: `rgba(${dominantColor.join(',')})`,
          backgroundImage: `linear-gradient(rgba(0,0,0,.6) 0 ,#121212 100%), url(
  data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=
)`,
        }}
        className="h-[232px] absolute w-full -z-10 top-0 left-0"
      />
    </>
  )
}
