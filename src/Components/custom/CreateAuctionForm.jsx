import { Field, HStack, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

export const CreateAuctionForm = ({ data, setData,error, setError }) => {


  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === "startingBid") {
      const onlyDigits = /^[0-9]*$/;
      if (!onlyDigits.test(value)) return;
    }

    setData((prev) => ({ ...prev, [name]: value }));

    if (value.trim() !== "") {
      setError((prev) => ({ ...prev, [name]: false }));
    }
  };

  return (
    <VStack>
      <Field.Root invalid={error?.title}>
        <Field.Label>Enter Title</Field.Label>
        <Input
          placeholder="Enter Title"
          name="title"
          value={data.title}
          onChange={handleInputChange}
        />
        <Field.ErrorText>Title is Mandatory.</Field.ErrorText>
      </Field.Root>
      <HStack width="100%">
        <Field.Root invalid={error?.startTime}>
          <Field.Label>Start Date/Time</Field.Label>
          <Input
            placeholder="Start Date/Time"
            name="startTime"
            type="datetime-local"
            value={data.startTime}
            onChange={handleInputChange}
          />
          <Field.ErrorText>Start Date/Time field is Mandatory.</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={error?.endTime}>
          <Field.Label>End Date/Time</Field.Label>
          <Input
            placeholder="End Date/Time"
            name="endTime"
            type="datetime-local"
            value={data.endTime}
            onChange={handleInputChange}
          />
          <Field.ErrorText>End Date/Time field is Mandatory.</Field.ErrorText>
        </Field.Root>
      </HStack>
      <Field.Root invalid={error?.startingBid}>
        <Field.Label>Enter Starting Amount</Field.Label>
        <Input
          placeholder="Enter Starting Amount"
          name="startingBid"
          value={data.startingBid}
          onChange={handleInputChange}
        />
        <Field.ErrorText>Starting Amount field is Mandatory.</Field.ErrorText>
      </Field.Root>
    </VStack>
  );
};
