// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.getWorkspace": {
      type: "done.invoke.getWorkspace"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.getWorkspace": {
      type: "error.platform.getWorkspace"
      data: unknown
    }
    "done.invoke.checkPermissions": {
      type: "done.invoke.checkPermissions"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.checkPermissions": {
      type: "error.platform.checkPermissions"
      data: unknown
    }
    "done.invoke.getTemplate": {
      type: "done.invoke.getTemplate"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.getTemplate": {
      type: "error.platform.getTemplate"
      data: unknown
    }
    "error.platform.submitSchedule": {
      type: "error.platform.submitSchedule"
      data: unknown
    }
    "done.invoke.submitSchedule": {
      type: "done.invoke.submitSchedule"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    getWorkspace: "done.invoke.getWorkspace"
    checkPermissions: "done.invoke.checkPermissions"
    getTemplate: "done.invoke.getTemplate"
    submitSchedule: "done.invoke.submitSchedule"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignWorkspace: "done.invoke.getWorkspace"
    assignGetWorkspaceError: "error.platform.getWorkspace"
    assignPermissions: "done.invoke.checkPermissions"
    assignGetPermissionsError: "error.platform.checkPermissions"
    assignTemplate: "done.invoke.getTemplate"
    assignGetTemplateError: "error.platform.getTemplate"
    assignAutoStopChanged: "SUBMIT_SCHEDULE"
    assignSubmissionError: "error.platform.submitSchedule"
    restartWorkspace: "RESTART_WORKSPACE"
    clearGetWorkspaceError: "GET_WORKSPACE"
    clearContext: "GET_WORKSPACE"
    clearGetPermissionsError: "done.invoke.getWorkspace"
    clearGetTemplateError: "done.invoke.checkPermissions"
  }
  eventsCausingServices: {
    getWorkspace: "GET_WORKSPACE"
    checkPermissions: "done.invoke.getWorkspace"
    getTemplate: "done.invoke.checkPermissions"
    submitSchedule: "SUBMIT_SCHEDULE"
  }
  eventsCausingGuards: {
    autoStopChanged: "done.invoke.submitSchedule"
  }
  eventsCausingDelays: {}
  matchesStates:
    | "idle"
    | "gettingWorkspace"
    | "gettingPermissions"
    | "gettingTemplate"
    | "presentForm"
    | "submittingSchedule"
    | "showingRestartDialog"
    | "error"
    | "done"
  tags: "loading"
}
