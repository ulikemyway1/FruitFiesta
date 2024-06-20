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
        version: user.userInfo?.version || 1,
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
    .then((response) => {
      user.userInfo = response.body;
      setTimeout(() => targetPlate.classList.remove("plate__pending"), 1000);
    });
}

export type UpdateBasicType = typeof updateBasic;
