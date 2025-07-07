import { batch } from "./schema/career/batch.ts";
import { classRoom } from "./schema/career/classRoom.ts";
import { classRoomActivity } from "./schema/career/classRoomActivity.ts";
import { classRoomAttendance } from "./schema/career/classRoomAttendance.ts";
import { config } from "./schema/career/config.ts";
import { course } from "./schema/career/course.ts";
import { discountVoucher } from "./schema/career/discountVoucher.ts";
import { invoice } from "./schema/career/invoice.ts";
import { invoiceInstallment } from "./schema/career/invoiceInstallment.ts";
import { program } from "./schema/career/program.ts";
import { programOnCourse } from "./schema/career/programOnCourse.ts";
import { student } from "./schema/career/student.ts";
import { studentDocument } from "./schema/career/studentDocument.ts";
import { studentOnClass } from "./schema/career/studentOnClass.ts";
import { wave } from "./schema/career/wave.ts";
import { employee } from "./schema/employee.ts";
import { oneTimePassword } from "./schema/oneTimePassword.ts";
import { refreshToken } from "./schema/refreshToken.ts";
import { room } from "./schema/room.ts";
import { user } from "./schema/user.ts";

const schema = {
  // Default
  employee,
  oneTimePassword,
  refreshToken,
  room,
  user,

  // Career
  batch,
  classRoom,
  classRoomActivity,
  classRoomAttendance,
  config,
  course,
  discountVoucher,
  invoice,
  invoiceInstallment,
  program,
  programOnCourse,
  student,
  studentDocument,
  studentOnClass,
  wave,
};

export default schema;
