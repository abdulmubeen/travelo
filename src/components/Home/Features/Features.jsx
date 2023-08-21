import {
  createStyles,
  Text,
  SimpleGrid,
  Container,
  rem,
  Group,
  Badge,
  Title,
} from "@mantine/core";
import {
  IconArrowGuide,
  IconMapPins,
  IconStack2,
  IconHeart,
  IconCreditCard,
  IconHeadset,
} from "@tabler/icons-react";
import PropTypes from "prop-types";

const useStyles = createStyles((theme) => ({
  feature: {
    position: "relative",
    paddingTop: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },

  mainTitle: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.xl,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  overlay: {
    position: "absolute",
    height: rem(100),
    width: rem(160),
    top: 0,
    left: 0,
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    zIndex: 1,
  },

  content: {
    position: "relative",
    zIndex: 2,
  },

  icon: {
    color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
      .color,
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

const Feature = ({ icon: Icon, title, description, className, ...others }) => {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.feature, className)} {...others}>
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Icon size={rem(38)} className={classes.icon} stroke={1.5} />
        <Text fw={700} fz="lg" mb="xs" mt={5} className={classes.title}>
          {title}
        </Text>
        <Text c="dimmed" fz="sm">
          {description}
        </Text>
      </div>
    </div>
  );
};
Feature.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
};

const mockdata = [
  {
    icon: IconMapPins,
    title: "Explore Exciting Destinations",
    description:
      "Discover captivating destinations for unforgettable journeys and lasting memories.",
  },
  {
    icon: IconStack2,
    title: "Customizable Tour Packages",
    description:
      "Tailor your travel experience to your preferences with flexible options.",
  },
  {
    icon: IconHeart,
    title: "Hassle-Free Travel Planning",
    description:
      "Let us handle logistics, transportation, and itinerary management.",
  },
  {
    icon: IconArrowGuide,
    title: "Expert Tour Guides",
    description:
      "Knowledgeable guides ensure a seamless travel experience and local insights.",
  },
  {
    icon: IconCreditCard,
    title: "Easy Booking and Payment Options",
    description:
      "User-friendly website with secure booking and payment methods.",
  },
  {
    icon: IconHeadset,
    title: "24/7 Customer Support",
    description:
      "Dedicated support team available to assist with queries and requests.",
  },
];

const Features = () => {
  const { classes } = useStyles();
  const items = mockdata.map((item) => <Feature {...item} key={item.title} />);

  return (
    <Container mt={80} mb={30} size="lg">
      <Group position="center">
        <Badge variant="filled" size="lg">
          Travelo
        </Badge>
      </Group>

      <Title order={2} className={classes.mainTitle} ta="center" mt="sm">
        Unlock the Essence of Travel
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        At our travel company, we believe that travel is more than just visiting
        new places; its about unlocking the essence of each destination. Immerse
        yourself in local cultures, savor authentic flavors, and create
        connections that will last a lifetime.
      </Text>
      <SimpleGrid
        cols={3}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        spacing={50}
        mt={65}
      >
        {items}
      </SimpleGrid>
    </Container>
  );
};

export default Features;
