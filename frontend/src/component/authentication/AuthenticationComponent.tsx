import { RootState } from "../../store";
import { useSelector } from "react-redux";
import {
  CheckCont,
  InputContainer,
  AutherInput,
  AutherTitle,
  PageTitle,
  PageDescription,
  GoogleButton,
  Continue,
  FooterContainer,
  AutherParagraph,
  Link,
  CheckBox,
  CheckBoxContainer,
  Flex,
  LoginLink,
} from "../StyleComponents";

export function AuthInput({ icon, placeholder, inputType, value, validationMsg, onChange }: {
  icon: string; placeholder: string; inputType?: string; value?: string; validationMsg?: string, onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <>
      <InputContainer style={{position: "relative"}}>
        <img src={icon} alt="icon" />
        <AutherInput
          $theme={theme}
          placeholder={placeholder}
          type={inputType ? inputType : "text"}
          value={value}
          onChange={onChange}
          style={{position: "relative"}}
        />
        {validationMsg?.length > 0 && <span style={{ color: "red", lineHeight: "21px", position: "absolute", bottom: "-21px" }}>{validationMsg}</span>}
      </InputContainer>
    </>
  );
}

export function AuthTitle({ title, description, }: { title: string; description?: string; }) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <AutherTitle>
      <PageTitle $theme={theme}>{title}</PageTitle>
      {description && (
        <PageDescription $theme={theme}>{description}</PageDescription>
      )}
    </AutherTitle>
  );
}

export function AuthFooter({ title, linkName, to, theme, }: { title: string; linkName: string; to: string; theme?: string | null; }) {
  return (
    <FooterContainer $theme={theme}>
      <AutherParagraph className="mb-0">{title}</AutherParagraph>
      <Link href={to}>{linkName}</Link>
    </FooterContainer>
  );
}

export function ContinueButton({ onclick, text, }: { onclick?: any; text?: string; }) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <Continue onClick={onclick ? onclick : () => { }} $theme={theme}>
      {text ? text : "Continue"}
    </Continue>
  );
}

export function GoogleSignInButton() {
  return (
    <GoogleButton>
      <img src="google.svg" alt="Google sign in button" />
      Or sign in with Google
    </GoogleButton>
  );
}

export function CheckContainer() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return <CheckCont $theme={theme} />;
}

export function SignUpCheck({ checked, onChange, }: { checked: boolean; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; }) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <CheckBoxContainer $theme={theme}>
      <CheckBox type="checkbox" checked={checked} onChange={onChange} />
      <p className="mb-0">
        By checking this box I confirm that all the contacts I am importing have
        given me express written consent to contact them with artificial and
        pre-recorded voice calls. I also agree to comply with all relevant TCPA,
        TSR, and regulatory laws/guidelines concerning my communication with
        these contacts.
      </p>
    </CheckBoxContainer>
  );
}


export function LoginCheck() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <Flex $theme={theme} className="justify-content-between">
      <div className="d-flex gap-2">
        <CheckBox type="checkbox" name="" className="" id="remember" />
        <label htmlFor="remember">Remember me</label>
      </div>
      <LoginLink href="/reset_password">Forgot password ?</LoginLink>
    </Flex>
  );
}
