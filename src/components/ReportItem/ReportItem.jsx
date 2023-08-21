import { Table, Text, ScrollArea, Container, rem } from "@mantine/core";
import PropTypes from "prop-types";

const ReportItem = ({ data }) => {
  let totalAmount = 0;
  const rows = data.map((bookObj) => {
    const id = `${bookObj.name}-${bookObj.value}`;
    totalAmount += bookObj.value;
    return (
      <tr key={id}>
        <td>
          <Text fz="sm">{bookObj.name}</Text>
        </td>
        <td>
          <Text fz="sm">$ {bookObj.value}</Text>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea mt={rem(35)} mb={rem(40)}>
      {data.length > 0 ? (
        <Container>
          <Table striped verticalSpacing="sm" mt={"xl"}>
            <thead>
              <tr>
                <th>Package Name</th>
                <th>Package Revenue</th>
              </tr>
            </thead>
            <tbody>
              {rows}
              <tr>
                <td>
                  <Text fz="sm" fw={650}>
                    Total Revenue
                  </Text>
                </td>
                <td>
                  <Text fz="sm" fw={650}>
                    $ {totalAmount}
                  </Text>
                </td>
              </tr>
            </tbody>
          </Table>
        </Container>
      ) : (
        ""
      )}
    </ScrollArea>
  );
};

ReportItem.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ReportItem;
