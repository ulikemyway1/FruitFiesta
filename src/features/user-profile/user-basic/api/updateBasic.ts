import user from "../../../../entities/user";
import requestAPI from "../../../../shared/api/APIRootBuilder";

export default function updateBasic(
  firstName: string,
  lastName: string,
  email: string,
  dateOfBirth: string,
): Promise<Response> {
  return requestAPI
    .apiRoot()
    .me()
    .post({
      body: {
        version: user.userVersion,
        actions: [
          {
            action: "setFirstName",
            firstName,
          },
          {
            action: "setLastName",
            lastName,
          },
          {
            action: "changeEmail",
            email,
          },
          {
            action: "setDateOfBirth",
            dateOfBirth,
          },
        ],
      },
    })
    .execute()
    .then((response) => response)
    .catch((error) => error);
}

export type UpdateBasicType = typeof updateBasic;
