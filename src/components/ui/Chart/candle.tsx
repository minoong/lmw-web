import React, { useMemo } from 'react'
import * as d3 from 'd3'
import * as _ from 'lodash'

interface Props {
 width: number
 height: number
 price: {
  opening: number
  trade: number
  high: number
  low: number
 }
 fill: string
}

function Candle(props: Props) {
 const { width, height, price, fill } = props

 const yScale = useMemo(() => {
  const max = Math.max(price.high - price.opening, price.opening - price.low)

  const scale = d3
   .scaleLinear()
   .domain([price.opening - max, price.opening + max])
   .range([height, 0])

  return scale
 }, [price, height])

 const rectHeight = useMemo(() => {
  const gapAbs = (gap: number) => Math.abs(gap)
  const correct = (input: number) => (input === 0 ? 1 : input)

  const result = _.flow(gapAbs, correct)(yScale(price.opening) - yScale(price.trade))

  return result
 }, [price, yScale])

 const lineWidth = useMemo(() => width / 2, [width])

 return (
  <g>
   <rect x={0} width={width} height={rectHeight} y={yScale(Math.max(price.trade, price.opening))} fill={fill} />
   <line x1={lineWidth} x2={lineWidth} y1={yScale(price.high)} y2={yScale(price.low)} stroke={fill} />
  </g>
 )
}

export default Candle
