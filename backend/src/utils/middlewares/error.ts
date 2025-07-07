import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  status?: number;
  errors?: { path: string; msg: string }[];
}

// Middleware error handler untuk Express
const ErrorHandler = (
  err: CustomError,
  req: Request & { t: (key: string) => string },
  res: Response,
  next: NextFunction
): void => {
  const { status, message, errors } = err;
  let validationErrors: Record<string, string> | undefined;

  if (errors) {
    validationErrors = {};
    errors.forEach((error) => {
      validationErrors![error.path] = req.t(error.msg);
    });
  }

  // if (err.stack) {
  //   console.error(err.stack);
  // }

  const stack = process.env.NODE_ENV === 'production' ? undefined : err.stack;

  res.header('Content-Type', 'application/json');
  res.status(status || 500).json({
    message: req.t(message || 'internal_server_error'),
    validationErrors,
    stack,
  });
};

export default ErrorHandler;
