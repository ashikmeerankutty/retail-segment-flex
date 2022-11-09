import { Grid, Stack, Text } from "@twilio-paste/core";
import { useMemo } from "react";
import { IAvailbleSize } from "../../Global.types";
import SizeButton from "./SizeButton";

export interface ISizeGridProps {
  sizes: IAvailbleSize[];
}

const SizeGrid = ({ sizes }: ISizeGridProps) => {
  const buttonRows = useMemo(() => {
    if (sizes.length > 0) {
      const sizesCopy = [...sizes];
      const output = [];
      while (sizesCopy.length > 0) output.push(sizesCopy.splice(0, 5));

      return (<Stack orientation="vertical" spacing="space50">
        {output.map((splice, index) => (
          <Stack
            key={`button-group-${index}`}
            orientation="horizontal"
            spacing="space30"
          >
            {splice.map(({ size, available }: IAvailbleSize) => (
              <SizeButton
                key={`sizebutton-${size}`}
                value={size}
                disabled={!available}
              />
            ))}
          </Stack>
        ))}
      </Stack>)
    }
  }, [sizes]);

  return (
    <Stack orientation="vertical" spacing="space0">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Text as="p" fontWeight="fontWeightBold">
          Select Size
        </Text>
        <Text as="p" color="colorTextWeak">
          Size Guide
        </Text>
      </div>
      {buttonRows}
    </Stack>
  );
};

export default SizeGrid;
