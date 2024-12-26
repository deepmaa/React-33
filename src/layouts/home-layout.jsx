import { Outlet } from "react-router-dom"
import { Footer } from "./footer"
import { Header } from "./header"

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