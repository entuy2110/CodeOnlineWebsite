// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.createGroupMachine.creatingGroup:invocation[0]": {
      type: "done.invoke.createGroupMachine.creatingGroup:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.createGroupMachine.creatingGroup:invocation[0]": {
      type: "error.platform.createGroupMachine.creatingGroup:invocation[0]"
      data: unknown
    }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    createGroup: "done.invoke.createGroupMachine.creatingGroup:invocation[0]"
  }
  missingImplementations: {
    actions: "onCreate"
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    onCreate: "done.invoke.createGroupMachine.creatingGroup:invocation[0]"
    assignCreateGroupFormErrors: "error.platform.createGroupMachine.creatingGroup:invocation[0]"
    displayCreateGroupError: "error.platform.createGroupMachine.creatingGroup:invocation[0]"
  }
  eventsCausingServices: {
    createGroup: "CREATE"
  }
  eventsCausingGuards: {
    hasFieldErrors: "error.platform.createGroupMachine.creatingGroup:invocation[0]"
  }
  eventsCausingDelays: {}
  matchesStates: "idle" | "creatingGroup"
  tags: never
}
