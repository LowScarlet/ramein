export function RoleNotAllowedException() {
  return {
    status: 403,
    message: "utils.exceptions.role-not-allowed",
  };
}

export function AdminProfileErrorException() {
  return {
    status: 403,
    message: "utils.exceptions.admin-profile-error",
  };
}

export function NotActiveException() {
  return {
    status: 403,
    message: "utils.exceptions.not-active",
  };
}
