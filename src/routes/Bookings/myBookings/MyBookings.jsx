import { useSelector } from "react-redux";
import { Container, Title, rem } from "@mantine/core";
import UserBookingItem from "../../../components/Booking/UserBookingItem/UserBookingItem";

const MyBookings = () => {
  const { currentUserBookings } = useSelector((state) => state.allpacks);
  return (
    <Container mt={rem(40)}>
      <Title order={2}>My Bookings</Title>
      <UserBookingItem data={currentUserBookings} />
    </Container>
  );
};
export default MyBookings;
