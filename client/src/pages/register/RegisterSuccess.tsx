import { useQuery } from "_hooks"
import { ContainerButton } from "_lib";
import { authService } from "_services";
import { message } from "antd";
import { StyledConfettiIcon, StyledSuccessContainer, StyledSuccessText, StyledSuccessTitle } from "./index.styled";

const RegisterSuccess = () => {
    const email = useQuery().get("email") as string;

    const handleConfirmEmailResend = async () => {
        try {
            await authService.resendEmailConfirm(email);
            message.success("Verification email resent - please check your email.")
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <StyledSuccessContainer>
        <StyledSuccessTitle><StyledConfettiIcon /> Successfully Registered! <StyledConfettiIcon /></StyledSuccessTitle>
        <StyledSuccessText>Please check your email (including junk email) for the Verification email.</StyledSuccessText>
        {email &&
        <>
         <StyledSuccessText>Didn't receive the email? Click the below button to resend.</StyledSuccessText>
         <ContainerButton title="Resend email" size="middle" onClick={handleConfirmEmailResend} />
        </>}
    </StyledSuccessContainer>
  )
}


export default RegisterSuccess