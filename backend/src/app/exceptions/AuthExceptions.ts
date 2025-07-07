export function AuthorizedUserException() {
  return {
    status: 403,
    message: "utils.exceptions.must-unauthorized-user",
  };
}

export function ForbiddenException() {
  return {
    status: 403,
    message: "utils.exceptions.forbidden",
  };
}

export function InvalidCredentialsException() {
  return {
    status: 403,
    message: "utils.exceptions.invalid-credentials",
  };
}

export function UnAuthorizedUserException() {
  return {
    status: 401,
    message: "utils.exceptions.must-authorized-user",
  };
}
