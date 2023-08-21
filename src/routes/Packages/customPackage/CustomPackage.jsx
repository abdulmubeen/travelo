import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../../../store/slices/cartSlice";
import {
  Paper,
  Title,
  Container,
  rem,
  Checkbox,
  Group,
  Select,
  Center,
  MultiSelect,
  Badge,
  Button,
  Text,
  Modal,
  Table,
  Notification,
} from "@mantine/core";
import {
  IconPlaneInflight,
  IconBuilding,
  IconCode,
  IconCalendar,
  IconX,
  IconCheck,
} from "@tabler/icons-react";
import PropTypes from "prop-types";
import { getData } from "../../../utils/selectValues";
import { DateInput } from "@mantine/dates";

const CustomPackage = () => {
  const [optionsSelected, setOptionsSelected] = useState([]);
  const [countrySelected, setCountrySelected] = useState("");
  const [countryFrom, setCountryFrom] = useState("");
  const [flight, setFlight] = useState("");
  const [hotel, setHotel] = useState("");
  const [activities, setActivities] = useState([]);
  const [dateValue, setDateValue] = useState(null);
  const [price, setPrice] = useState(0);

  const [opened, { open, close }] = useDisclosure(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleOpen = () => {
    let newPrice = 0;
    if (optionsSelected.includes("flight")) {
      newPrice += 120;
    }
    if (optionsSelected.includes("hotel")) {
      newPrice += 200;
    }
    if (optionsSelected.includes("activities")) {
      newPrice += activities.length * 75;
    }
    setPrice(newPrice);
    open();
  };

  const handleAdd = () => {
    const date = new Date(dateValue);
    const dateString = date.toDateString();
    if (user == null || user == undefined) {
      <Notification
        icon={<IconX size="1.1rem" />}
        withBorder
        radius="md"
        color="red"
        title={`Login to continue`}
      />;
    }
    const cartItem = {
      packageName: "Custom Package",
      packageId: "customPackage",
      packagePrice: price,
      country: countrySelected,
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
  };

  const FlightIcon = ({ className }) => (
    <IconPlaneInflight className={className} />
  );
  const HotelIcon = ({ className }) => <IconBuilding className={className} />;
  const ActivityIcon = ({ className }) => <IconCode className={className} />;

  FlightIcon.propTypes = {
    className: PropTypes.string,
  };

  HotelIcon.propTypes = {
    className: PropTypes.string,
  };

  ActivityIcon.propTypes = {
    className: PropTypes.string,
  };

  return (
    <>
      <Container mt={rem(40)}>
        <Title>Create Custom Package</Title>
        <Center>
          <Paper shadow="md" withBorder radius="md" p="xl" w="75%" mt={rem(40)}>
            <Container fluid>
              <Checkbox.Group
                onChange={setOptionsSelected}
                value={optionsSelected}
                label="Select what to include in your custom package"
                description="Your options are limited, we are working on providing better customized package options"
              >
                <Group mt="sm" spacing={rem(30)}>
                  <Group>
                    <Checkbox
                      value="flight"
                      label="Flights"
                      icon={FlightIcon}
                      indeterminate
                    />
                    <Badge>+ $120</Badge>
                  </Group>
                  <Group>
                    <Checkbox
                      value="hotel"
                      label="Hotels"
                      icon={HotelIcon}
                      indeterminate
                    />
                    <Badge>+ $200</Badge>
                  </Group>
                  <Group>
                    <Checkbox
                      value="activities"
                      label="Activities"
                      icon={ActivityIcon}
                      indeterminate
                    />
                    <Badge>+ $75 per activity</Badge>
                  </Group>
                </Group>
              </Checkbox.Group>
            </Container>
            <Container fluid>
              <Select
                value={countrySelected}
                placeholder="Pick one"
                data={getData("destination")}
                onChange={setCountrySelected}
                label="Select your destination"
                mt={rem(20)}
              />
            </Container>
            <Container fluid>
              <Select
                value={countryFrom}
                placeholder="Pick one"
                data={getData("departure")}
                onChange={setCountryFrom}
                label="Select your departure country"
                mt={rem(20)}
              />
            </Container>
            {optionsSelected.includes("flight") ? (
              <Container>
                {countrySelected.length !== 0 && countryFrom.length !== 0 ? (
                  <Select
                    value={flight}
                    placeholder="Pick one"
                    data={getData("flights", countryFrom, countrySelected)}
                    onChange={setFlight}
                    label="Select your flight"
                    mt={rem(20)}
                  />
                ) : (
                  <Select
                    data={["1", "2"]}
                    value={""}
                    placeholder="Pick one"
                    label="Select your flight"
                    mt={rem(20)}
                    error={"Select destination/departure first"}
                    disabled
                  />
                )}
              </Container>
            ) : (
              ""
            )}
            {optionsSelected.includes("hotel") ? (
              <Container fluid>
                {countrySelected.length !== 0 ? (
                  <Select
                    data={getData("hotels", "", countrySelected)}
                    value={hotel}
                    placeholder="Pick one"
                    onChange={setHotel}
                    label="Select your hotel"
                    mt={rem(20)}
                  />
                ) : (
                  <Select
                    data={["1", "2"]}
                    value={""}
                    placeholder="Pick one"
                    label="Select your hotel"
                    mt={rem(20)}
                    error={"Select destination first"}
                    disabled
                  />
                )}
              </Container>
            ) : (
              ""
            )}
            {optionsSelected.includes("activities") ? (
              <Container fluid>
                <MultiSelect
                  data={getData("activities")}
                  placeholder="Pick your choice"
                  onChange={setActivities}
                  value={activities}
                  label="Select activities"
                  mt={rem(20)}
                />
              </Container>
            ) : (
              ""
            )}
            <Container fluid>
              <DateInput
                icon={<IconCalendar size="1.1rem" stroke={1.5} />}
                allowDeselect
                value={dateValue}
                onChange={setDateValue}
                label="Select your date"
                placeholder="Date input"
                mx="auto"
                mt={rem(20)}
              />
            </Container>
            <Container fluid>
              <Button radius="md" mt={rem(20)} fullWidth onClick={handleOpen}>
                Get Quote
              </Button>
            </Container>
          </Paper>
        </Center>
      </Container>
      <Modal
        opened={opened}
        onClose={close}
        centered
        title="Select booking date"
        overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
      >
        <Container>
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
                    Custom Package
                  </Text>
                </td>
              </tr>
              <tr>
                <td>Flight Details</td>
                <td>{flight}</td>
              </tr>
              <tr>
                <td>Country</td>
                <td>{countrySelected}</td>
              </tr>
              <tr>
                <td>Stay Details</td>
                <td>{hotel}</td>
              </tr>
              <tr>
                <td>
                  <Text fz="md" fw={500}>
                    Package Price
                  </Text>
                </td>
                <td>
                  <Text fz="md" fw={500}>
                    {price}
                  </Text>
                </td>
              </tr>
            </tbody>
          </Table>
          <Button radius="md" mt={rem(20)} fullWidth onClick={handleAdd}>
            Add to Cart
          </Button>
        </Container>
      </Modal>
    </>
  );
};

export default CustomPackage;
