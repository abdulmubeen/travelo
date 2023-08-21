import { useState, Fragment } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch } from "react-redux";
import { deleteUserBooking } from "../../../utils/firebase";
import {
  deleteItemFromUserBookings,
  modifyItemFromUserBookings,
} from "../../../store/slices/packsSlice";
import {
  Table,
  Text,
  ActionIcon,
  ScrollArea,
  HoverCard,
  Avatar,
  Container,
  Group,
  rem,
  Button,
  Modal,
} from "@mantine/core";
import { IconTrash, IconPencil } from "@tabler/icons-react";
import { DatePicker } from "@mantine/dates";
import PropTypes from "prop-types";

const UserBookingItem = ({ data }) => {
  const dispatch = useDispatch();
  const [dateValue, setDateValue] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const deleteItemHandler = async (item) => {
    await deleteUserBooking(item.userId, item.packageId);
    dispatch(deleteItemFromUserBookings(item));
  };
  const modifyItemHandler = async (item) => {
    if (dateValue !== null) {
      close();
      const date = new Date(dateValue);
      const dateString = date.toDateString();
      dispatch(modifyItemFromUserBookings([item, dateString]));
    }
  };

  const rows = data.map((item) => {
    const id = `${item.userName}+${item.packageId}`;
    return (
      <Fragment key={id}>
        <tr>
          <td>
            <Text fz="sm">{item.bookDate}</Text>
          </td>
          <td>
            <Text fz="sm">{item.packageName}</Text>
          </td>
          <td>
            <Text fz="sm">{item.country}</Text>
          </td>
          <td>
            <Group>
              <ActionIcon color="blue" onClick={() => open()}>
                <IconPencil size="1rem" stroke={1.5} />
              </ActionIcon>
              <ActionIcon color="red" onClick={() => deleteItemHandler(item)}>
                <IconTrash size="1rem" stroke={1.5} />
              </ActionIcon>
            </Group>
          </td>
        </tr>
        <Modal
          opened={opened}
          onClose={close}
          centered
          key={id}
          scrollAreaComponent={ScrollArea.Autosize}
          title="Change Booking Date"
          overlayProps={{
            opacity: 0.2,
            blur: 3,
          }}
        >
          <Group position="center">
            <DatePicker
              allowDeselect
              value={dateValue}
              onChange={setDateValue}
            />
          </Group>
          <Button
            radius="md"
            mt={rem(20)}
            fullWidth
            onClick={() => modifyItemHandler(item)}
          >
            Confirm
          </Button>
        </Modal>
      </Fragment>
    );
  });

  return (
    <>
      <ScrollArea mt={rem(35)}>
        {data.length > 0 ? (
          <Container>
            <Group>
              <HoverCard shadow="md">
                <HoverCard.Target>
                  <Avatar size="md" color="blue">
                    {data[0].userName
                      .split(" ")
                      .map((item) => item.charAt(0))
                      .join("")
                      .toUpperCase()}
                  </Avatar>
                </HoverCard.Target>
                <HoverCard.Dropdown>{data[0].userName}</HoverCard.Dropdown>
              </HoverCard>
              <Text sx={{ fontSize: rem(18), fontWeight: 500 }}>
                {data[0].userName}
              </Text>
              <Text color="dimmed">{data[0].userEmail}</Text>
            </Group>
            <Table striped verticalSpacing="sm" mt={"xl"}>
              <thead>
                <tr>
                  <th>Booking Date</th>
                  <th>Package Name</th>
                  <th>Country</th>
                  <th />
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </Container>
        ) : (
          ""
        )}
      </ScrollArea>
    </>
  );
};

UserBookingItem.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserBookingItem;
