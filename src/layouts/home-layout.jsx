import { Outlet } from "react-router-dom"
import { Header } from "../components/header/header.component"
import { Footer } from "../components/footer/footer.component"

export const HomeLayout = () => {
  return (
    <>
      {/* <Header user={{name: "Zen", email: "zendeepma@gmail.com"}}></Header> */}
      <Header user={null}></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}