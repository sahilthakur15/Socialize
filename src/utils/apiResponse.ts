// utils/APIResponse.ts

import { Response } from 'express';

export class APIResponse {
  static success(
    res: Response,
    data: { status: number; message: string; data?: any } = {
      status: 200,
      message: "OK",
      data: {},
    }
  ) {
    return res.status(data.status).json(data);
  }

  static error(
    res: Response,
    data: { status: number; message: string; data?: any }
  ) {
    return res.status(data.status).json(data);
  }
}
