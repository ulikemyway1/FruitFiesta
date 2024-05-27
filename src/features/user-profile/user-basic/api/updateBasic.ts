import user from "../../../../entities/user";
import requestAPI from "../../../../shared/api/APIRootBuilder";

export default function updateBasic(
  targetPlate: HTMLElement,
  firstName: string,
  lastName: string,
  email: string,
  dateOfBirth: string,
) {
  targetPlate.classList.add("plate__pending");
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
    .then(() =>
      setTimeout(() => targetPlate.classList.remove("plate__pending"), 1000),
    )
    .catch((error) => error);
}

export type UpdateBasicType = typeof updateBasic;
