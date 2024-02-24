import LoginError from "../../mycomponents/authentication/loginError";

interface Props {
  searchParams: {
    error: string;
  };
}
const LoginErrorPage = (props: Props) => {
  const error = props.searchParams.error;
  return <LoginError error={error} />;
};

export default LoginErrorPage;
