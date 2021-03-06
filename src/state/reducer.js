function reducer(state, action) {
  switch (action.type) {
    // consolidates the items into multiple quantities.
    case "add_item":
      let foundItemIndex = state.itemList.findIndex(
        ({ sku }) => sku === action.sku
      )
      let newItemList =
        foundItemIndex < 0
          ? [
              ...state.itemList,
              {
                sku: action.sku,
                price: action.price,
                name: action.name,
                quantity: 1,
              },
            ]
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
      return {
        ...state,
        collectionSlot: action.date,
      }
    case "increment_selected_day":
      let { currentSelectedDay } = state
      currentSelectedDay.setDate(currentSelectedDay.getDate() + 1)
      return {
        ...state,
        currentSelectedDay,
      }
    case "decrement_selected_day":
      let { currentSelectedDay: decDate } = state
      decDate.setDate(decDate.getDate() - 1)
      return {
        ...state,
        currentSelectedDay: decDate,
      }
    case "populate_orders":
      return {
        ...state,
        orders: action.orders,
        visibleOrders: action.orders,
      }
    case "filter_day":
      const selDateString = state.currentSelectedDay.toDateString()
      return {
        ...state,
        visibleOrders: state.visibleOrders.filter(v => {
          const orderDateString = new Date(v.collection?.date).toDateString()
          return selDateString === orderDateString
        }),
      }
    case "filter_complete":
      console.log(
        "state.visibleOrders",
        state.visibleOrders.filter(v => v.status !== "COMPLETE")
      )
      return {
        ...state,
        visibleOrders: state.visibleOrders.filter(v => v.status !== "COMPLETE"),
      }
    case "clear_filters":
      return {
        ...state,
        visibleOrders: state.orders,
      }
    case "sort_by_date":
      return {
        ...state,
        visibleOrders: state.visibleOrders.sort(
          (a, b) => new Date(a.collection.date) - new Date(b.collection.date)
        ),
      }
    default:
      return state
  }
}

export default reducer
