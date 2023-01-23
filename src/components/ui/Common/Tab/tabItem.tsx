import React from 'react'
import type { ComponentProps, PropsWithChildren } from 'react'

export interface TabItemProps extends PropsWithChildren<Omit<ComponentProps<'div'>, 'title'>> {
 title: React.ReactNode
 active?: boolean
 disabled?: boolean
 icon?: React.FC<ComponentProps<'svg'>>
}

export const TabItem: React.FC<TabItemProps> = ({ children, className }) => <div className={className}>{children}</div>
