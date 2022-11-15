import { Stack, Text } from "@twilio-paste/core";
import { useMemo, useState } from "react";
import { IAvailbleSize } from "../../Global.types";
import SizeButton from "./SizeButton";

export interface ISizeGridProps {
  onSizeSelect: (size: string) => void;
  sizes: IAvailbleSize[];
}

const SizeGrid = ({ onSizeSelect, sizes }: ISizeGridProps) => {
  const [selectedSize, setSelectedSize] = useState<string>();
  const BUTTONS_PER_ROW = 5;
  const buttonRows = useMemo(() => {
    if (sizes.length > 0) {
      const sizesCopy = [...sizes];
      const output = [];
      while (sizesCopy.length > 0)
        output.push(sizesCopy.splice(0, BUTTONS_PER_ROW));

      return (
        <Stack orientation="vertical" spacing="space50">
          {output.map((splice, index) => (
            <Stack
              key={`button-group-${index}`}
              orientation="horizontal"
              spacing="space30"
            >
              {splice.map(({ size, available }: IAvailbleSize) => (
                <SizeButton
                  key={`sizebutton-${size}`}
                  onClick={(size) => {
                    onSizeSelect(size);
                    setSelectedSize(size);
                  }}
                  value={size}
                  selected={size === selectedSize}
                  disabled={!available}
                />
              ))}
            </Stack>
          ))}
        </Stack>
      );
    }
  }, [onSizeSelect, selectedSize, sizes]);

  return (
    <div style={{ flexDirection: "column", display: "inline-flex" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "10px",
        }}
      >
        <Text as="p" fontWeight="fontWeightBold">
          Select Size
        </Text>
        <Text as="p" color="colorTextWeak">
          Size Guide
        </Text>
      </div>
      {buttonRows}
    </div>
  );
};

export default SizeGrid;
