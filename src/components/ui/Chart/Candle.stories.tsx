/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Candle from '~/components/ui/Chart/candle'

export default {
 title: 'atoms/Candle',
 component: Candle,
 argTypes: {
  width: { control: { type: 'range', min: 1, max: 100, step: 3 } },
  height: { control: { type: 'range', min: 1, max: 300, step: 3 } },
  fill: { control: 'color' },
 },
} as ComponentMeta<typeof Candle>

const Template: ComponentStory<typeof Candle> = (args) => (
 <div>
  <svg width={args.width} height={args.height} style={{ backgroundColor: '#e8e8e8' }}>
   <Candle {...args} />
  </svg>
 </div>
)

export const Primary = Template.bind({})
Primary.args = {
 width: 20,
 height: 60,
 fill: 'red',
 price: {
  opening: 600,
  trade: 500,
  high: 700,
  low: 300,
 },
}
