import { Container } from "@mantine/core";

import HeroHeader from "../../components/Home/HeroHeader/HeroHeader";
import Features from "../../components/Home/Features/Features";
import Blog from "../../components/Home/Blog/Blog";
import Faq from "../../components/Home/Faq/Faq";
import { ContactForm } from "../../components/Home/ContactForm/ContactForm";
import Footer from "../../components/Home/Footer/Footer";

const Home = () => {
  return (
    <>
      <HeroHeader />
      <Features />
      <Blog />
      <Faq />
      <Container>
        <ContactForm />
      </Container>
      <Footer />
    </>
  );
};

export default Home;
