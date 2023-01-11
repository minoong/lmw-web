export const MarketUtils = {
 numberToHuman: function numberToHuman(volume: number | string) {
  const num = +volume
  const unitWords = ['', '백만']
  const splitUnit = 1000000
  const splitCount = unitWords.length

  const resultArray: number[] = []
  let resultString: string[] = []

  for (let i = 0; i < splitCount; i += 1) {
   const unitRound = splitUnit ** (i + 1)
   const splitPhase = splitUnit ** i
   const unitResult = Math.floor((num % unitRound) / splitPhase)

   if (unitResult > 0) {
    resultArray[i] = unitResult
   }

   for (let i = 0, len = resultArray.length; i < len; i += 1) {
    if (resultArray[i]) {
     resultString = [String(resultArray[i].toLocaleString()), unitWords[i]]
    }
   }
  }

  return resultString
 },
}
