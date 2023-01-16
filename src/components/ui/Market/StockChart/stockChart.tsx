/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import React from 'react'
import * as d3 from 'd3'
import {
 elderRay,
 ema,
 discontinuousTimeScaleProviderBuilder,
 Chart,
 ChartCanvas,
 CurrentCoordinate,
 BarSeries,
 CandlestickSeries,
 ElderRaySeries,
 LineSeries,
 MovingAverageTooltip,
 OHLCTooltip,
 SingleValueTooltip,
 lastVisibleItemBasedZoomAnchor,
 XAxis,
 YAxis,
 CrossHairCursor,
 EdgeIndicator,
 MouseCoordinateX,
 MouseCoordinateY,
 ZoomButtons,
 withDeviceRatio,
 withSize,
} from 'react-financial-charts'
import witchCandleData from '~/components/ui/Market/StockChart/witchCandleData'
import type { StockCandle } from '~/types/api/upbit/candle.api'

interface StockChartProps {
 readonly data: StockCandle[]
 readonly height: number
 readonly dateTimeFormat?: string
 readonly width: number
 readonly ratio: number
 handleMoreFetch: () => Promise<void>
}

class StockChart extends React.Component<StockChartProps> {
 private readonly margin = { left: 0, right: 95, top: 0, bottom: 24 }

 private readonly pricesDisplayFormat = d3.format('.2f')

 private readonly xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d: StockCandle) => d.date)

 private readonly barChartExtents = (data: StockCandle) => {
  return data.volume
 }

 private readonly candleChartExtents = (data: StockCandle) => {
  return [data.high, data.low]
 }

 private readonly yEdgeIndicator = (data: StockCandle) => {
  return data.close
 }

 private readonly volumeColor = (data: StockCandle) => {
  return data.close > data.open ? 'rgba(38, 166, 154, 0.3)' : 'rgba(239, 83, 80, 0.3)'
 }

 private readonly volumeSeries = (data: StockCandle) => {
  return data.volume
 }

 private readonly openCloseColor = (data: StockCandle) => {
  return data.close > data.open ? '#26a69a' : '#ef5350'
 }

 public render() {
  const { data: initialData = [], dateTimeFormat = '%d %b', height, ratio, width, handleMoreFetch } = this.props

  const ema12 = ema()
   .id(1)
   .options({ windowSize: 12 })
   .merge((d: any, c: any) => {
    d.ema12 = c
   })
   .accessor((d: any) => d.ema12)

  const ema26 = ema()
   .id(2)
   .options({ windowSize: 26 })
   .merge((d: any, c: any) => {
    d.ema26 = c
   })
   .accessor((d: any) => d.ema26)

  const elder = elderRay()

  const calculatedData = elder(ema26(ema12(initialData)))

  const { margin, xScaleProvider } = this

  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData)

  const max = xAccessor(data[data.length - 1])
  const min = xAccessor(data[Math.max(0, data.length - 100)])
  const xExtents = [min, max + 5]

  const gridHeight = height - margin.top - margin.bottom

  const elderRayHeight = 100
  const elderRayOrigin = (_: number, h: number) => [0, h - elderRayHeight]
  const barChartHeight = gridHeight / 4
  const barChartOrigin = (_: number, h: number) => [0, h - barChartHeight - elderRayHeight]
  const chartHeight = gridHeight - elderRayHeight

  const timeDisplayFormat = d3.timeFormat(dateTimeFormat)

  return (
   <ChartCanvas
    height={height}
    ratio={ratio}
    width={width}
    margin={margin}
    data={data}
    displayXAccessor={displayXAccessor}
    seriesName="Data"
    xScale={xScale}
    xAccessor={xAccessor}
    xExtents={xExtents}
    zoomAnchor={lastVisibleItemBasedZoomAnchor}
    onLoadBefore={() => handleMoreFetch()}
   >
    {/* @ts-ignore */}
    <Chart id={2} height={barChartHeight} origin={barChartOrigin} yExtents={this.barChartExtents}>
     <BarSeries fillStyle={this.volumeColor} yAccessor={this.volumeSeries} />
    </Chart>
    {/* @ts-ignore */}
    <Chart id={3} height={chartHeight} yExtents={this.candleChartExtents}>
     <XAxis showGridLines showTicks={false} showTickLabel={false} />
     <YAxis showGridLines tickFormat={this.pricesDisplayFormat} showTicks={false} />
     <CandlestickSeries />
     <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />
     <CurrentCoordinate yAccessor={ema26.accessor()} fillStyle={ema26.stroke()} />
     <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />
     <CurrentCoordinate yAccessor={ema12.accessor()} fillStyle={ema12.stroke()} />
     <MouseCoordinateY rectWidth={margin.right} displayFormat={this.pricesDisplayFormat} />
     <EdgeIndicator
      itemType="last"
      rectWidth={margin.right}
      fill={this.openCloseColor}
      lineStroke={this.openCloseColor}
      displayFormat={this.pricesDisplayFormat}
      yAccessor={this.yEdgeIndicator}
     />
     <MovingAverageTooltip
      origin={[8, 24]}
      options={[
       {
        yAccessor: ema26.accessor(),
        type: 'EMA',
        stroke: ema26.stroke(),
        windowSize: ema26.options().windowSize,
       },
       {
        yAccessor: ema12.accessor(),
        type: 'EMA',
        stroke: ema12.stroke(),
        windowSize: ema12.options().windowSize,
       },
      ]}
     />

     <ZoomButtons />
     <OHLCTooltip origin={[8, 16]} />
    </Chart>
    {/* @ts-ignore */}
    <Chart
     id={4}
     height={elderRayHeight}
     yExtents={[0, elder.accessor()]}
     origin={elderRayOrigin}
     padding={{ top: 8, bottom: 8 }}
    >
     <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" showTicks={false} />
     <YAxis ticks={4} tickFormat={this.pricesDisplayFormat} showTicks={false} />

     <MouseCoordinateX displayFormat={timeDisplayFormat} />
     <MouseCoordinateY rectWidth={margin.right} displayFormat={this.pricesDisplayFormat} />

     <ElderRaySeries yAccessor={elder.accessor()} />

     <SingleValueTooltip
      yAccessor={elder.accessor()}
      yLabel="Elder Ray"
      yDisplayFormat={(d: any) => `${this.pricesDisplayFormat(d.bullPower)}, ${this.pricesDisplayFormat(d.bearPower)}`}
      origin={[8, 16]}
     />
    </Chart>
    <CrossHairCursor />
   </ChartCanvas>
  )
 }
}

export const MinutesStockChart = witchCandleData()(
 withSize({ style: { minHeight: 500, maxHeight: 500 } })(withDeviceRatio()(StockChart)),
)
