// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.getUsers": {
      type: "done.invoke.getUsers"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.getUsers": {
      type: "error.platform.getUsers"
      data: unknown
    }
    "done.invoke.suspendUser": {
      type: "done.invoke.suspendUser"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.suspendUser": {
      type: "error.platform.suspendUser"
      data: unknown
    }
    "done.invoke.deleteUser": {
      type: "done.invoke.deleteUser"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.deleteUser": {
      type: "error.platform.deleteUser"
      data: unknown
    }
    "done.invoke.activateUser": {
      type: "done.invoke.activateUser"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.activateUser": {
      type: "error.platform.activateUser"
      data: unknown
    }
    "done.invoke.resetUserPassword": {
      type: "done.invoke.resetUserPassword"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.resetUserPassword": {
      type: "error.platform.resetUserPassword"
      data: unknown
    }
    "done.invoke.updateUserRoles": {
      type: "done.invoke.updateUserRoles"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.updateUserRoles": {
      type: "error.platform.updateUserRoles"
      data: unknown
    }
    "xstate.init": { type: "xstate.init" }
    "": { type: "" }
  }
  invokeSrcNameMap: {
    getUsers: "done.invoke.getUsers"
    suspendUser: "done.invoke.suspendUser"
    deleteUser: "done.invoke.deleteUser"
    activateUser: "done.invoke.activateUser"
    resetUserPassword: "done.invoke.resetUserPassword"
    updateUserRoles: "done.invoke.updateUserRoles"
  }
  missingImplementations: {
    actions: "updateURL"
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignFilter: "UPDATE_FILTER"
    sendResetPage: "UPDATE_FILTER"
    updateURL: "UPDATE_PAGE"
    assignUsers: "done.invoke.getUsers"
    clearUsers: "error.platform.getUsers"
    assignGetUsersError: "error.platform.getUsers"
    displayGetUsersErrorMessage: "error.platform.getUsers"
    assignUserToSuspend: "SUSPEND_USER"
    assignUserToDelete: "DELETE_USER"
    assignUserToActivate: "ACTIVATE_USER"
    assignUserIdToResetPassword: "RESET_USER_PASSWORD"
    generateRandomPassword: "RESET_USER_PASSWORD"
    assignUserIdToUpdateRoles: "UPDATE_USER_ROLES"
    displaySuspendSuccess: "done.invoke.suspendUser"
    assignSuspendUserError: "error.platform.suspendUser"
    displaySuspendedErrorMessage: "error.platform.suspendUser"
    displayDeleteSuccess: "done.invoke.deleteUser"
    assignDeleteUserError: "error.platform.deleteUser"
    displayDeleteErrorMessage: "error.platform.deleteUser"
    displayActivateSuccess: "done.invoke.activateUser"
    assignActivateUserError: "error.platform.activateUser"
    displayActivatedErrorMessage: "error.platform.activateUser"
    displayResetPasswordSuccess: "done.invoke.resetUserPassword"
    assignResetUserPasswordError: "error.platform.resetUserPassword"
    displayResetPasswordErrorMessage: "error.platform.resetUserPassword"
    updateUserRolesInTheList: "done.invoke.updateUserRoles"
    assignUpdateRolesError: "error.platform.updateUserRoles"
    displayUpdateRolesErrorMessage: "error.platform.updateUserRoles"
    assignPaginationRef: "UPDATE_PAGE" | "xstate.init"
    clearGetUsersError:
      | "UPDATE_PAGE"
      | ""
      | "done.invoke.suspendUser"
      | "done.invoke.deleteUser"
      | "done.invoke.activateUser"
    clearSelectedUser:
      | "done.invoke.getUsers"
      | "error.platform.getUsers"
      | "CANCEL_USER_SUSPENSION"
      | "CANCEL_USER_DELETE"
      | "CANCEL_USER_ACTIVATION"
      | "error.platform.suspendUser"
      | "error.platform.deleteUser"
      | "error.platform.activateUser"
      | "CANCEL_USER_PASSWORD_RESET"
      | "done.invoke.resetUserPassword"
      | "error.platform.resetUserPassword"
      | "done.invoke.updateUserRoles"
      | "error.platform.updateUserRoles"
    clearSuspendUserError: "CONFIRM_USER_SUSPENSION"
    clearDeleteUserError: "CONFIRM_USER_DELETE"
    clearActivateUserError: "CONFIRM_USER_ACTIVATION"
    clearResetUserPasswordError: "CONFIRM_USER_PASSWORD_RESET"
    clearUpdateUserRolesError: "UPDATE_USER_ROLES"
  }
  eventsCausingServices: {
    getUsers:
      | "UPDATE_PAGE"
      | ""
      | "done.invoke.suspendUser"
      | "done.invoke.deleteUser"
      | "done.invoke.activateUser"
    suspendUser: "CONFIRM_USER_SUSPENSION"
    deleteUser: "CONFIRM_USER_DELETE"
    activateUser: "CONFIRM_USER_ACTIVATION"
    resetUserPassword: "CONFIRM_USER_PASSWORD_RESET"
    updateUserRoles: "UPDATE_USER_ROLES"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates:
    | "startingPagination"
    | "gettingUsers"
    | "idle"
    | "confirmUserSuspension"
    | "confirmUserDeletion"
    | "confirmUserActivation"
    | "suspendingUser"
    | "deletingUser"
    | "activatingUser"
    | "confirmUserPasswordReset"
    | "resettingUserPassword"
    | "updatingUserRoles"
  tags: "loading"
}
