import { Container } from "@mantine/core";

import AuthenticationForm from "../../components/Authentication/AuthenticationForm";

const Auth = () => {
  return (
    <Container size={450} my={40}>
      <AuthenticationForm />
    </Container>
  );
};

export default Auth;
