import { apicall } from "./apicall";

export const login = (email: string, password: string) =>
  apicall({
    endpoint: "/login",
    body: {
      email,
      password,
    },
    method: "POST",
  });
