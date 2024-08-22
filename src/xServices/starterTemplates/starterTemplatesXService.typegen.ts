// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.starterTemplates.loading:invocation[0]": {
      type: "done.invoke.starterTemplates.loading:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.starterTemplates.loading:invocation[0]": {
      type: "error.platform.starterTemplates.loading:invocation[0]"
      data: unknown
    }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    loadStarterTemplates: "done.invoke.starterTemplates.loading:invocation[0]"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignStarterTemplates: "done.invoke.starterTemplates.loading:invocation[0]"
    assignError: "error.platform.starterTemplates.loading:invocation[0]"
  }
  eventsCausingServices: {
    loadStarterTemplates: "xstate.init"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates:
    | "loading"
    | "idle"
    | "idle.ok"
    | "idle.error"
    | { idle?: "ok" | "error" }
  tags: never
}
