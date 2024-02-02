import { Navigate, Route, Routes } from "react-router-dom";
import {useContext } from "react";
import Dashboard from "../Pages/MainPages/Dashboard/Dashboard";
import Forget from "../Pages/AuthPages/ForgotPassword/ForgotPassword";
import Requirement from "../Pages/MainPages/Requirements/Requirement";
import ResetEmployeePassword from "../Pages/AuthPages/ResetPasswordPage/ResetEmployeePassword";
import Employees from "../Pages/MainPages/Users/Employees/Employees";
import InviteEmployees from "../Pages/MainPages/Users/InviteEmployees/InviteEmployees";
import RegisterEmployee from "../Pages/AuthPages/RegisterEmployee/RegisterEmployee";
import ChangePassword from "../Pages/AuthPages/ChangePassword/ChangePassword";
import HomeSlider from "../Pages/MainPages/WebsiteContent/HomeSlider/HomeSlider";
import Login from "../Pages/AuthPages/Login/Login";
import Faq from "../Pages/MainPages/WebsiteContent/Faq/Faq";
import AppContext from "../Context/AppContext";
import SocialLink from "../Pages/MainPages/WebsiteContent/SocialLink/SocialLink";
import OfferCard from "../Pages/MainPages/WebsiteContent/OfferCard/OfferCard";
import AppSetting from "../Pages/MainPages/WebsiteContent/AppSetting/AppSetting";
import Brand from "../Pages/MainPages/Products/Brand/Brand";
import PlasticType from "../Pages/MainPages/Products/PlasticType/PlasticType";
import Product from "../Pages/MainPages/Products/Product/Product";
import AddProduct from "../Pages/MainPages/Products/Product/AddProduct";
import EditProduct from "../Pages/MainPages/Products/Product/EditProduct";
import Category from "../Pages/MainPages/Products/Category/Category";
import SubCategory from "../Pages/MainPages/Products/SubCategory/SubCategory";
import Area from "../Pages/MainPages/Address/Area/Area";
import Division from "../Pages/MainPages/Address/Division/Division";
import District from "../Pages/MainPages/Address/District/District";
import FeaturedCategory from "../Pages/MainPages/Products/FeaturedCategory/FeaturedCategory.jsx";
import SubSubCategory from "../Pages/MainPages/Products/SubSubCategory/SubSubCategory.jsx";
import DeliveryZone from "../Pages/MainPages/Order/DeliveryZone/DeliveryZone.jsx";
import DeliveryArea from "../Pages/MainPages/Order/DeliveryArea/DeliveryArea.jsx";
import OrderList from "../Pages/MainPages/Order/OrderList/OrderList.jsx";
import Customers from "../Pages/MainPages/Users/Customers/Customers.jsx";
import TermsAndCondition from "../Pages/MainPages/WebsiteContent/TermsAndCondition/TermsAndConditions.jsx";
import Package from "../Pages/MainPages/Order/Package/Package.jsx";
import PromoCode from "../Pages/MainPages/Order/PromoCode/PromoCode.jsx";
import PromoCodeType from "../Pages/MainPages/Order/PromoCodeType/PromoCodeType.jsx";
import HomeBanner from "../Pages/MainPages/WebsiteContent/HomeBanner/HomeBanner.jsx";
import PackageProduct from "../Pages/MainPages/Order/PackageProduct/PackageProduct.jsx"
import PromotionFAQ from "../Pages/MainPages/WebsiteContent/PromotionFAQ/PromotionFAQ.jsx";
import PaymentType from "../Pages/MainPages/Order/PaymentType/PaymentType.jsx";
import PromotionCard from "../Pages/MainPages/WebsiteContent/PromotionCard/PromotionCard.jsx";
import ViewProductByBrand from "../Pages/MainPages/Products/Brand/BrandCRUD/ViewProductByBrand";
import FooterInfo from "../Pages/MainPages/WebsiteContent/FooterInfo/FooterInfo.jsx"
import TimeSlot from "../Pages/MainPages/Order/TimeSlot/TimeSlot.jsx";
import Achivement from "../Pages/MainPages/WebsiteContent/Achivement/Achivement.jsx"
import Article from "../Pages/MainPages/WebsiteContent/Article/Article.jsx"
import DeliveryFee from "../Pages/MainPages/Order/DeliveryFee/DeliveryFee.jsx";
import ViewCustomerOrders from "../Pages/MainPages/Users/Customers/CustomerCRUD/ViewCustomerOrders.jsx";
import ViewCustomerOrderDetails from "../Pages/MainPages/Users/Customers/CustomerCRUD/ViewCustomerOrderDetails.jsx";
import ViewCustomerPlasticHistory from "../Pages/MainPages/Users/Customers/CustomerCRUD/ViewCustomerPlasticHistory.jsx";
import ViewCustomerPlasticPoints from "../Pages/MainPages/Users/Customers/CustomerCRUD/ViewCustomerPlasticPoints.jsx";
import ViewLeaderCustomerByPlasticPoints from "../Pages/MainPages/Users/Customers/CustomerCRUD/ViewLeaderCustomerByPlasticPoints";
import CreateOrder1 from "../Pages/MainPages/Users/Customers/CustomerCRUD/CreateOrder1";
import EditCustomerProfile from "../Pages/MainPages/Users/Customers/CustomerCRUD/EditCustomerProfile.jsx";
import PbcNumber from "../Pages/MainPages/Order/PbcNumber/PbcNumber.jsx";
import ViewSubCategoryFromCategory from "../Pages/MainPages/Products/Category/CategoryCRUD/ViewSubCategoryFromCategory.jsx";
import ProductByCategory from "../Pages/MainPages/Products/ProductByCategory/ProductByCategory.jsx";
import ViewProductByCategory from "../Pages/MainPages/Products/ProductByCategory/ProductByCategoryCRUD/ViewProductByCategory.jsx";
import ViewProductBySubCategory from "../Pages/MainPages/Products/ProductBySubCategory/ProductBySubCategoryCRUD/ViewProductBySubCategory.jsx";
import ProductBySubCategory from "../Pages/MainPages/Products/ProductBySubCategory/ProductBySubCategory.jsx";
import ViewCustomerRewardHistory from "../Pages/MainPages/Users/Customers/CustomerCRUD/ViewCustomerRewardHistory.jsx";
import { useLevels } from "../Utils/useLevels.js";
import axios from "axios";
import Marquee from "../Pages/MainPages/WebsiteContent/Marquee/Marquee.jsx";
import Reorder from "../Pages/MainPages/Users/Customers/CustomerCRUD/Reorder.jsx";
import ViewCustomerByPromoCode from "../Pages/MainPages/Order/PromoCode/PromoCodeCRUD/ViewCustomerByPromoCode.jsx";

import ViewPendingOrders from "../Pages/MainPages/Order/OrderList/OrderListCRUD/ViewPendingOrders.jsx";
import ViewCanceledOrders from "../Pages/MainPages/Order/OrderList/OrderListCRUD/ViewCanceledOrders.jsx";
import ViewProcessingOrders from "../Pages/MainPages/Order/OrderList/OrderListCRUD/ViewProcessingOrders.jsx";
import ViewReadyForDeliveryOrders from "../Pages/MainPages/Order/OrderList/OrderListCRUD/ViewReadyForDeliveryOrders.jsx";
import ViewDeliveredOrders from "../Pages/MainPages/Order/OrderList/OrderListCRUD/ViewDeliveredOrders.jsx";
import EditOrderStatusCanceled from "../Pages/MainPages/Users/Customers/CustomerCRUD/EditOrderStatusCanceled.jsx";
import ViewCustomerDetails from "../Pages/MainPages/Users/Customers/CustomerCRUD/ViewCustomerDetails.jsx";
import ScrollText from "../Pages/MainPages/WebsiteContent/ScrollText/ScrollText.jsx";
import ViewTimeRangeOrders from "../Pages/MainPages/Order/OrderList/OrderListCRUD/ViewTimeRangeOrders.jsx";
import QuickAds from "../Pages/MainPages/Products/QuickAds/QuickAds.jsx";
import ECommerce from "../Pages/MainPages/Dashboard/Ecommerce.jsx";
function PageRoutes() {
  const {employee,logout} = useContext(AppContext)
  const {admin,cs,cx, operationEmployee,executive,marketing,initialEmployee} = useLevels();
  
  // axios.interceptors.response.use(
  //   (res) => {
  //     return res;
  //   },
  //   (err) => {
  //     if (err.response.status === 401) {
  //       logout()
  //     }
  //     return Promise.reject(err);
  //   }
  // );

  return (
    <>
      <Routes>
        {/* auth routes */}
        <Route path="/login" element={!employee ? <Login /> : <Navigate to='/' />} />
        <Route path="/forgetpassword" element={!employee ? <Forget /> : <Navigate to='/' />} />
        <Route path="/resetEmployeePassword/:token" element={!employee ? <ResetEmployeePassword /> : <Navigate to='/' />} />
        <Route path="/register/:token" element={!employee ? <RegisterEmployee /> : <Navigate to='/' />} />

        {/* main routes */}
        <Route path="/" element={employee && admin || cs || cx || operationEmployee || executive || marketing || initialEmployee? <Dashboard /> : <Navigate to='/login' />} />
        <Route path="/requirement" element={employee && admin ? <Requirement /> : <Navigate to='/login'/>} />
        <Route path="/Employees" element={employee && admin? <Employees /> : <Navigate to='/login'/>} />
        <Route path="/InviteEmployees" element={employee && admin? <InviteEmployees /> : <Navigate to='/login'/>} />
        <Route path="/HomeSlider" element={employee && admin? <HomeSlider /> : <Navigate to='/login'/>} />
        <Route path="/ChangePassword" element={employee && admin? <ChangePassword /> : <Navigate to='/login'/>} />
        <Route path="/Faq" element={employee && admin? <Faq /> : <Navigate to='/login'/>} />
        <Route path="/SocialLink" element={employee && admin? <SocialLink /> : <Navigate to='/login'/>} />
        <Route path="/OfferCard" element={employee && admin? <OfferCard /> : <Navigate to='/login'/>} />
        <Route path="/AppSetting" element={employee && admin? <AppSetting /> : <Navigate to='/login'/>} />
        <Route path="/Brand" element={employee && admin? <Brand /> : <Navigate to='/login'/>} />
        <Route path="/PlasticType" element={employee && admin? <PlasticType /> : <Navigate to='/login'/>} />
        <Route path="/Products" element={employee && admin || cs || cx || executive || operationEmployee || marketing ? <Product /> : <Navigate to='/login'/>} />
        <Route path="/AddProduct" element={employee && admin? <AddProduct /> : <Navigate to='/login'/>} />
        <Route path="/EditProduct/:id" element={employee && admin || cs || cx || executive? <EditProduct /> : <Navigate to='/login'/>} />
        <Route path="/Category" element={employee && admin? <Category /> : <Navigate to='/login'/>} />
        <Route path="/SubCategory" element={employee && admin? <SubCategory /> : <Navigate to='/login'/>} />
        <Route path="/SubSubCategory" element={employee && admin? <SubSubCategory /> : <Navigate to='/login'/>} />
        <Route path="/FeaturedCategory" element={employee && admin? <FeaturedCategory /> : <Navigate to='/login'/>} />
        <Route path="/Division" element={employee && admin? <Division /> : <Navigate to='/login'/>} />
        <Route path="/District" element={employee && admin? <District /> : <Navigate to='/login'/>} />
        <Route path="/Area" element={employee && admin? <Area /> : <Navigate to='/login'/>} />
        <Route path="/DeliveryZone" element={employee && admin? <DeliveryZone /> : <Navigate to='/login'/>} />
        <Route path="/DeliveryArea" element={employee && admin? <DeliveryArea /> : <Navigate to='/login'/>} />
        <Route path="/OrderList" element={employee && admin || cs || cx ||operationEmployee || executive || marketing ? <OrderList /> : <Navigate to='/login'/>} />
        <Route path="/Customers" element={employee && admin || cs  || cx || operationEmployee || executive || marketing ?  <Customers /> : <Navigate to='/login'/>} />
        <Route path="/TermsAndCondition" element={employee && admin? <TermsAndCondition /> : <Navigate to='/login'/>} />
        <Route path="/Package" element={employee && admin? <Package /> : <Navigate to='/login'/>} />
        <Route path="/PromoCode" element={employee && admin || cs || cx ? <PromoCode /> : <Navigate to='/login'/>} />
        <Route path="/PromoCodeType" element={employee && admin ? <PromoCodeType /> : <Navigate to='/login'/>} />
        <Route path="/HomeBanner" element={employee && admin? <HomeBanner /> : <Navigate to='/login'/>} />
        <Route path="/PackageProduct" element={employee && admin? <PackageProduct /> : <Navigate to='/login'/>} />
        <Route path="/PromotionFAQs" element={employee && admin? <PromotionFAQ /> : <Navigate to='/login'/>} />
        <Route path="/PromotionCard" element={employee && admin? <PromotionCard /> : <Navigate to='/login'/>} />
        <Route path="/PaymentType" element={employee && admin? <PaymentType /> : <Navigate to='/login'/>} />
        <Route path="/ViewProductByBrand/:id" element={employee && admin? <ViewProductByBrand /> : <Navigate to='/login'/>} />
        <Route path="/FooterInfo" element={employee && admin? <FooterInfo /> : <Navigate to='/login'/>} />
        <Route path="/TimeSlot" element={employee && admin? <TimeSlot /> : <Navigate to='/login'/>} />
        <Route path="/Achievement" element={employee && admin? <Achivement /> : <Navigate to='/login'/>} />
        <Route path="/Article" element={employee && admin? <Article /> : <Navigate to='/login'/>} />
        <Route path="/DeliveryFee" element={employee && admin? <DeliveryFee /> : <Navigate to='/login'/>} />
        <Route path="/ViewCustomerOrders/:id" element={employee && admin || cs || cx || executive || operationEmployee || marketing ? <ViewCustomerOrders /> : <Navigate to='/login'/>} />
        <Route path="/ViewCustomerOrderDetails/:id" element={employee && admin || cs || cx || executive || operationEmployee || marketing? <ViewCustomerOrderDetails /> : <Navigate to='/login'/>} />
        <Route path="/ViewCustomerPlasticHistory/:id" element={employee && (admin || cs || cx || operationEmployee || marketing || executive) ? <ViewCustomerPlasticHistory /> : <Navigate to='/login'/>} />
        <Route path="/ViewCustomerPlasticPoints/:id" element={employee && admin || cs || cx || operationEmployee || marketing || executive ?  <ViewCustomerPlasticPoints /> : <Navigate to='/login'/>} />
        <Route path="/ViewLeaderCustomerByPlasticPoints" element={employee && admin || cs || cx || operationEmployee? <ViewLeaderCustomerByPlasticPoints /> : <Navigate to='/login'/>} />
        <Route path="/ViewCustomerRewardHistory/:id" element={employee && admin || cs || cx || operationEmployee || marketing || executive? <ViewCustomerRewardHistory /> : <Navigate to='/login'/>} />
        <Route path="/CreateOrder1/:id" element={employee && admin || cs || cx || executive? <CreateOrder1 /> : <Navigate to='/login'/>} />
        <Route path="/EditCustomerProfile/:id" element={employee && admin || cx? <EditCustomerProfile /> : <Navigate to='/login'/>} />
        <Route path="/PromoCodeByNumber" element={employee && admin? <PbcNumber /> : <Navigate to='/login'/>} />
        <Route path="/ViewSubCategoryFromCategory/:id" element={employee && admin? <ViewSubCategoryFromCategory /> : <Navigate to='/login'/>} />
        <Route path="/ProductByCategory" element={employee && admin? <ProductByCategory /> : <Navigate to='/login'/>} />
        <Route path="/ViewProductByCategory/:id" element={employee && admin? <ViewProductByCategory /> : <Navigate to='/login'/>} />
        <Route path="/ProductBySubCategory" element={employee && admin? <ProductBySubCategory /> : <Navigate to='/login'/>} />
        <Route path="/ViewProductBySubCategory/:id" element={employee && admin? <ViewProductBySubCategory /> : <Navigate to='/login'/>} />
        <Route path="/ViewCustomerByPromoCode/:promo" element={employee && admin || cs || cx? <ViewCustomerByPromoCode /> : <Navigate to='/login'/>} />
        <Route path="/Marquee" element={employee && admin? <Marquee /> : <Navigate to='/login'/>} />
        <Route path="/reorder/:id" element={employee && admin || cs || cx || executive? <Reorder /> : <Navigate to='/login'/>} />
        <Route path="/ViewPendingOrders/:pending" element={employee && admin || cs || cx || executive || operationEmployee || marketing ? <ViewPendingOrders /> : <Navigate to='/login'/>} />
        <Route path="/ViewCanceledOrders/:canceled" element={employee && admin || cs || cx || executive || operationEmployee || marketing ? <ViewCanceledOrders /> : <Navigate to='/login'/>} />
        <Route path="/ViewProcessingOrders/:processing" element={employee && admin || cs || cx || executive || operationEmployee || marketing ? <ViewProcessingOrders /> : <Navigate to='/login'/>} />
        <Route path="/ViewReadyForDeliveryOrders/:readyForDelivery" element={employee && admin || cs || cx || executive || operationEmployee || marketing ? <ViewReadyForDeliveryOrders /> : <Navigate to='/login'/>} />
        <Route path="/ViewDeliveredOrders/:delivered" element={employee && admin || cs || cx || executive || operationEmployee || marketing ? <ViewDeliveredOrders /> : <Navigate to='/login'/>} />
        <Route path="/TimeRangeOrders" element={employee && admin || cs || cx || executive || operationEmployee || marketing ? <ViewTimeRangeOrders /> : <Navigate to='/login'/>} />
        <Route path="/TimeRangeOrders/:startTime/:endTime/:orderStatus" element={employee && admin || cs || cx || executive || operationEmployee || marketing ? <ViewTimeRangeOrders /> : <Navigate to='/login'/>} />
        <Route path="/EditOrderStatusCanceled/:id" element={employee && admin || cs || cx || executive? <EditOrderStatusCanceled /> : <Navigate to='/login'/>} />
        {/* <Route path="/ViewCustomerDetails/:id" element={employee && admin || cs || cx || executive? <ViewCustomerDetails /> : <Navigate to='/login'/>} /> */}
        <Route path="/ScrollText" element={employee && admin? <ScrollText /> : <Navigate to='/login'/>} />
        <Route path="/QuickAds" element={employee && admin? <QuickAds /> : <Navigate to='/login'/>} />
        <Route path="/ECommerce" element={employee && admin? <ECommerce /> : <Navigate to='/login'/>} />
      </Routes>
    </>
  ); 
}

export default PageRoutes;

