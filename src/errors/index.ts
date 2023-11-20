import { ErrorReturn } from "../interface/error-interface";


export function notFoundError(): ErrorReturn {
    return {
      name: "NotFoundError",
      message: "No result for this search!",
    };
  }