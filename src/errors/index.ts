import { ErrorReturn } from "../interface/error-interface";


export function notFoundError(): Error {
  const error: Error & ErrorReturn = new Error("No result for this search!");
  error.name = "NotFoundError";
  return error;
}