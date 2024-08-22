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
    "xstate.init": { type: "xstate.init" }
    "done.invoke.createProject": {
      type: "done.invoke.createProject"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.createProject": {
      type: "error.platform.createProject"
      data: unknown
    }
  }
  invokeSrcNameMap: {
    gettingLanguageProgram: "done.invoke.starterTemplate.loading:invocation[0]"
    createProject: "done.invoke.createProject"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignLanguageProgram: "done.invoke.starterTemplate.loading:invocation[0]"
    assignError: "error.platform.starterTemplate.loading:invocation[0]"
    assignCreateProjectRequest: "CREATE_PROJECT"
  }
  eventsCausingServices: {
    gettingLanguageProgram: "xstate.init"
    createProject: "CREATE_PROJECT"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates:
    | "loading"
    | "fillingParams"
    | "creatingProject"
    | "idle"
    | "idle.ok"
    | "idle.error"
    | { idle?: "ok" | "error" }
  tags: never
}
