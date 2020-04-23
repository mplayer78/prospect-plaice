import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import MenuList from "../components/products/MenuList"
import CollectionSlotList from "../components/collection/CollectionSlotList"
import CustomerDetails from "../components/CustomerDetails"

const MenuPage = () => {
  return (
    <Layout>
      <SEO title="Order Food" />
      <CollectionSlotList />
      <MenuList />
      <CustomerDetails />
    </Layout>
  )
}

export default MenuPage
