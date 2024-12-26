import { HomeCarousel } from "../../components/homecarousel.component"
import { ProductGrid } from "../../components/product-categories"
import { ProductLIst } from "../../components/product.list"

export const LandingPage = () => {
  return (
    <>
    <HomeCarousel></HomeCarousel>
    <ProductGrid></ProductGrid>
    <ProductLIst></ProductLIst>
    </>
  )
}