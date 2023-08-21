import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useSelector, useDispatch } from "react-redux";
import { deletePackage } from "../../../utils/firebase";
import { deleteItemFromPackage } from "../../../store/slices/packsSlice";
import { addItemToCart } from "../../../store/slices/cartSlice";
import PropTypes from "prop-types";
import {
  IconBeach,
  IconCalendarTime,
  IconPlaneInflight,
  IconBuilding,
  IconCalendar,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import {
  Card,
  Text,
  Image,
  Group,
  Badge,
  Button,
  createStyles,
  Notification,
  rem,
  Modal,
  Container,
  Table,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

const PackageCard = ({
  packageName,
  packageDuration,
  flightDetails,
  country,
  stayDetails,
  activities,
  packagePrice,
  packageId,
  packageImage,
}) => {
  const [dateValue, setDateValue] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const user = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cartDetails);
  const dispatch = useDispatch();
  const { classes, theme } = useStyles();
  const handleDelete = async () => {
    await deletePackage(packageId);
    dispatch(deleteItemFromPackage(packageId));
    <Notification
      icon={<IconCheck size="1.1rem" />}
      withBorder
      radius="md"
      color="green"
      title={`Package ${packageId} deleted!`}
    />;
  };
  const handleAdd = () => {
    const date = new Date(dateValue);
    const dateString = date.toDateString();
    const presentIds = cartItems.map((item) => item.packageId);
    if (!presentIds.includes(packageId)) {
      if (user !== null) {
        const cartItem = {
          packageName: packageName,
          packageId: packageId,
          packagePrice: packagePrice,
          country: country,
          bookDate: dateString,
          userEmail: user.email,
          userName: user.name,
          userId: user.id,
        };
        dispatch(addItemToCart(cartItem));
        <Notification
          icon={<IconCheck size="1.1rem" />}
          withBorder
          radius="md"
          color="green"
          title={`Package added to cart`}
        />;
        close();
      } else {
        <Notification
          icon={<IconX size="1.1rem" />}
          withBorder
          radius="md"
          color="red"
          title={`Login to continue`}
        />;
      }
    } else {
      <Notification
        icon={<IconX size="1.1rem" />}
        withBorder
        radius="md"
        color="red"
        title={`Package already added to cart`}
      />;
    }
  };
  const features = activities.map((activity) => (
    <Badge
      color={theme.colorScheme === "dark" ? "dark" : "gray"}
      key={activity}
    >
      {activity}
    </Badge>
  ));
  return (
    <>
      <Card
        withBorder
        shadow="md"
        radius="md"
        p="md"
        className={classes.card}
        mt={rem(24)}
      >
        <Card.Section>
          <Image src={packageImage} height={180} />
        </Card.Section>
        <Card.Section className={classes.section} mt="md">
          <Group position="apart">
            <IconBeach />
            <Text fz="lg" fw={500}>
              {packageName}
            </Text>
            <Badge size="sm">{country}</Badge>
          </Group>
          <Group position="left" mt={"xs"}>
            <IconCalendarTime />
            <Text fz="sm">{packageDuration}</Text>
          </Group>
          <Group position="left" mt={"xs"}>
            <IconPlaneInflight />
            <Text fz="sm">{flightDetails}</Text>
          </Group>
          <Group position="left" mt={"xs"}>
            <IconBuilding />
            <Text fz="sm">{stayDetails}</Text>
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Text mt="xs" className={classes.label} c="dimmed">
            Activities
          </Text>
          <Group spacing={7} mt={"md"}>
            {features}
          </Group>
        </Card.Section>

        <Group mt="xs">
          <Text fw={"bold"} fz="lg">
            $ {packagePrice}
          </Text>
          {user !== null && user.userType === "Agent" ? (
            <Button
              radius="md"
              color="red"
              style={{ flex: 1 }}
              onClick={handleDelete}
            >
              Delete Package
            </Button>
          ) : (
            <Button radius="md" style={{ flex: 1 }} onClick={open}>
              Select Package
            </Button>
          )}
        </Group>
      </Card>
      <Modal
        opened={opened}
        onClose={close}
        centered
        title="Select booking date"
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        <Container>
          <Image src={packageImage} height={180} />
          <Table striped mt={rem(15)}>
            <tbody>
              <tr>
                <td>
                  <Text fz="lg" fw={"bold"}>
                    Package Name
                  </Text>
                </td>
                <td>
                  <Text fz="lg" fw={"bold"}>
                    {packageName}
                  </Text>
                </td>
              </tr>
              <tr>
                <td>Package Duration</td>
                <td>{packageDuration}</td>
              </tr>
              <tr>
                <td>Flight Details</td>
                <td>{flightDetails}</td>
              </tr>
              <tr>
                <td>Country</td>
                <td>{country}</td>
              </tr>
              <tr>
                <td>Stay Details</td>
                <td>{stayDetails}</td>
              </tr>
              <tr>
                <td>
                  <Text fz="md" fw={500}>
                    Package Price
                  </Text>
                </td>
                <td>
                  <Text fz="md" fw={500}>
                    {packagePrice}
                  </Text>
                </td>
              </tr>
            </tbody>
          </Table>
          <DateInput
            icon={<IconCalendar size="1.1rem" stroke={1.5} />}
            allowDeselect
            value={dateValue}
            onChange={setDateValue}
            label="Select your date"
            placeholder="Date input"
            maw={400}
            mx="auto"
            mt={rem(25)}
          />
          <Button radius="md" mt={rem(20)} fullWidth onClick={handleAdd}>
            Add to Cart
          </Button>
        </Container>
      </Modal>
    </>
  );
};

PackageCard.propTypes = {
  packageName: PropTypes.string,
  packageDuration: PropTypes.string,
  flightDetails: PropTypes.string,
  country: PropTypes.string,
  stayDetails: PropTypes.string,
  activities: PropTypes.array,
  packagePrice: PropTypes.string,
  packageId: PropTypes.string,
  packageImage: PropTypes.string,
};

export default PackageCard;
