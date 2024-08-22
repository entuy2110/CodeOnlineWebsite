// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {}
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignNextPage: "NEXT_PAGE"
    sendUpdatePage: "NEXT_PAGE" | "PREVIOUS_PAGE" | "GO_TO_PAGE" | "RESET_PAGE"
    assignPreviousPage: "PREVIOUS_PAGE"
    assignPage: "GO_TO_PAGE"
    resetPage: "RESET_PAGE"
  }
  eventsCausingServices: {}
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates: "ready"
  tags: never
}
