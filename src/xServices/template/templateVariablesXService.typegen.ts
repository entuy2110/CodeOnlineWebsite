// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.templateVariablesState.gettingTemplate:invocation[0]": {
      type: "done.invoke.templateVariablesState.gettingTemplate:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.templateVariablesState.gettingTemplate:invocation[0]": {
      type: "error.platform.templateVariablesState.gettingTemplate:invocation[0]"
      data: unknown
    }
    "error.platform.templateVariablesState.gettingActiveTemplateVersion:invocation[0]": {
      type: "error.platform.templateVariablesState.gettingActiveTemplateVersion:invocation[0]"
      data: unknown
    }
    "error.platform.templateVariablesState.gettingTemplateVariables:invocation[0]": {
      type: "error.platform.templateVariablesState.gettingTemplateVariables:invocation[0]"
      data: unknown
    }
    "error.platform.templateVariablesState.creatingTemplateVersion:invocation[0]": {
      type: "error.platform.templateVariablesState.creatingTemplateVersion:invocation[0]"
      data: unknown
    }
    "done.invoke.templateVariablesState.gettingActiveTemplateVersion:invocation[0]": {
      type: "done.invoke.templateVariablesState.gettingActiveTemplateVersion:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.templateVariablesState.gettingTemplateVariables:invocation[0]": {
      type: "done.invoke.templateVariablesState.gettingTemplateVariables:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.templateVariablesState.creatingTemplateVersion:invocation[0]": {
      type: "done.invoke.templateVariablesState.creatingTemplateVersion:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.templateVariablesState.waitingForJobToBeCompleted:invocation[0]": {
      type: "done.invoke.templateVariablesState.waitingForJobToBeCompleted:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.templateVariablesState.waitingForJobToBeCompleted:invocation[0]": {
      type: "error.platform.templateVariablesState.waitingForJobToBeCompleted:invocation[0]"
      data: unknown
    }
    "error.platform.templateVariablesState.updatingTemplate:invocation[0]": {
      type: "error.platform.templateVariablesState.updatingTemplate:invocation[0]"
      data: unknown
    }
    "done.invoke.templateVariablesState.updatingTemplate:invocation[0]": {
      type: "done.invoke.templateVariablesState.updatingTemplate:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    getTemplate: "done.invoke.templateVariablesState.gettingTemplate:invocation[0]"
    getActiveTemplateVersion: "done.invoke.templateVariablesState.gettingActiveTemplateVersion:invocation[0]"
    getTemplateVariables: "done.invoke.templateVariablesState.gettingTemplateVariables:invocation[0]"
    createNewTemplateVersion: "done.invoke.templateVariablesState.creatingTemplateVersion:invocation[0]"
    waitForJobToBeCompleted: "done.invoke.templateVariablesState.waitingForJobToBeCompleted:invocation[0]"
    updateTemplate: "done.invoke.templateVariablesState.updatingTemplate:invocation[0]"
  }
  missingImplementations: {
    actions: "onUpdateTemplate"
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignTemplate: "done.invoke.templateVariablesState.gettingTemplate:invocation[0]"
    assignGetTemplateDataError:
      | "error.platform.templateVariablesState.gettingTemplate:invocation[0]"
      | "error.platform.templateVariablesState.gettingActiveTemplateVersion:invocation[0]"
      | "error.platform.templateVariablesState.gettingTemplateVariables:invocation[0]"
      | "error.platform.templateVariablesState.creatingTemplateVersion:invocation[0]"
    assignActiveTemplateVersion: "done.invoke.templateVariablesState.gettingActiveTemplateVersion:invocation[0]"
    assignTemplateVariables: "done.invoke.templateVariablesState.gettingTemplateVariables:invocation[0]"
    assignCreateTemplateVersionRequest: "UPDATE_TEMPLATE_EVENT"
    assignNewTemplateVersion:
      | "done.invoke.templateVariablesState.creatingTemplateVersion:invocation[0]"
      | "done.invoke.templateVariablesState.waitingForJobToBeCompleted:invocation[0]"
    assignUpdateTemplateError:
      | "error.platform.templateVariablesState.waitingForJobToBeCompleted:invocation[0]"
      | "error.platform.templateVariablesState.updatingTemplate:invocation[0]"
    onUpdateTemplate: "done.invoke.templateVariablesState.updatingTemplate:invocation[0]"
    clearGetTemplateDataError:
      | "xstate.init"
      | "done.invoke.templateVariablesState.gettingTemplate:invocation[0]"
      | "done.invoke.templateVariablesState.gettingActiveTemplateVersion:invocation[0]"
    clearUpdateTemplateError: "UPDATE_TEMPLATE_EVENT"
  }
  eventsCausingServices: {
    getTemplate: "xstate.init"
    getActiveTemplateVersion: "done.invoke.templateVariablesState.gettingTemplate:invocation[0]"
    getTemplateVariables: "done.invoke.templateVariablesState.gettingActiveTemplateVersion:invocation[0]"
    createNewTemplateVersion: "UPDATE_TEMPLATE_EVENT"
    waitForJobToBeCompleted: "done.invoke.templateVariablesState.creatingTemplateVersion:invocation[0]"
    updateTemplate: "done.invoke.templateVariablesState.waitingForJobToBeCompleted:invocation[0]"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates:
    | "gettingTemplate"
    | "gettingActiveTemplateVersion"
    | "gettingTemplateVariables"
    | "fillingParams"
    | "creatingTemplateVersion"
    | "waitingForJobToBeCompleted"
    | "updatingTemplate"
    | "updated"
    | "error"
  tags: "submitting"
}
