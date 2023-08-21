import { useSelector } from "react-redux";
import { signOutUser } from "../../utils/firebase";
import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconPlus,
  IconPencil,
  IconCards,
  IconChevronDown,
  IconApps,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import CartIcon from "../Cart/CartIcon/CartIcon";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const adminData = [
  {
    icon: IconCards,
    title: "All Packages",
    description: "View and Delete Packages",
    to: "/all-packages",
  },
  {
    icon: IconPlus,
    title: "Add Package",
    description: "Create a new Travel Package",
    to: "/create-package",
  },
  {
    icon: IconPencil,
    title: "Modify Package",
    description: "Modify an existing Travel Package",
    to: "/modify-package",
  },
];

const userData = [
  {
    icon: IconCards,
    title: "All Packages",
    description: "View and Delete Packages",
    to: "/all-packages",
  },
  {
    icon: IconApps,
    title: "Create Custom Package",
    description: "Create a custom Travel Package",
    to: "/custom-package",
  },
];

const NavigationBar = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const adminLinks = adminData.map((item) => (
    <UnstyledButton
      className={classes.subLink}
      key={item.title}
      onClick={() => navigate(item.to)}
    >
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  const userLinks = userData.map((item) => (
    <UnstyledButton
      className={classes.subLink}
      key={item.title}
      onClick={() => navigate(item.to)}
    >
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box>
      <Header height={80} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Link to={"/"}>
            <Image src={"./imgs/logo.png"} width={"130px"} />
          </Link>

          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <a href="/" className={classes.link}>
              Home
            </a>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Packages
                    </Box>
                    <IconChevronDown
                      size={16}
                      color={theme.fn.primaryColor()}
                    />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                <Group position="apart" px="md">
                  <Text fw={500}>Packages</Text>
                </Group>

                <Divider
                  my="sm"
                  mx="-md"
                  color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
                />

                <SimpleGrid cols={2} spacing={0}>
                  {user !== null && user.userType === "Agent"
                    ? adminLinks
                    : userLinks}
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>
            {user !== null && user.userType === "Agent" ? (
              <>
                <a href="/all-bookings" className={classes.link}>
                  Client Bookings
                </a>
                <a href="/revenue-reports" className={classes.link}>
                  Revenue Reports
                </a>
              </>
            ) : (
              <></>
            )}
            {user !== null && user.userType === "User" ? (
              <a href="/my-bookings" className={classes.link}>
                My Bookings
              </a>
            ) : (
              <></>
            )}
          </Group>

          {user ? (
            <Group className={classes.hiddenMobile}>
              {user !== null && user.userType !== "Agent" ? (
                <CartIcon pr={10} />
              ) : (
                <></>
              )}
              <Button variant="filled" color="red" onClick={signOutUser}>
                Sign Out
              </Button>
            </Group>
          ) : (
            <Button
              className={classes.hiddenMobile}
              onClick={() => navigate("/auth")}
            >
              Login / Register
            </Button>
          )}

          <Group className={classes.hiddenDesktop}>
            {user !== null && user.userType !== "Agent" ? (
              <CartIcon pr={10} />
            ) : (
              <></>
            )}
            <Burger opened={drawerOpened} onClick={toggleDrawer} />
          </Group>
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>
            {user !== null && user.userType === "Agent"
              ? adminLinks
              : userLinks}
          </Collapse>
          {user !== null && user.userType === "Agent" ? (
            <>
              <a href="/all-bookings" className={classes.link}>
                Client Bookings
              </a>
              <a href="/revenue-reports" className={classes.link}>
                Revenue Reports
              </a>
            </>
          ) : (
            <a href="/my-bookings" className={classes.link}>
              My Bookings
            </a>
          )}

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          {user ? (
            <Group>
              <Button
                variant="filled"
                color="red"
                onClick={() => {
                  signOutUser();
                  navigate("/");
                }}
              >
                Sign Out
              </Button>
            </Group>
          ) : (
            <Button onClick={() => navigate("/auth")}>Login / Register</Button>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default NavigationBar;
