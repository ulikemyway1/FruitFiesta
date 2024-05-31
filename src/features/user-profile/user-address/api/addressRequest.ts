import user from "../../../../entities/user";
import requestAPI from "../../../../shared/api/APIRootBuilder";

export default function addressRequest(
  targetPlate: HTMLElement,
  addressId: string,
  country: string,
  city: string,
  postalCode: string,
  streetName: string,
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
            action: "changeAddress",
            addressId,
            address: {
              country,
              city,
              postalCode,
              streetName,
            },
          },
        ],
      },
    })
    .execute()
    .then((response) => {
      user.userInfo = response.body;
      setTimeout(() => targetPlate.classList.remove("plate__pending"), 1000);
    })
    .catch((error) => error);
}
