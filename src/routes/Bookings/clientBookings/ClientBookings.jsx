import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setBookingChartData } from "../../../store/slices/packsSlice";
import { Container, Text, createStyles, rem, Group } from "@mantine/core";
import BookingItem from "../../../components/Booking/BookingItem/BookingItem";
import { PieChart, Pie, Tooltip } from "recharts";

const useStyles = createStyles((theme) => ({
  pageTitle: {
    fontSize: rem(32),
    marginTop: rem(30),

    [theme.fn.smallerThan("md")]: {
      fontSize: rem(22),
    },
  },
}));
const ClientBookings = () => {
  const { bookings, bookingsChartData } = useSelector(
    (state) => state.allpacks
  );
  const dispatch = useDispatch();
  const convertObjectToArray = (obj) => {
    return Object.entries(obj).map(([name, value]) => ({ name, value }));
  };

  useEffect(() => {
    const calcQuantity = () => {
      const quantities = {};
      bookings.forEach((obj) => {
        const allBookingItems = Object.values(obj);
        allBookingItems.forEach((bookObj) => {
          const packageName = bookObj.packageName;
          if (quantities[packageName]) {
            quantities[packageName]++;
          } else {
            quantities[packageName] = 1;
          }
        });
      });
      dispatch(setBookingChartData(convertObjectToArray(quantities)));
    };
    calcQuantity();
  }, [bookings, dispatch]);

  const { classes } = useStyles();
  return (
    <Container pb={rem(40)}>
      <Text className={classes.pageTitle} fw="bold">
        Client Bookings
      </Text>
      <Group position="center">
        <PieChart width={250} height={250}>
          <Pie
            dataKey="value"
            data={bookingsChartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#82ca9d"
            label
          />
          <Tooltip />
        </PieChart>
      </Group>
      {bookings.map((booking, index) => {
        const allBookingItems = Object.values(booking);
        return <BookingItem data={allBookingItems} key={index} />;
      })}
    </Container>
  );
};

export default ClientBookings;
