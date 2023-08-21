import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../../store/slices/cartSlice";
import { Container, Text, Button, Title, Group, rem } from "@mantine/core";
import { createUserBooking } from "../../../utils/firebase";
import { IconCircleCheck } from "@tabler/icons-react";

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cartDetails);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const storeBooking = async () => {
      const bookingInfo = { ...cartItems };
      await createUserBooking(bookingInfo, user.id);
      dispatch(reset());
    };
    storeBooking();
  }, [cartItems, dispatch, user]);
  return (
    <Container>
      <Group mt={rem(32)}>
        <IconCircleCheck color="green" size={rem(28)} />
        <Title order={1} color="green">
          Trip Confirmed!
        </Title>
      </Group>
      <Group>
        <Text>To go back to the home page</Text>
        <Button variant="subtle" onClick={() => navigate("/")} st>
          Click Here
        </Button>
      </Group>
    </Container>
  );
};

export default OrderSuccess;
