import { useDispatch } from "react-redux";
import { deleteItemFromCart } from "../../../store/slices/cartSlice";
import { Table, Text, ActionIcon, ScrollArea } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import PropTypes from "prop-types";

const CartItem = ({ data }) => {
  const dispatch = useDispatch();
  const deleteItemHandler = (item) => dispatch(deleteItemFromCart(item));

  const rows = data.map((item) => (
    <tr key={item.packageId}>
      <td>
        <Text fz="sm" fw={500}>
          {item.packageName}
        </Text>
      </td>
      <td>
        <Text fz="sm">{item.bookDate}</Text>
      </td>
      <td>
        <Text fz="sm">{item.country}</Text>
      </td>
      <td>
        <Text fz="sm" fw="bold">
          ${item.packagePrice}
        </Text>
      </td>
      <td>
        <ActionIcon color="red" onClick={() => deleteItemHandler(item)}>
          <IconTrash size="1rem" stroke={1.5} />
        </ActionIcon>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table striped verticalSpacing="sm" mt={"xl"}>
        <thead>
          <tr>
            <th>Package Name</th>
            <th>Booking Date</th>
            <th>Country</th>
            <th>Price</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

CartItem.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CartItem;
