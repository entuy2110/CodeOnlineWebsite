// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.load": {
      type: "done.invoke.load"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.load": { type: "error.platform.load"; data: unknown }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    load: "done.invoke.load"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignData: "done.invoke.load"
    assignError: "error.platform.load"
  }
  eventsCausingServices: {
    load: "xstate.init"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates: "loading" | "idle"
  tags: never
}
