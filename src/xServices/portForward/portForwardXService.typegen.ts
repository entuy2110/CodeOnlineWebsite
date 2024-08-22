// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.portForwardMachine.loading:invocation[0]": {
      type: "done.invoke.portForwardMachine.loading:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    getListeningPorts: "done.invoke.portForwardMachine.loading:invocation[0]"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignListeningPorts: "done.invoke.portForwardMachine.loading:invocation[0]"
  }
  eventsCausingServices: {
    getListeningPorts: "xstate.init"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates: "loading" | "success"
  tags: never
}
