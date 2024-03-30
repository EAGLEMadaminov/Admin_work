import propTypes from "prop-types";

const AuthLayout = ({ children }) => {
  return <div>{children}</div>;
};
export default AuthLayout;

AuthLayout.propTypes = {
  children: propTypes.node,
};
