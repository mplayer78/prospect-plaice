export function dateId(date) {
  if (date instanceof Date) {
    return date.toLocaleDateString()
  } else {
    throw new Error("Invalid Date Object")
  }
}
