// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.userSecuritySettings.updatingSecurity:invocation[0]": {
      type: "done.invoke.userSecuritySettings.updatingSecurity:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.userSecuritySettings.updatingSecurity:invocation[0]": {
      type: "error.platform.userSecuritySettings.updatingSecurity:invocation[0]"
      data: unknown
    }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    updateSecurity: "done.invoke.userSecuritySettings.updatingSecurity:invocation[0]"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    notifyUpdate: "done.invoke.userSecuritySettings.updatingSecurity:invocation[0]"
    assignError: "error.platform.userSecuritySettings.updatingSecurity:invocation[0]"
    clearError: "UPDATE_SECURITY"
  }
  eventsCausingServices: {
    updateSecurity: "UPDATE_SECURITY"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates: "idle" | "updatingSecurity"
  tags: never
}
