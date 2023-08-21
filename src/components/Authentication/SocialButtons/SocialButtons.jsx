import { Button } from "@mantine/core";
import { GithubIcon } from "./Icons/GithubIcon";
import { GoogleIcon } from "./Icons/GoogleIcon";

export const GoogleButton = (props) => {
  return (
    <Button
      leftIcon={<GoogleIcon />}
      variant="default"
      color="gray"
      {...props}
    />
  );
};

export const GithubButton = (props) => {
  return (
    <Button
      leftIcon={<GithubIcon />}
      variant="default"
      color="gray"
      {...props}
    />
  );
};
