export class CustomError extends Error {
  status: number;
  errors: unknown;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}