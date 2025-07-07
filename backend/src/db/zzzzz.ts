import { employee } from "./schema/employee.ts";
import { oneTimePassword } from "./schema/oneTimePassword.ts";
import { refreshToken } from "./schema/refreshToken.ts";
import { room } from "./schema/room.ts";
import { user } from "./schema/user.ts";

const schema = {
  employee,
  oneTimePassword,
  refreshToken,
  room,
  user,
};

export default schema;
