import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAllPacks } from "../../../store/slices/packsSlice";
import { addPackage } from "../../../utils/firebase";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Text,
  Paper,
  Group,
  Button,
  Container,
  Stack,
  Notification,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import PropTypes from "prop-types";

const PackageForm = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allPacks } = useSelector((state) => state.allpacks);
  const allPackages = Object.values(allPacks);

  const packIds = allPackages.map((pack) => {
    if (pack !== null) return pack.packageId;
  });

  const handlePackageForm = async (packDetails) => {
    if (type === "Create") {
      const newPack = [...allPackages, packDetails];
      await addPackage(packDetails);
      dispatch(setAllPacks(newPack));
      <Notification
        icon={<IconCheck size="1.1rem" />}
        withBorder
        radius="md"
        color="green"
        title={`Package Added!`}
      />;
      navigate("/packages");
    } else if (type === "Modify") {
      if (packIds.includes(packDetails.packageId)) {
        const filteredPack = allPackages.filter(
          (pack) => pack.packageId !== packDetails.packageId
        );
        const newPack = [...filteredPack, packDetails];
        await addPackage(packDetails);
        dispatch(setAllPacks(newPack));
        <Notification
          icon={<IconCheck size="1.1rem" />}
          withBorder
          radius="md"
          color="green"
          title={`Package Modified!`}
        />;
        navigate("/packages");
      }
    }
  };

  const form = useForm({
    initialValues: {
      packageId: "",
      packageName: "",
      packageDuration: "",
      packageImage: "",
      flightDetails: "",
      country: "",
      stayDetails: "",
      activities: [],
      packagePrice: "",
    },
    validate: {
      packageId: (val) =>
        type === "Create"
          ? packIds.includes(val)
            ? "Package id must be different"
            : null
          : val.length <= 0
          ? "Cannot be zero"
          : null,
    },
  });

  return (
    <Container size={450} my={40}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="xl" weight={500} align="center">
          {type} package
        </Text>
        {type == "Create" ? (
          <Text mt={20} size="lg" weight={600} align="center">
            Create a new package
          </Text>
        ) : (
          <Text mt={20} size="lg" weight={600} align="center">
            Modify an existing package
          </Text>
        )}
        <form
          onSubmit={form.onSubmit((values) => {
            const activityArr = values.activities
              .split(",")
              .map((item) => item.trim());
            const newValues = { ...values, activities: activityArr };
            handlePackageForm(newValues);
          })}
        >
          <Stack mt={10}>
            <TextInput
              label="Package Id"
              placeholder="Enter the package id"
              value={form.values.packageId}
              onChange={(event) =>
                form.setFieldValue("packageId", event.currentTarget.value)
              }
              radius="md"
              error={form.errors.packageId && "Package id must be different"}
              required
            />
            <TextInput
              label="Package Name"
              placeholder="Enter the package name"
              value={form.values.packageName}
              onChange={(event) =>
                form.setFieldValue("packageName", event.currentTarget.value)
              }
              radius="md"
              required
            />
            <TextInput
              label="Package Duration"
              placeholder="Enter the package duration"
              value={form.values.packageDuration}
              onChange={(event) =>
                form.setFieldValue("packageDuration", event.currentTarget.value)
              }
              radius="md"
              required
            />
            <TextInput
              label="Package Image"
              placeholder="Enter the package image url"
              value={form.values.packageImage}
              onChange={(event) =>
                form.setFieldValue("packageImage", event.currentTarget.value)
              }
              radius="md"
              required
            />
            <TextInput
              label="Flight Details"
              placeholder="Enter the flight details"
              value={form.values.flightDetails}
              onChange={(event) =>
                form.setFieldValue("flightDetails", event.currentTarget.value)
              }
              radius="md"
              required
            />
            <TextInput
              label="Country"
              placeholder="Enter the country name"
              value={form.values.country}
              onChange={(event) =>
                form.setFieldValue("country", event.currentTarget.value)
              }
              radius="md"
              required
            />
            <TextInput
              label="Stay Details"
              placeholder="Enter the stay details"
              value={form.values.stayDetails}
              onChange={(event) =>
                form.setFieldValue("stayDetails", event.currentTarget.value)
              }
              radius="md"
              required
            />
            <TextInput
              label="Activities"
              placeholder="Enter the activities"
              value={form.values.activities}
              onChange={(event) =>
                form.setFieldValue("activities", event.currentTarget.value)
              }
              radius="md"
              required
            />
            <TextInput
              label="Price"
              placeholder="Enter the package price"
              value={form.values.packagePrice}
              onChange={(event) =>
                form.setFieldValue("packagePrice", event.currentTarget.value)
              }
              radius="md"
              required
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Button type="submit" radius="xl">
              {"Submit"}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

PackageForm.propTypes = {
  type: PropTypes.string,
};

export default PackageForm;
