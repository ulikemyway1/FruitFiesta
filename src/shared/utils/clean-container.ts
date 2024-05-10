const cleanContainer = (container: HTMLElement) => {
  while (container.firstChild) {
    container.firstChild.remove();
  }
};

export default cleanContainer;
