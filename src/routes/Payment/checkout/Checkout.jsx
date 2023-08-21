import { useEffect, useState } from "react";
import { Center, Container, Loader, rem } from "@mantine/core";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import PaymentForm from "../../../components/PaymentForm/PaymentForm";

const Checkout = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const { cartTotal } = useSelector((state) => state.cartDetails);

  const appearance = {
    theme: "night",
    labels: "floating",
  };
  const loader = "auto";

  useEffect(() => {
    fetch("https://travelo-server.onrender.com/stripe-config").then(
      async (r) => {
        const { publishableKey } = await r.json();
        setStripePromise(loadStripe(publishableKey));
      }
    );
  }, []);

  useEffect(() => {
    fetch("https://travelo-server.onrender.com/payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: cartTotal * 100 }),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, [cartTotal]);
  return (
    <Container>
      {clientSecret && stripePromise ? (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance, loader }}
        >
          <PaymentForm />
        </Elements>
      ) : (
        <Center mt={rem(52)}>
          <Loader />
        </Center>
      )}
    </Container>
  );
};

export default Checkout;
