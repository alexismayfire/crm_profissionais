import { apiTypes } from "../utils";

export const USER_TYPES = {
  LOGIN: {
    ...apiTypes("USER_LOGIN"),
    clean: "USER_LOGIN_CLEAN"
  },
  LOGOUT: apiTypes("USER_LOGOUT"),
  DETAIL: apiTypes("USER_DETAIL")
};