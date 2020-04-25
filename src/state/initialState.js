import { dateId } from "../util/dateId"

const initialState = {
  itemList: [],
  totalCost: 0,
  collectionSlot: undefined,
  customerName: "",
  customerPhoneNo: "",
  customerEmail: "",
  currentSelectedDay: new Date(),
}

export default initialState
