// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.templateSettings.loading:invocation[0]": {
      type: "done.invoke.templateSettings.loading:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.templateSettings.loading:invocation[0]": {
      type: "error.platform.templateSettings.loading:invocation[0]"
      data: unknown
    }
    "done.invoke.deleteTemplate": {
      type: "done.invoke.deleteTemplate"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.deleteTemplate": {
      type: "error.platform.deleteTemplate"
      data: unknown
    }
    "error.platform.templateSettings.saving:invocation[0]": {
      type: "error.platform.templateSettings.saving:invocation[0]"
      data: unknown
    }
    "done.invoke.templateSettings.saving:invocation[0]": {
      type: "done.invoke.templateSettings.saving:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    getTemplateSettings: "done.invoke.templateSettings.loading:invocation[0]"
    deleteTemplate: "done.invoke.deleteTemplate"
    saveTemplateSettings: "done.invoke.templateSettings.saving:invocation[0]"
  }
  missingImplementations: {
    actions: "onSave"
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignTemplateSettings: "done.invoke.templateSettings.loading:invocation[0]"
    assignGetTemplateError: "error.platform.templateSettings.loading:invocation[0]"
    displayDeleteSuccess: "done.invoke.deleteTemplate"
    assignDeleteTemplateError: "error.platform.deleteTemplate"
    assignSaveTemplateSettingsError: "error.platform.templateSettings.saving:invocation[0]"
    clearDeleteTemplateError: "CONFIRM_DELETE"
    onSave: "done.invoke.templateSettings.saving:invocation[0]"
  }
  eventsCausingServices: {
    getTemplateSettings: "xstate.init"
    deleteTemplate: "CONFIRM_DELETE"
    saveTemplateSettings: "SAVE"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates:
    | "loading"
    | "editing"
    | "confirmingDelete"
    | "deleting"
    | "deleted"
    | "saving"
    | "saved"
    | "error"
  tags: "submitting"
}
