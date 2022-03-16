class loadingAction {
  setLoadingObject(loadingObj) {
    return {
      type: "SET-LOADING-OBJECT",
      data: {
        loadingObj: loadingObj,
      },
    };
  }
  setGlobalLoading(bool) {
    return {
      type: "SET-GLOBAL-LOADING",
      data: {
        bool: bool,
      },
    };
  }

  setLoading(name, bool) {
    return {
      type: "SET-SINGLE-LOADING",
      data: {
        name: name,
        bool: bool,
      },
    };
  }
}

export default new loadingAction();
