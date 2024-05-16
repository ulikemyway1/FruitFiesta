import requestAPI from "./APIRootBuilder";

export default async function loginCustomer(email: string, password: string) {
  const apiRoot = requestAPI.withPasswordFlow(password, email);
  return apiRoot
    .me()
    .login()
    .post({
      body: {
        password,
        email,
      },
    })
    .execute();
}
