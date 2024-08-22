// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.templateACL.loading:invocation[0]": {
      type: "done.invoke.templateACL.loading:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.templateACL.addingUser:invocation[0]": {
      type: "done.invoke.templateACL.addingUser:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.templateACL.updatingUser:invocation[0]": {
      type: "done.invoke.templateACL.updatingUser:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.templateACL.removingUser:invocation[0]": {
      type: "done.invoke.templateACL.removingUser:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.templateACL.addingGroup:invocation[0]": {
      type: "done.invoke.templateACL.addingGroup:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.templateACL.updatingGroup:invocation[0]": {
      type: "done.invoke.templateACL.updatingGroup:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.templateACL.removingGroup:invocation[0]": {
      type: "done.invoke.templateACL.removingGroup:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    loadTemplateACL: "done.invoke.templateACL.loading:invocation[0]"
    addUser: "done.invoke.templateACL.addingUser:invocation[0]"
    updateUser: "done.invoke.templateACL.updatingUser:invocation[0]"
    removeUser: "done.invoke.templateACL.removingUser:invocation[0]"
    addGroup: "done.invoke.templateACL.addingGroup:invocation[0]"
    updateGroup: "done.invoke.templateACL.updatingGroup:invocation[0]"
    removeGroup: "done.invoke.templateACL.removingGroup:invocation[0]"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignTemplateACL: "done.invoke.templateACL.loading:invocation[0]"
    assignUserToBeAdded: "ADD_USER"
    assignUserToBeUpdated: "UPDATE_USER_ROLE"
    removeUserFromTemplateACL: "REMOVE_USER"
    assignGroupToBeAdded: "ADD_GROUP"
    assignGroupToBeUpdated: "UPDATE_GROUP_ROLE"
    removeGroupFromTemplateACL: "REMOVE_GROUP"
    addUserToTemplateACL: "done.invoke.templateACL.addingUser:invocation[0]"
    runAddUserCallback: "done.invoke.templateACL.addingUser:invocation[0]"
    updateUserOnTemplateACL: "done.invoke.templateACL.updatingUser:invocation[0]"
    clearUserToBeUpdated: "done.invoke.templateACL.updatingUser:invocation[0]"
    displayUpdateUserSuccessMessage: "done.invoke.templateACL.updatingUser:invocation[0]"
    displayRemoveUserSuccessMessage: "done.invoke.templateACL.removingUser:invocation[0]"
    addGroupToTemplateACL: "done.invoke.templateACL.addingGroup:invocation[0]"
    runAddGroupCallback: "done.invoke.templateACL.addingGroup:invocation[0]"
    updateGroupOnTemplateACL: "done.invoke.templateACL.updatingGroup:invocation[0]"
    clearGroupToBeUpdated: "done.invoke.templateACL.updatingGroup:invocation[0]"
    displayUpdateGroupSuccessMessage: "done.invoke.templateACL.updatingGroup:invocation[0]"
    displayRemoveGroupSuccessMessage: "done.invoke.templateACL.removingGroup:invocation[0]"
  }
  eventsCausingServices: {
    loadTemplateACL: "xstate.init"
    addUser: "ADD_USER"
    updateUser: "UPDATE_USER_ROLE"
    removeUser: "REMOVE_USER"
    addGroup: "ADD_GROUP"
    updateGroup: "UPDATE_GROUP_ROLE"
    removeGroup: "REMOVE_GROUP"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates:
    | "loading"
    | "idle"
    | "addingUser"
    | "updatingUser"
    | "removingUser"
    | "addingGroup"
    | "updatingGroup"
    | "removingGroup"
  tags: never
}
