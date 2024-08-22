// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.searchUserMachine.searching:invocation[0]": {
      type: "done.invoke.searchUserMachine.searching:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    searchUsers: "done.invoke.searchUserMachine.searching:invocation[0]"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    clearResults: "CLEAR_RESULTS"
    assignSearchResults: "done.invoke.searchUserMachine.searching:invocation[0]"
  }
  eventsCausingServices: {
    searchUsers: "SEARCH"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates: "idle" | "searching"
  tags: never
}
