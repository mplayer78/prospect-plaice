function reducer(state, action) {
  switch (action.type) {
    // consolidates the items into multiple quantities.
    case "add_item":
      let foundItemIndex = state.itemList.findIndex(
        ({ sku }) => sku === action.sku
      )
      let newItemList =
        foundItemIndex < 0
          ? [...state.itemList, { sku: action.sku, quantity: 1 }]
          : state.itemList.map((v, i) =>
              i === foundItemIndex ? { ...v, quantity: v.quantity + 1 } : v
            )
      return {
        ...state,
        itemList: newItemList,
      }
    case "remove_item":
      let foundRemItemIndex = state.itemList.findIndex(
        ({ sku }) => sku === action.sku
      )
      let newRemItemList =
        foundRemItemIndex < 0
          ? state.itemList
          : state.itemList
              .map((v, i) =>
                i === foundRemItemIndex ? { ...v, quantity: v.quantity - 1 } : v
              )
              .filter(({ quantity }) => quantity > 0)
      return {
        ...state,
        itemList: newRemItemList,
      }
    case "set_form":
      return {
        ...state,
        [action.name]: action.value,
      }
    case "book_collection_slot":
      let date = new Date()
      console.log("date", date)
      return {
        ...state,
        collectionSlot: new Date(),
      }
    default:
      return state
  }
}

export default reducer
