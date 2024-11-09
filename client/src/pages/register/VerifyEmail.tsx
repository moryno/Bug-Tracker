import { authService } from "_services";
import { StyledEnvelopIcon, StyledSuccessContainer, StyledSuccessText, StyledSuccessTitle } from "./index.styled";
import { useQuery } from "_hooks";
import { message } from "antd";
import { ContainerButton } from "_lib";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "_constants";

const Status = {
  Verifying: "Verifying",
  Failed: "Failed",
  Success: "Success"
}
const VerifyEmail = () => {
  const [status, setStatus] = useState(Status.Verifying);
  const email = useQuery().get("email") as string;
  const token = useQuery().get("token") as string;
  const navigate = useNavigate()

  const handleConfirmEmailResend = async () => {
      try {
          await authService.resendEmailConfirm(email);
          message.success("Verification email resent - please check your email.")
      } catch (error) {
          console.log(error)
      }
  }
  const onLogin= () => {
    navigate(LOGIN_ROUTE)
  }

  useEffect(() => {
    const confirmEmail = async () => {
      if (!email || !token) {
        setStatus(Status.Failed);
        return;
      }
      
        try {
          await authService.verifyEmail(email, token);
          setStatus(Status.Success)
        } catch (error) {
          setStatus(Status.Failed)
        }
    };
    confirmEmail();
  }, [email, token,]);

  const getBody = () => {
    switch (status) {
      case Status.Verifying:
        return <StyledSuccessText>Verifying...</StyledSuccessText>
      case Status.Failed:
        return <>
         <StyledSuccessText>Verification failed. You can try resending the verifying link to your email.</StyledSuccessText>
         <ContainerButton title="Resend email" size="middle" onClick={handleConfirmEmailResend} />
        </>
      case Status.Success:
        return <>
         <StyledSuccessText>Email has been verified - you can now login.</StyledSuccessText>
         <ContainerButton title="Login" type="primary" size="middle" onClick={onLogin} />
        </>
    
      default:
        break;
    }
  }

  return (
    <StyledSuccessContainer>
        <StyledSuccessTitle><StyledEnvelopIcon /> Email Verification.</StyledSuccessTitle>
        {getBody()}
    </StyledSuccessContainer>
  )
}

export default VerifyEmail