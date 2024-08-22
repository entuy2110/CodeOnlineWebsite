// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.getExperiments": {
      type: "done.invoke.getExperiments"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.getExperiments": {
      type: "error.platform.getExperiments"
      data: unknown
    }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    getExperiments: "done.invoke.getExperiments"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignExperiments: "done.invoke.getExperiments"
    clearGetExperimentsError: "done.invoke.getExperiments"
    assignGetExperimentsError: "error.platform.getExperiments"
    clearExperiments: "error.platform.getExperiments"
  }
  eventsCausingServices: {
    getExperiments: "xstate.init"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates: "gettingExperiments" | "success" | "failure"
  tags: never
}
