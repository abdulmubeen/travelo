import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBookingRevenueData } from "../../store/slices/packsSlice";
import { Container, Group, Title, rem } from "@mantine/core";
import ReportItem from "../../components/ReportItem/ReportItem";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const RevenueReports = () => {
  const { bookings, bookingsRevenueData } = useSelector(
    (state) => state.allpacks
  );
  const dispatch = useDispatch();
  const convertObjectToArray = (obj) => {
    return Object.entries(obj).map(([name, value]) => ({ name, value }));
  };
  useEffect(() => {
    const calcRevenue = () => {
      const revenue = {};
      bookings.forEach((obj) => {
        const allBookingItems = Object.values(obj);
        allBookingItems.forEach((bookObj) => {
          const packagePrice = Number(bookObj.packagePrice);
          const packageName = bookObj.packageName;
          if (revenue[packageName]) {
            revenue[packageName] += packagePrice;
          } else {
            revenue[packageName] = packagePrice;
          }
        });
      });
      dispatch(setBookingRevenueData(convertObjectToArray(revenue)));
    };
    calcRevenue();
  }, [bookings, dispatch]);
  return (
    <Container>
      <Title order={1} mt={rem(30)}>
        Revenue Reports
      </Title>
      <Group mt={rem(32)} position="center">
        <AreaChart
          width={500}
          height={400}
          data={bookingsRevenueData}
          margin={{
            top: 30,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </Group>
      <ReportItem data={bookingsRevenueData} />
    </Container>
  );
};

export default RevenueReports;
