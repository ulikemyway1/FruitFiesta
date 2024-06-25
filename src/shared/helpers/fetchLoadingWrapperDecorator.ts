import modalLoadingScreen from "../../widgets/modalLoadingScreen/modalLoadingScreen";

const fetchLoadingWrapperDecorator = async <T>(
  fetchFunc: Promise<T>,
): Promise<T> => {
  modalLoadingScreen.show();
  try {
    const response = await fetchFunc;
    return response;
  } finally {
    modalLoadingScreen.close();
  }
};

export default fetchLoadingWrapperDecorator;
