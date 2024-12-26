import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import { LandingPage } from "../pages/landing";
import { AboutUs } from "../pages/about-us/about-us.page";
import { AllPorductGrid } from "../pages/products/all-products.page";
import { PrivacyPolicy } from "../pages/privacy/privacy.page";
import { LoginPage } from "../pages/auth/login/login.page";
import { HomeLayout } from "../layouts/home-layout";
import { RegisterPage } from "../pages/auth/register/register.page";
import { UserLayout } from "../layouts/user-layout";
import { CategoryWiseProductList } from "../pages/category/category-product-list";
import { ErrorPage } from "../pages/not-found/404.page";
import { AdminDashboarad } from "../pages/dashboard/admindashboard.page";


const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeLayout />,
		children: [
			{
				index: true,
				element: <LandingPage />
			},
			{
				path: "about-us",
				element: <AboutUs />
			},
			{
				path: "products",
				element: <AllPorductGrid />
			},
			{
				path: "privacy-policy",
				element: <PrivacyPolicy />
			},
			{
				path: "category/:slug",
				element: <CategoryWiseProductList />
			},
			{
				path: "login",
				element: <LoginPage />
			},
			{
				path: "register",
				element: <RegisterPage />
			},
			{
				path: "*",
				element: <ErrorPage />,
			}
		]
	},
	{
		path: '/admin',
		element: <UserLayout role="admin" />,
		children: [
			{
				index: true,
				element: <AdminDashboarad />
			},
			{
				path: "*",
				element: <ErrorPage link="admin" />
			}
		]
	}
])


const Routing = () => {
	return (<RouterProvider router={router} />
	)
}


// const Routing = () => {
//   return (
//     <>
//                 <BrowserRouter>
//                     <Routes>
//                         <Route path="/" element={<HomeLayout />}>
//                             <Route index element={<LandingPage />} />
//                             <Route path="about-us" element={<AboutUs />} />
//                             <Route path="products" element={<AllPorductGrid />} />
//                             <Route path="login" element={<LoginPage />} />
//                             <Route path="privacy-policy" element={<PrivacyPolicy/>}></Route>
//                         </Route>
//                     </Routes>
//                     </BrowserRouter>
//     </>
//   )
// }

export default Routing;