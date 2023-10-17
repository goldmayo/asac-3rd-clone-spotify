'use client'
import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '@/lib/utils/classNames'

import { useBannerContext } from '../context/BannerContext'

export const BannerTitleVariants = cva(
  `
  flex text-lg font-bold text-color-text-primary
  `,
  {
    variants: {
      size: {
        default: ' text-lg font-semibold',
        md: 'text-[4rem] font-bold',
        lg: 'text-[6rem] font-black',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

interface BannerTitleProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof BannerTitleVariants> {
  size: 'default' | 'md' | 'lg'
}

export default function BannerTitle({ size, ...props }: BannerTitleProps) {
  const { title } = useBannerContext()
  return (
    <span className={cn(BannerTitleVariants({ size }))} {...props}>
      {title}
    </span>
  )
}
