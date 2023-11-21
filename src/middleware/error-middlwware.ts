import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ErrorReturn } from "../interface/error-interface";

export function handleApplicationErrors(
  err: Error & ErrorReturn,
  _req: Request,
  res: Response,
  next: NextFunction
) {

    if (err.name === "NotFoundError") {
        return res.status(httpStatus.NOT_FOUND).send({
          message: err.message,
        });
      }

      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: "InternalServerError",
        message: "Internal Server Error",
      });

  next(err)
}