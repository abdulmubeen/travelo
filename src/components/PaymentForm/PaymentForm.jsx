import {
  PaymentElement,
  LinkAuthenticationElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Button,
  Text,
  Alert,
  Container,
  rem,
  Space,
  Title,
  Card,
  Divider,
  Stack,
  Group,
} from "@mantine/core";
import { IconAlertCircle, IconLock } from "@tabler/icons-react";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { cartCount, cartTotal } = useSelector((state) => state.cartDetails);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/order-success`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  const paymentJSX = [
    <>
      <Title order={3} mb={rem(12)}>
        Contact Info
      </Title>
      <LinkAuthenticationElement
        id="link-authentication-element"
        options={{ defaultValues: { email: "" } }}
      />
      <Space h={"md"} />
      <Title order={3} mt={rem(24)} mb={rem(12)}>
        Billing Address
      </Title>
      <AddressElement id="address-element" options={{ mode: "billing" }} />
      <Space h={"md"} />
      <Title order={3} mt={rem(24)} mb={rem(12)}>
        Payment
      </Title>
      <PaymentElement id="payment-element" />
    </>,
  ];

  return (
    <Container mt={rem(40)}>
      <form id="payment-form" onSubmit={handleSubmit}>
        {paymentJSX}
        <Card withBorder shadow="lg" mt={rem(28)} mb={rem(32)} padding="xl">
          <Stack align="stretch">
            <Group position="apart">
              <Text>{`Subtotal (${cartCount} packs)`}</Text>
              <Text>$ {cartTotal}</Text>
            </Group>
            <Group position="apart">
              <Text>Taxes</Text>
              <Text>$ 0</Text>
            </Group>
            <Divider size="sm" />
            <Group position="apart">
              <Title order={4} color="white">
                Total
              </Title>
              <Title order={4} color="white">
                $ {cartTotal}
              </Title>
            </Group>
          </Stack>
          <Group grow>
            <Button
              mt={rem(28)}
              variant="light"
              size="lg"
              onClick={() => navigate("/cart")}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading || !stripe || !elements}
              id="submit"
              loading={isLoading}
              mt={rem(28)}
              size="lg"
              type="submit"
              rightIcon={<IconLock />}
            >
              <Text id="button-text">Pay Now</Text>
            </Button>
          </Group>
        </Card>
      </form>
      {/* Show any error or success messages */}
      {message && (
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          id="payment-message"
          title="Bummer!"
          color="red"
          mb={rem(42)}
        >
          {message}
        </Alert>
      )}
    </Container>
  );
}
