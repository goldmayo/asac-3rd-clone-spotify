import { RGBColor } from 'colorthief'

interface Props {
  dominantColor: RGBColor
}

export default async function BannerBackgroundPrimary({ dominantColor }: Props) {
  return (
    <>
      <div
        style={{
          backgroundColor: `rgba(${dominantColor.join(',')})`,
          backgroundImage: `linear-gradient(transparent 0,rgba(0,0,0,.5) 100%), url(
  data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=
)`,
        }}
        className={
          'rounded-t-lg bg-scroll bg-cover bg-[50%_15%] bg-no-repeat h-[40vh] min-h-[340px] absolute block left-0 top-0 w-full -z-10'
        }
      />
    </>
  )
}
