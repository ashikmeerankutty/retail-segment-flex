import {
  Box,
  Button,
  Card,
  Checkbox,
  Column,
  Flex,
  Grid,
  Heading,
  Input,
  Label,
  Text,
} from "@twilio-paste/core";
import React from "react";

export interface OTPFormProps {
  handleSignIn: () => void;
}

const OTPForm = ({handleSignIn}:OTPFormProps) => {


  return (
    <Box className="otp-form" marginTop={"space100"}>
        <Grid>
          <Column span={3}>
            <Flex grow />
          </Column>
          <Column span={6}>
            <Card>
              <Flex hAlignContent={"center"} vertical>
                <Box
                  marginBottom={"space110"}
                  marginTop={"space70"}
                  fontStyle={"italic"}
                  fontWeight={"fontWeightSemibold"}
                >
                  <Text as={"p"} fontSize={"fontSize60"}>
                    Owl Shoes
                  </Text>
                </Box>
                <Box marginBottom={"space60"}>
                  <Heading as={"label"} variant={"heading10"}>
                    Two-Step Verification
                  </Heading>
                </Box>
              </Flex>
              <Grid>
                <Column span={2} />
                <Column span={8}>
                  <Box marginBottom={"space100"}>
                    <Text as={"p"} color={"colorTextWeak"}>
                      For added security, please enter the One Time Password
                      (OTP) that has been sent to a phone number ending in 890
                    </Text>
                  </Box>
                  <Box className="input-otp" marginBottom={"space50"}>
                    <Label htmlFor="message">
                      <Text as={"p"} color={"colorTextWeak"}>
                        Enter OTP:
                      </Text>
                    </Label>
                    <Input
                      onChange={() => {
                        console.log("Hello");
                      }}
                      id="message"
                      name="message"
                      required
                      type={"number"}
                    />
                  </Box>
                  <Box className="checkbox-otp" marginBottom={"space90"}>
                    <Flex>
                      <Checkbox
                        checked={false}
                        id="blm"
                        value="blm"
                        name="blm"
                        onChange={(event) => {
                          console.log("checked");
                        }}
                      >
                        <Text as={"span"} color={"colorTextWeak"}>
                          Don&apos;t require OTP on this browser
                        </Text>
                      </Checkbox>
                    </Flex>
                  </Box>
                  <Box className="sign-in-button-otp" marginBottom={"space100"}>
                    <Button
                      variant={"primary"}
                      fullWidth={true}
                      onClick={handleSignIn}
                    >
                      Sign-In
                    </Button>
                  </Box>
                  <Box className="did-not-receive-otp" marginBottom={"space50"}>
                    <Flex hAlignContent={"center"}>
                      <Button variant={"link"}>
                        Didn&apos;t receive the OTP?
                      </Button>
                    </Flex>
                  </Box>
                </Column>
                <Column span={2} />
              </Grid>
            </Card>
          </Column>
          <Column span={3}>
            <Flex grow />
          </Column>
        </Grid>
      </Box>
  );
};

export default OTPForm;
