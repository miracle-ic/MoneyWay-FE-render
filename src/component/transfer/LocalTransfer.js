import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import { useStateContext } from "../Context/ContextProvider";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
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
import Togglebtn from '../Togglebtn/Togglebtn';

const LocalTransfer = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [description, setDescription] = useState("");
  const [saveBeneficiary, setSaveBeneficiary] = useState(false);

  const [loading, setLoading] = useState(false);

  const [apiError, setApiError] = useState(false);
  const [apiLTError, setLTApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [apiLTErrorMessage, setLTApiErrorMessage] = useState("");
  const [apiSuccess, setApiSuccess] = useState(false);
  const [apiLTSuccess, setLTApiSuccess] = useState(false);
  const [apiSuccessMessage, setApiSuccessMessage] = useState("");
  const [apiLTSuccessMessage, setLTApiSuccessMessage] = useState("");

  const [showPin, setShowPin] = useState(false);

  const context = useStateContext();
  const handleChange = (event) => {
    setSaveBeneficiary(event.target.checked);
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + context.token,
  };

  const handleInputChange = (event) => {
    setAmount(event.target.value);
    setPin(event.target.value);
    event.target.value = event.target.value.replace(/\D/, '');
  };

  const togglePinVisibility = () => {
    setShowPin(!showPin);
  };

  const handleVerifyAccountNumber = async (e) => {
    e.target.value = e.target.value.replace(/\D/, '');

    const accNum = e.target.value;
    setAccountNumber(accNum);
    if (accNum.length === 10) {
      await verifyAccountNumber(e, accNum);
    }
  };

  const verifyAccountNumber = async (e, accNum) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .get(
        "http://localhost:9000/api/v1/transaction/verify-recipient?account-number=" +
          accNum,
        { headers }
      )
      .then((response) => {
        setApiSuccess(true);
        setApiSuccessMessage(response.data);
      })
      .catch((error) => {
        setApiError(true);
        setApiErrorMessage(error.response.data.errorMessage);
      });
    setLoading(false);
  };

  const handleLocalTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .post(
        "http://localhost:9000/api/v1/transaction/local-transfer",
        { pin, accountNumber, description, amount, saveBeneficiary },
        { headers }
      )
      .then((response) => {
        setLTApiSuccess(true);
        setLTApiSuccessMessage(response.data);
      })
      .catch((error) => {
        console.log(error);
        setLTApiError(true);
        setLTApiErrorMessage(error.response.data.errorMessage);
      });
    setLoading(false);
  };

  return (
    <Form>
      <FormDiv>
        {/*email*/}
        <LabelInput style={{ marginTop: "0px" }}>Account Number</LabelInput>

        <Input
            id="email-text-field"
            onChange={handleVerifyAccountNumber}
            type="text"
            placeholder="Enter account number"
            minLength="10"
            maxLength="10"
        />

        {apiError && (
          <Stack className="mt-2" sx={{ width: "100%" }} spacing={2}>
            <Collapse in={apiError}>
              <Alert
                severity="error"
                action={
                  <IconButton onClick={() => setApiError(false)}>
                    {" "}
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {apiErrorMessage}
              </Alert>
            </Collapse>
          </Stack>
        )}
        {apiSuccess && (
          <Stack className="mt-2" sx={{ width: "100%" }} spacing={2}>
            <Collapse in={apiSuccess}>
              <Alert
                severity="success"
                variant="outlined"
                action={
                  <IconButton onClick={() => setApiSuccess(false)}>
                    {" "}
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                iconMapping={{
                  success: <CheckCircleOutlineIcon fontSize="inherit" />,
                }}
                sx={{ mb: 2 }}
              >
                {apiSuccessMessage}
              </Alert>
            </Collapse>
          </Stack>
        )}

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
          id="pin-text-field"
          onChange={(e) => setDescription(e.target.value)}
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

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {apiLTError && (
          <Stack className="mt-2" sx={{ width: "100%" }} spacing={2}>
            <Collapse in={apiLTError}>
              <Alert
                severity="error"
                action={
                  <IconButton onClick={() => setApiError(false)}>
                    {" "}
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {apiLTErrorMessage}
              </Alert>
            </Collapse>
          </Stack>
        )}
        {apiLTSuccess && (
          <Stack className="mt-2" sx={{ width: "100%" }} spacing={2}>
            <Collapse in={apiLTSuccess}>
              <Alert
                severity="success"
                variant="outlined"
                action={
                  <IconButton onClick={() => setApiSuccess(false)}>
                    {" "}
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                iconMapping={{
                  success: <CheckCircleOutlineIcon fontSize="inherit" />,
                }}
                sx={{ mb: 2 }}
              >
                {apiLTSuccessMessage}
              </Alert>
            </Collapse>
          </Stack>
        )}

        {/*continue button*/}
        <ButtonP onClick={handleLocalTransfer}>Continue</ButtonP>
      </FormDiv>
    </Form>
  );
};

export default LocalTransfer;
