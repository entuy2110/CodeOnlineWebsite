// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.searchUsersAndGroups.searching:invocation[0]": {
      type: "done.invoke.searchUsersAndGroups.searching:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    search: "done.invoke.searchUsersAndGroups.searching:invocation[0]"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    clearResults: "CLEAR_RESULTS"
    assignSearchResults: "done.invoke.searchUsersAndGroups.searching:invocation[0]"
  }
  eventsCausingServices: {
    search: "SEARCH"
  }
  eventsCausingGuards: {
    queryHasMinLength: "SEARCH"
  }
  eventsCausingDelays: {}
  matchesStates: "idle" | "searching"
  tags: never
}
