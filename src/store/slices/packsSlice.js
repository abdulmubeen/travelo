import { createSlice, current } from "@reduxjs/toolkit";

const deleteBookingItem = (bookings, itemToDelete) => {
  const boookings = current(bookings);
  const newArr = boookings.map((booking) => {
    const newBook = Object.values(booking);
    const filterBook = newBook.filter((item) => {
      if (
        item.packageId === itemToDelete.packageId &&
        item.userId === itemToDelete.userId
      ) {
        return false;
      } else {
        return true;
      }
    });
    const newObj = Object.assign({}, filterBook);
    return newObj;
  });
  return newArr;
};

const deleteUserBookingItem = (currBookings, itemToDelete) => {
  const bookings = current(currBookings);
  const newArr = bookings.filter((booking) => {
    if (
      booking.packageId === itemToDelete.packageId &&
      booking.userId === itemToDelete.userId
    ) {
      return false;
    } else {
      return true;
    }
  });
  return newArr;
};

const deletePackage = (allPacks, packageId) => {
  const packs = current(allPacks);
  const allPackss = Object.values(packs);
  const newPacks = allPackss.filter((pack) => {
    if (pack.packageId === packageId) return false;
    else return true;
  });
  return newPacks;
};

const modifyUserBooking = (currBookings, itemToModify, date) => {
  const bookings = current(currBookings);
  const newArr = bookings.map((booking) => {
    if (
      booking.packageId === itemToModify.packageId &&
      booking.userId === itemToModify.userId
    ) {
      return { ...booking, bookDate: date };
    } else {
      return { ...booking };
    }
  });
  return newArr;
};

const modifyBookingItem = (bookings, itemToModify, date) => {
  const boookings = current(bookings);
  const newArr = boookings.map((booking) => {
    const newBook = Object.values(booking);
    const modifyBook = newBook.map((item) => {
      if (
        item.packageId === itemToModify.packageId &&
        item.userId === itemToModify.userId
      ) {
        return { ...item, bookDate: date };
      } else {
        return { ...item };
      }
    });
    const newObj = Object.assign({}, modifyBook);
    return newObj;
  });
  return newArr;
};

const initialState = {
  allPacks: [],
  bookings: [],
  bookingsChartData: [],
  bookingsRevenueData: [],
  currentUserBookings: [],
};

const packsSlice = createSlice({
  name: "allpacks",
  initialState,
  reducers: {
    setAllPacks: (state, action) => {
      return { ...state, allPacks: action.payload };
    },
    setAllBookings: (state, action) => {
      return { ...state, bookings: action.payload };
    },
    deleteItemFromBookings: (state, action) => {
      const newBookings = deleteBookingItem(state.bookings, action.payload);
      return { ...state, bookings: newBookings };
    },
    deleteItemFromUserBookings: (state, action) => {
      const newUserBookings = deleteUserBookingItem(
        state.currentUserBookings,
        action.payload
      );
      return { ...state, currentUserBookings: newUserBookings };
    },
    deleteItemFromPackage: (state, action) => {
      const newPackages = deletePackage(state.allPacks, action.payload);
      return { ...state, allPacks: newPackages };
    },
    modifyItemFromUserBookings: (state, action) => {
      const newBookings = modifyUserBooking(
        state.currentUserBookings,
        action.payload[0],
        action.payload[1]
      );
      return { ...state, currentUserBookings: newBookings };
    },
    modifyItemFromBookings: (state, action) => {
      const newBookings = modifyBookingItem(
        state.bookings,
        action.payload[0],
        action.payload[1]
      );
      return { ...state, bookings: newBookings };
    },
    setBookingChartData: (state, action) => {
      return { ...state, bookingsChartData: action.payload };
    },
    setBookingRevenueData: (state, action) => {
      return { ...state, bookingsRevenueData: action.payload };
    },
    setCurrentUserBookings: (state, action) => {
      return { ...state, currentUserBookings: action.payload };
    },
  },
});

export const {
  setAllPacks,
  setAllBookings,
  deleteItemFromBookings,
  deleteItemFromUserBookings,
  deleteItemFromPackage,
  modifyItemFromBookings,
  modifyItemFromUserBookings,
  setBookingChartData,
  setBookingRevenueData,
  setCurrentUserBookings,
} = packsSlice.actions;
export default packsSlice.reducer;
