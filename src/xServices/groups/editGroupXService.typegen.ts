// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.editGroup.loading:invocation[0]": {
      type: "done.invoke.editGroup.loading:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.editGroup.loading:invocation[0]": {
      type: "error.platform.editGroup.loading:invocation[0]"
      data: unknown
    }
    "done.invoke.editGroup.updating:invocation[0]": {
      type: "done.invoke.editGroup.updating:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.editGroup.updating:invocation[0]": {
      type: "error.platform.editGroup.updating:invocation[0]"
      data: unknown
    }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    loadGroup: "done.invoke.editGroup.loading:invocation[0]"
    updateGroup: "done.invoke.editGroup.updating:invocation[0]"
  }
  missingImplementations: {
    actions: "onUpdate"
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignGroup: "done.invoke.editGroup.loading:invocation[0]"
    displayLoadGroupError: "error.platform.editGroup.loading:invocation[0]"
    onUpdate: "done.invoke.editGroup.updating:invocation[0]"
    assignUpdateGroupFormErrors: "error.platform.editGroup.updating:invocation[0]"
    displayUpdateGroupError: "error.platform.editGroup.updating:invocation[0]"
  }
  eventsCausingServices: {
    loadGroup: "xstate.init"
    updateGroup: "UPDATE"
  }
  eventsCausingGuards: {
    hasFieldErrors: "error.platform.editGroup.updating:invocation[0]"
  }
  eventsCausingDelays: {}
  matchesStates: "loading" | "idle" | "updating"
  tags: never
}
