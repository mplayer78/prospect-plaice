export function twoSP(number) {
  let parsed = parseInt(number)
  if (parsed || parsed === 0) {
    return parsed < 10 ? "0" + parseInt(number) : number.toString()
  }
  return null
}
