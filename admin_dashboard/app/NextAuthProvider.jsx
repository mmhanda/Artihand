import { SessionProvider } from "next-auth/react";
import PropTypes from "prop-types";
import React from "react";

export const NextAuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

NextAuthProvider.propTypes = {
  children: PropTypes.node,
};
