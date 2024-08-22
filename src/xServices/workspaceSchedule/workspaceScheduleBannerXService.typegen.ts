// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.increaseDeadline": {
      type: "done.invoke.increaseDeadline"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.decreaseDeadline": {
      type: "done.invoke.decreaseDeadline"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.increaseDeadline": {
      type: "error.platform.increaseDeadline"
      data: unknown
    }
    "error.platform.decreaseDeadline": {
      type: "error.platform.decreaseDeadline"
      data: unknown
    }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    increaseDeadline: "done.invoke.increaseDeadline"
    decreaseDeadline: "done.invoke.decreaseDeadline"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignWorkspace: "REFRESH_WORKSPACE"
    displaySuccessMessage:
      | "done.invoke.increaseDeadline"
      | "done.invoke.decreaseDeadline"
    displayFailureMessage:
      | "error.platform.increaseDeadline"
      | "error.platform.decreaseDeadline"
  }
  eventsCausingServices: {
    increaseDeadline: "INCREASE_DEADLINE"
    decreaseDeadline: "DECREASE_DEADLINE"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates: "idle" | "increasingDeadline" | "decreasingDeadline"
  tags: "loading"
}
