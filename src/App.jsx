import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
  getUserDocumentFromAuth,
  getUserBookings,
  getAllPackages,
} from "./utils/firebase";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/slices/userSlice";
import {
  setAllPacks,
  setAllBookings,
  setCurrentUserBookings,
} from "./store/slices/packsSlice";

import NavBar from "./routes/navbar/NavBar";
import Home from "./routes/home/Home";
import AllPackages from "./routes/Packages/allPackages/AllPackages";
import Auth from "./routes/authentication/Auth";
import ClientBookings from "./routes/Bookings/clientBookings/ClientBookings";
import MyBookings from "./routes/Bookings/myBookings/MyBookings";
import Cart from "./routes/cart/Cart";
import CreatePackage from "./routes/Packages/createPackage/CreatePackage";
import CustomPackage from "./routes/Packages/customPackage/CustomPackage";
import ModifyPackage from "./routes/Packages/modifyPackage/ModifyPackage";
import Checkout from "./routes/Payment/checkout/Checkout";
import OrderSuccess from "./routes/Payment/orderSuccess/OrderSuccess";
import RevenueReports from "./routes/revenueReports/RevenueReports";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        await createUserDocumentFromAuth(user);
        const { name, email, userType, id } = await getUserDocumentFromAuth(
          user
        );
        if (userType === "Agent") {
          const bookings = await getUserBookings();
          dispatch(setAllBookings(bookings));
        } else if (userType === "User") {
          const bookings = await getUserBookings();
          const currUserBookings = [];
          bookings.forEach((booking) => {
            const allBookingItems = Object.values(booking);
            allBookingItems.map((bookItem) => {
              if (bookItem.userId === id) currUserBookings.push(bookItem);
            });
          });
          currUserBookings.length !== 0
            ? dispatch(setCurrentUserBookings(currUserBookings))
            : "";
        }
        dispatch(setCurrentUser({ name, email, userType, id }));
      } else {
        dispatch(setCurrentUser(null));
      }
    });
    return unsubscribe;
  });

  useEffect(() => {
    const fetchPackages = async () => {
      const packs = await getAllPackages();
      dispatch(setAllPacks(packs));
    };
    fetchPackages();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="/all-packages" element={<AllPackages />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/create-package" element={<CreatePackage />} />
        <Route path="/modify-package" element={<ModifyPackage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/all-bookings" element={<ClientBookings />} />
        <Route path="/revenue-reports" element={<RevenueReports />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/custom-package" element={<CustomPackage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Route>
    </Routes>
  );
};

export default App;
