// lib/APIResponse.ts
export class APIResponse<T> {
  constructor(
    public message: string,
    public statusCode: number,
    public data: T
  ) {}
}