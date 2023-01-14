import React from 'react'
import type { ComponentStory, ComponentMeta } from '@storybook/react'
import Orderbook from '~/components/ui/Market/Trade/Orderbook/orderbook'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default {
 title: 'ui/Orderbook',
 component: Orderbook,
 decorators: [
  (Story) => (
   <QueryClientProvider client={queryClient}>
    <Story />
   </QueryClientProvider>
  ),
 ],
} as ComponentMeta<typeof Orderbook>

const Template: ComponentStory<typeof Orderbook> = () => <Orderbook />

export const Primary = Template.bind({})
