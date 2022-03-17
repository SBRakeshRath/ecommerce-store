const initialState = {
  isLoggedIn: false,
  fLogin: false,
  loading: true,
  name: "Guest",
  gender: false,
};

class userData {
  constructor(state, action) {
    this.state = state;
    this.action = action;
  }

  setLoading(bool) {
    this.state.loading = bool;
  }
  setData(isLoggedIn, fLogin, loading, name, gender) {
    this.state.isLoggedIn = isLoggedIn;
    this.state.fLogin = fLogin;
    this.state.loading = loading;
    this.state.name = name;
    this.state.gender = gender;
  }

  reducerResponse(state) {
    // response

    switch (this.action.type) {
      case "SET_LOADING":
        this.setLoading(this.action.data.loading);
        break;

      case "SET_USER_DATA":
        const data = this.action.data;
        this.setData(
          data.isLoggedIn,
          data.auth,
          data.loading,
          data.name,
          data.gender
        );
        break;

      default:
        break;
    }
    return { ...this.state };
  }
}
const reducerFunction = (state = initialState, action) => {
  return new userData(state, action).reducerResponse();
};
const userDataReducer = reducerFunction;
export default userDataReducer;
