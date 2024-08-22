// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.authMethods.gettingAuthMethods:invocation[0]": {
      type: "done.invoke.authMethods.gettingAuthMethods:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.authMethods.gettingAuthMethods:invocation[0]": {
      type: "error.platform.authMethods.gettingAuthMethods:invocation[0]"
      data: unknown
    }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    getAuthMethods: "done.invoke.authMethods.gettingAuthMethods:invocation[0]"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignAuthMethods: "done.invoke.authMethods.gettingAuthMethods:invocation[0]"
    setError: "error.platform.authMethods.gettingAuthMethods:invocation[0]"
  }
  eventsCausingServices: {
    getAuthMethods: "xstate.init"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates: "gettingAuthMethods" | "idle"
  tags: never
}
