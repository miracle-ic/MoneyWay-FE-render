import { useState } from "react";
import Select, { components } from "react-select";
import SearchableSelect from "./SearchableSelect";
import Switch from "@mui/material/Switch";
import {
  ButtonP,
  EyeIcon,
  Form,
  FormDiv,
  IconFlex,
  IconGrid,
  Input,
  InputDes,
  InputGrid,
  InputGridDiv,
  LabelInput,
  SBDiv,
  SlashEyeIcon,
} from "../Styled/Styled";
import Togglebtn from "../Togglebtn/Togglebtn";
// const { Option } = components;

const OtherBankTransfer = () => {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);

  const [selectedBankOption, setSelectedBankOption] = useState("");
  const bankOptions = [
    { value: "first-bank", label: "First Bank" },
    { value: "guaranty-trust-bank", label: "Guaranty Trust Bank" },
    { value: "polaris-bank", label: "Polaris Bank" },
  ];

  const [saveBeneficiary, setSaveBeneficiary] = useState(false);

  const handleBankOptionChange = (selectedBankOption) => {
    setSelectedBankOption(selectedBankOption);
  };
  const handleChange = (event) => {
    setSaveBeneficiary(event.target.checked);
  };

  const togglePinVisibility = () => {
    setShowPin(!showPin);
  };

  const handleInputChange = (event) => {
    setPin(event.target.value);
    event.target.value = event.target.value.replace(/\D/, '');
  };

  return (
    <Form>
      <FormDiv>
        {/*email*/}
        <LabelInput style={{ marginTop: "0px" }}>Bank</LabelInput>
        <SearchableSelect />


        {/*amount*/}
        <LabelInput htmlFor="amount-text-field">Amount</LabelInput>

        <Input
          id="amount-text-field"
          type="text"
          onChange={handleInputChange}
          placeholder="Enter an amount"
        />

        {/*pin*/}
        <LabelInput>Pin</LabelInput>

        <InputGridDiv>
        <InputGrid
          id="pin-text-field"
          type={showPin ? "text" : "password"}
          placeholder="Enter pin"
          onChange={handleInputChange}
          minLength="4"
          maxLength="4"
        />
        <IconGrid
            className={`show-pin-icon ${showPin ? "visible" : ""}`}
            onClick={togglePinVisibility}
          >
            <IconFlex>{showPin ? <SlashEyeIcon /> : <EyeIcon />}</IconFlex>
          </IconGrid>
        </InputGridDiv>

        {/*description*/}
        <LabelInput htmlFor="description-text-area">Description</LabelInput>

        <InputDes
          id="text-field"
          placeholder="Write a short description"
        ></InputDes>

        {/*save as beneficiary*/}
        <SBDiv>
            Save as Beneficiary
            <Togglebtn
            checked={saveBeneficiary}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            />
        </SBDiv>

        {/*continue button*/}
        <ButtonP>Continue</ButtonP>
      </FormDiv>
    </Form>
  );
};

export default OtherBankTransfer;
