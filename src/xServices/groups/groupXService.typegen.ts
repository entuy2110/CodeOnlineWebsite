// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.group.loading.data.loading:invocation[0]": {
      type: "done.invoke.group.loading.data.loading:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.group.addingMember:invocation[0]": {
      type: "done.invoke.group.addingMember:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.group.removingMember:invocation[0]": {
      type: "done.invoke.group.removingMember:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.group.loading.data.loading:invocation[0]": {
      type: "error.platform.group.loading.data.loading:invocation[0]"
      data: unknown
    }
    "done.invoke.group.loading.permissions.loading:invocation[0]": {
      type: "done.invoke.group.loading.permissions.loading:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.group.loading.permissions.loading:invocation[0]": {
      type: "error.platform.group.loading.permissions.loading:invocation[0]"
      data: unknown
    }
    "error.platform.group.addingMember:invocation[0]": {
      type: "error.platform.group.addingMember:invocation[0]"
      data: unknown
    }
    "error.platform.group.removingMember:invocation[0]": {
      type: "error.platform.group.removingMember:invocation[0]"
      data: unknown
    }
    "done.invoke.group.deleting:invocation[0]": {
      type: "done.invoke.group.deleting:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.group.deleting:invocation[0]": {
      type: "error.platform.group.deleting:invocation[0]"
      data: unknown
    }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    loadGroup: "done.invoke.group.loading.data.loading:invocation[0]"
    loadPermissions: "done.invoke.group.loading.permissions.loading:invocation[0]"
    addMember: "done.invoke.group.addingMember:invocation[0]"
    removeMember: "done.invoke.group.removingMember:invocation[0]"
    deleteGroup: "done.invoke.group.deleting:invocation[0]"
  }
  missingImplementations: {
    actions: "redirectToGroups"
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignGroup:
      | "done.invoke.group.loading.data.loading:invocation[0]"
      | "done.invoke.group.addingMember:invocation[0]"
      | "done.invoke.group.removingMember:invocation[0]"
    displayLoadGroupError: "error.platform.group.loading.data.loading:invocation[0]"
    assignPermissions: "done.invoke.group.loading.permissions.loading:invocation[0]"
    displayLoadPermissionsError: "error.platform.group.loading.permissions.loading:invocation[0]"
    assignAddMemberCallback: "ADD_MEMBER"
    removeUserFromMembers: "REMOVE_MEMBER"
    callAddMemberCallback: "done.invoke.group.addingMember:invocation[0]"
    displayAddMemberError: "error.platform.group.addingMember:invocation[0]"
    displayRemoveMemberSuccess: "done.invoke.group.removingMember:invocation[0]"
    displayRemoveMemberError: "error.platform.group.removingMember:invocation[0]"
    redirectToGroups: "done.invoke.group.deleting:invocation[0]"
    displayDeleteGroupError: "error.platform.group.deleting:invocation[0]"
  }
  eventsCausingServices: {
    loadGroup: "xstate.init"
    loadPermissions: "xstate.init"
    addMember: "ADD_MEMBER"
    removeMember: "REMOVE_MEMBER"
    deleteGroup: "CONFIRM_DELETE"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates:
    | "loading"
    | "loading.data"
    | "loading.data.loading"
    | "loading.data.success"
    | "loading.permissions"
    | "loading.permissions.loading"
    | "loading.permissions.success"
    | "idle"
    | "addingMember"
    | "removingMember"
    | "confirmingDelete"
    | "deleting"
    | {
        loading?:
          | "data"
          | "permissions"
          | {
              data?: "loading" | "success"
              permissions?: "loading" | "success"
            }
      }
  tags: never
}
