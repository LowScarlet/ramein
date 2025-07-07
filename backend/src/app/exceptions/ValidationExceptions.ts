export class ValidationException extends Error {
  status: number;
  errors: unknown;

  constructor(errors: unknown) {
    super('Validasi Gagal');
    this.status = 400;
    this.errors = errors;
  }
}