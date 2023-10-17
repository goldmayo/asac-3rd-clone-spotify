'use client'
import { cva, VariantProps } from 'class-variance-authority'
import Image from 'next/image'
import React from 'react'

import { cn } from '@/lib/utils/classNames'

import { useBannerContext } from '../context/BannerContext'

export const BannerImageVariants = cva(
  `
  flex text-lg font-bold text-color-text-primary shadow-2xl
  `,
  {
    variants: {
      variant: {
        default: 'rounded-md',
        artist: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)
// <div className=" shadow-2xl mr-[15px] ">
//   <Image className="rounded-full" fill src={img} alt="프로필" />
// </div>
interface BannerTitleProps extends VariantProps<typeof BannerImageVariants> {
  variant: 'default' | 'artist'
  className?: string
}

export default function BannerImage({ variant, className, ...props }: BannerTitleProps) {
  const { image, title } = useBannerContext()
  return (
    <div className={cn('')} {...props}>
      <Image
        className={cn(BannerImageVariants({ variant }), className)}
        width={192}
        height={192}
        src={image.url}
        alt={title}
      />
    </div>
  )
}
