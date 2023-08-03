import React, { useState } from "react";

import { HiOutlineLockClosed } from "react-icons/hi2";
import loginLogo from "../../asset/img/loginLogo.png";
import ResetSuccessModal from "../Login/loginsuccessmodal";
import {
  ButtonP,
  ContainerLG,
  ErrorMsg,
  ErrorMsgOutside,
  EyeIcon,
  Form,
  GoodMsg,
  IconFlex,
  IconFlexn,
  IconGrid,
  IconGridL,
  InputGridDivL,
  InputGridL,
  LGCard,
  LGLogo,
  LGLogoDiv,
  LabelHeaderI,
  LabelHeaderO,
  LabelInput,
  LockIcon,
  MailIcon,
  SlashEyeIcon,
} from "../Styled/Styled";

import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [apiSuccess, setApiSuccess] = useState(false);
  const [apiSuccessMessage, setApiSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const token = params.get("attribute-token");

    await axios
      .put(
        "http://localhost:9000/api/v1/password/reset-password?token=" + token,
        { newPassword, confirmPassword }
      )
      .then((response) => {
        setApiSuccessMessage(response.data);
        setApiSuccess(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  // new lines -------------
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(
    password === confirmPassword
  );

  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);

  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const togglePasswordVisibilityPass = () => {
    setShowPass(!showPass);
  };
  const togglePasswordVisibilityConPass = () => {
    setShowConPass(!showConPass);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordMatch(event.target.value === password);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;

    const hasMinimumLength = newPassword.length >= 8;
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    const isValidPassword =
      hasMinimumLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialCharacter;

    setPassword(newPassword);
    setIsPasswordValid(isValidPassword);
  };

  return (
    <ContainerLG>
      <LGLogoDiv to={"/"}>
        <LGLogo
          src="https://res.cloudinary.com/dafxzu462/image/upload/v1687697811/Frame_8402Logo_-_MoneyWay_an1xnp.svg"
          alt="user profile avatar"
        />
        MoneyWay
      </LGLogoDiv>

      <LabelHeaderO>Reset Password</LabelHeaderO>

      <LGCard>
        <LabelHeaderI>Reset Password</LabelHeaderI>
        <Form>
          <LabelInput>New Password</LabelInput>

          <InputGridDivL>
            <InputGridL
              type={showPass ? "text" : "password"}
              value={password}
              placeholder="Enter new password"
              onChange={handlePasswordChange}
            />

            <IconGridL>
              <IconFlexn>
                <LockIcon />
              </IconFlexn>
            </IconGridL>

            <IconGrid
              className={`show-password-icon ${showPass ? "visible" : ""}`}
              onClick={togglePasswordVisibilityPass}
            >
              <IconFlex>{showPass ? <SlashEyeIcon /> : <EyeIcon />}</IconFlex>
            </IconGrid>
          </InputGridDivL>
          {isPasswordValid && password.length > 0 ? (
            <GoodMsg>Strong.</GoodMsg>
          ) : (
            <ErrorMsgOutside>
              Password must have at least 8 characters including one uppercase,
              lowercase, number, and special character.
            </ErrorMsgOutside>
          )}

          <LabelInput>Confirm Password</LabelInput>

          <InputGridDivL>
            <InputGridL
              type={showConPass ? "text" : "password"}
              value={confirmPassword}
              placeholder="Confirm password"
              onChange={handleConfirmPassword}
            />

            <IconGridL>
              <IconFlexn>
                <LockIcon />
              </IconFlexn>
            </IconGridL>

            <IconGrid
              className={`show-con-pass-icon ${showConPass ? "visible" : ""}`}
              onClick={togglePasswordVisibilityConPass}
            >
              <IconFlex>
                {showConPass ? <SlashEyeIcon /> : <EyeIcon />}
              </IconFlex>
            </IconGrid>

            {passwordMatch ? null : (
              <ErrorMsg>PASSWORD does not match</ErrorMsg>
            )}
            
          </InputGridDivL>

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {apiSuccess && (
            <Stack sx={{ width: "100%" }} spacing={2}>
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
                  <AlertTitle>Success</AlertTitle>
                  {apiSuccessMessage}
                </Alert>
              </Collapse>
            </Stack>
          )}
          <ButtonP onClick={handleResetPassword}>Reset Password</ButtonP>
        </Form>
      </LGCard>
    </ContainerLG>
  );
}

export default ResetPassword;
