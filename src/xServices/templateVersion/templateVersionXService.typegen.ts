// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.templateVersion.initialInfo.versions.loadingVersions:invocation[0]": {
      type: "done.invoke.templateVersion.initialInfo.versions.loadingVersions:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.templateVersion.initialInfo.template.loadingTemplate:invocation[0]": {
      type: "done.invoke.templateVersion.initialInfo.template.loadingTemplate:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.templateVersion.loadingFiles:invocation[0]": {
      type: "done.invoke.templateVersion.loadingFiles:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.templateVersion.loadingFiles:invocation[0]": {
      type: "error.platform.templateVersion.loadingFiles:invocation[0]"
      data: unknown
    }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    loadVersions: "done.invoke.templateVersion.initialInfo.versions.loadingVersions:invocation[0]"
    loadTemplate: "done.invoke.templateVersion.initialInfo.template.loadingTemplate:invocation[0]"
    loadFiles: "done.invoke.templateVersion.loadingFiles:invocation[0]"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignVersions: "done.invoke.templateVersion.initialInfo.versions.loadingVersions:invocation[0]"
    assignTemplate: "done.invoke.templateVersion.initialInfo.template.loadingTemplate:invocation[0]"
    assignFiles: "done.invoke.templateVersion.loadingFiles:invocation[0]"
    assignError: "error.platform.templateVersion.loadingFiles:invocation[0]"
  }
  eventsCausingServices: {
    loadVersions: "xstate.init"
    loadTemplate: "xstate.init"
    loadFiles: "done.state.templateVersion.initialInfo"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates:
    | "initialInfo"
    | "initialInfo.versions"
    | "initialInfo.versions.loadingVersions"
    | "initialInfo.versions.success"
    | "initialInfo.template"
    | "initialInfo.template.loadingTemplate"
    | "initialInfo.template.success"
    | "loadingFiles"
    | "done"
    | "done.ok"
    | "done.error"
    | {
        initialInfo?:
          | "versions"
          | "template"
          | {
              versions?: "loadingVersions" | "success"
              template?: "loadingTemplate" | "success"
            }
        done?: "ok" | "error"
      }
  tags: never
}
