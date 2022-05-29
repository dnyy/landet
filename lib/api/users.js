import BaseApi from "./BaseApi";

class UsersApi extends BaseApi {
  constructor(accessToken) {
    super(accessToken, "/users");
  }
}

export default UsersApi;
