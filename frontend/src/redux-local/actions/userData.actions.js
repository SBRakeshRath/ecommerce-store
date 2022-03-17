class userDataAction {
  setLoading(bool) {
    return {
      type: "SET_LOADING",
      data: {
        loading: bool,
      },
    };
  }

  setData(isLoggedIn, fLogin, loading, name, gender) {

    return {
      type: "SET_USER_DATA",
      data: {
        isLoggedIn: isLoggedIn,
        auth: fLogin,
        loading: loading,
        name: name,
        gender: gender,
      },
    };
  }
}

export default new userDataAction();
