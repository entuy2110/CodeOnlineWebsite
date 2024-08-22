// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.starterTemplate.loading:invocation[0]": {
      type: "done.invoke.starterTemplate.loading:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.starterTemplate.loading:invocation[0]": {
      type: "error.platform.starterTemplate.loading:invocation[0]"
      data: unknown
    }
    "done.invoke.starterTemplate.onJoinningProject:invocation[0]": {
      type: "done.invoke.starterTemplate.onJoinningProject:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "xstate.init": { type: "xstate.init" }
    "done.invoke.starterTemplate.onDeletingProject:invocation[0]": {
      type: "done.invoke.starterTemplate.onDeletingProject:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
  }
  invokeSrcNameMap: {
    loadUser: "done.invoke.starterTemplate.loading:invocation[0]"
    joinProject: "done.invoke.starterTemplate.onJoinningProject:invocation[0]"
    deleteProject: "done.invoke.starterTemplate.onDeletingProject:invocation[0]"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignUser: "done.invoke.starterTemplate.loading:invocation[0]"
    assignError: "error.platform.starterTemplate.loading:invocation[0]"
    assignAccessCode: "JOINPROJECT"
    assignProjectId: "DELETEPROJECT"
    assignProjectName: "done.invoke.starterTemplate.onJoinningProject:invocation[0]"
  }
  eventsCausingServices: {
    loadUser:
      | "xstate.init"
      | "done.invoke.starterTemplate.onDeletingProject:invocation[0]"
    joinProject: "JOINPROJECT"
    deleteProject: "DELETEPROJECT"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates:
    | "loading"
    | "waiting"
    | "onJoinningProject"
    | "onDeletingProject"
    | "end"
    | "end.ok"
    | "end.error"
    | "end.joined"
    | { end?: "ok" | "error" | "joined" }
  tags: never
}
