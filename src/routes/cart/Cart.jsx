import { useEffect } from "react"; //useState
import {
  Container,
  Text,
  createStyles,
  rem,
  Group,
  Button,
  Notification,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useSelector, useDispatch } from "react-redux";
import { setCartTotal } from "../../store/slices/cartSlice";
import CartItem from "../../components/Cart/CartItem/CartItem";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  title: {
    color: theme.white,
    fontWeight: 500,
    fontSize: rem(34),

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: rem(24),
    },
  },
  totalLabel: {
    color: theme.white,
    fontWeight: 500,
    fontSize: rem(20),
    marginTop: rem(24),

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: rem(14),
    },
  },
  totalPrice: {
    fontSize: rem(20),
    marginTop: rem(24),

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: rem(14),
    },
  },
}));

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { cartItems, cartTotal } = useSelector((state) => state.cartDetails);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + Number(cartItem.packagePrice),
      0
    );
    dispatch(setCartTotal(newCartTotal));
  }, [cartItems, dispatch]);

  const handleBook = async () => {
    if (user !== null) {
      navigate("/checkout");
    } else {
      <Notification
        icon={<IconInfoCircle size="1.1rem" />}
        withBorder
        radius="md"
        color="blue"
        title={`You need to login first`}
      />;
      navigate("/auth");
    }
  };
  return (
    <Container>
      <Text size="xl" fw="bold" mt="xl" className={classes.title}>
        Cart Items
      </Text>
      {cartItems.length !== 0 ? (
        <CartItem data={cartItems} />
      ) : (
        <Text>Your cart is empty</Text>
      )}
      <Group sx={{ justifyContent: "flex-end" }}>
        <Text className={classes.totalLabel}>Your Total:</Text>
        <Text className={classes.totalPrice}>${cartTotal}</Text>
      </Group>
      <Group sx={{ justifyContent: "flex-end", marginTop: rem(27) }}>
        <Button
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
          onClick={handleBook}
        >
          Book Now
        </Button>
      </Group>
    </Container>
  );
};

export default Cart;
