// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.getEntitlements": {
      type: "done.invoke.getEntitlements"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.getEntitlements": {
      type: "error.platform.getEntitlements"
      data: unknown
    }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    getEntitlements: "done.invoke.getEntitlements"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignEntitlements: "done.invoke.getEntitlements"
    assignGetEntitlementsError: "error.platform.getEntitlements"
    clearGetEntitlementsError: "xstate.init"
  }
  eventsCausingServices: {
    getEntitlements: "xstate.init"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates: "gettingEntitlements" | "success" | "error"
  tags: never
}
