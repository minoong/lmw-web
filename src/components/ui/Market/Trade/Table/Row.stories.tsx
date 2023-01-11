import { withRouter } from 'storybook-addon-react-router-v6'
import React from 'react'
import type { ComponentStory, ComponentMeta } from '@storybook/react'
import Row from '~/components/ui/Market/Trade/Table/row'

export default {
 title: 'atoms/Row',
 component: Row,
 decorators: [withRouter],
} as ComponentMeta<typeof Row>

const Template: ComponentStory<typeof Row> = (args) => (
 <div>
  <Row {...args} />
 </div>
)

export const Primary = Template.bind({})
Primary.args = {
 market: 'KRW-ETH',
 korean_name: '이더리움',
 change: 'FALL',
 opening_price: 1608000,
 trade_price: 1608000,
 high_price: 1611500,
 low_price: 1600000,
 signed_change_rate: -0.000621504,
 signed_change_price: -1000,
 acc_trade_price_24h: 12447013120.34854,
}
