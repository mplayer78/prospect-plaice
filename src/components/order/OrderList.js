import React, { useContext, useEffect } from "react"
import Context from "../../state/context"
import { gql, useQuery } from "@apollo/client"
import OrderSummary from "./OrderSummary"

const ALL_ORDERS = gql`
  query allOrders {
    allOrders {
      data {
        _id
        customerName
        customerEmail
        customerPhoneNo
        items {
          data {
            name
            quantity
            sku
          }
        }
        collection {
          date
        }
      }
    }
  }
`

const OrderList = props => {
  const { state, dispatch } = useContext(Context)
  const { loading, error, data } = useQuery(ALL_ORDERS, {
    // polling new orders every minute
    pollInterval: 1000 * 60,
  })
  const orders = data?.allOrders?.data || []
  useEffect(() => {
    dispatch({ type: "populate_orders", orders })
    dispatch({ type: "filter_day" })
    dispatch({ type: "sort_by_date" })
  }, [data, dispatch])
  console.log("state", state)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <div className="order-list-container" style={{ margin: "20px" }}>
      {state.visibleOrders.map(v => (
        <OrderSummary {...v} key={v._id} />
      ))}
    </div>
  )
  return <h1>Hey</h1>
}

export default OrderList
