import { query } from "express-validator";

export const paginationValidators = [
  query("page")
    .toInt()
    .custom(async (page, { req, path }) => {
      if (!page) return;
      if (page < 1) return;

      req.scarlet.pagination[path] = page;
    })
    .isInt()
    .withMessage("validators.must-numeric")
    .optional(),
  query("limit")
    .toInt()
    .custom(async (limit, { req, path }) => {
      if (!limit) return;
      if (limit > 100) throw new Error("validators.pagination-show-safe-max");
      if (limit < 1) return;

      req.scarlet.pagination[path] = limit;
    })
    .isInt()
    .withMessage("validators.must-numeric")
    .optional(),
];
