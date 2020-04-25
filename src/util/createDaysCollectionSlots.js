import { dateId } from "./dateId"

export class CollectionSlot {
  constructor(date) {
    this.dateId = dateId(date)
    this.date = date
    this.minute = date.getMinutes()
    this.hour = date.getHours()
    this.minFromMidnight = this.minute + this.hour * 60
  }
}

// creates 5 minutes slots for every time between 1600 - 2000
export function createDaysCollectionSlots(date, start = 960, end = 1200) {
  let daysCollectionSlots = []
  console.log("date", date.getFullYear(), date.getMonth(), date.getDate())
  for (let i = start; i <= end; i += 5) {
    let newSlot = new CollectionSlot(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        Math.floor(i / 60),
        i % 60
      )
    )
    daysCollectionSlots.push(newSlot)
  }
  return daysCollectionSlots
}
