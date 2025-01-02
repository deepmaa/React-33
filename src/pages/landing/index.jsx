import { HomeCarousel } from "../../components/homecarousel/homecarousel.component"
import { ProductCategory } from "../../components/product/product-categories.component"
import { ProductCard } from "../../components/product/product.card.component"

export const LandingPage = () => {
  return (
    <>
    <HomeCarousel></HomeCarousel>
    <ProductCategory></ProductCategory>
    <ProductCard></ProductCard>
    </>
  )
}