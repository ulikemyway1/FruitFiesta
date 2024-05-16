import userProfileController from "./model/userProfileController";

export const userProfile = userProfileController.getView();

export const { updateUserProfile } = userProfileController;

export default updateUserProfile;
