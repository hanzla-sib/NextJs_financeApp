import React from "react";

const ErrorZod = ({ error }) => {
  return error && <p className="mt-1 text-red-500">{error.message}</p>;
};

export default ErrorZod;
