// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.getRoles": {
      type: "done.invoke.getRoles"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.getRoles": {
      type: "error.platform.getRoles"
      data: unknown
    }
    "": { type: "" }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    getRoles: "done.invoke.getRoles"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignRoles: "done.invoke.getRoles"
    assignGetRolesError: "error.platform.getRoles"
    displayGetRolesError: "error.platform.getRoles"
    clearGetRolesError: ""
  }
  eventsCausingServices: {
    getRoles: ""
  }
  eventsCausingGuards: {
    hasPermission: ""
  }
  eventsCausingDelays: {}
  matchesStates: "initializing" | "gettingRoles" | "done"
  tags: never
}
