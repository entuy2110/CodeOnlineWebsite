// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.getUpdateCheck": {
      type: "done.invoke.getUpdateCheck"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.getUpdateCheck": {
      type: "error.platform.getUpdateCheck"
      data: unknown
    }
    "": { type: "" }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    getUpdateCheck: "done.invoke.getUpdateCheck"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignUpdateCheck: "done.invoke.getUpdateCheck"
    assignError: "error.platform.getUpdateCheck"
    setDismissedVersion: "DISMISS"
  }
  eventsCausingServices: {
    getUpdateCheck: ""
  }
  eventsCausingGuards: {
    canViewUpdateCheck: ""
    shouldShowUpdateCheck: "done.invoke.getUpdateCheck"
  }
  eventsCausingDelays: {}
  matchesStates:
    | "checkingPermissions"
    | "fetchingUpdateCheck"
    | "show"
    | "dismissed"
  tags: never
}
