// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.auditMachine.loading:invocation[0]": {
      type: "done.invoke.auditMachine.loading:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.auditMachine.loading:invocation[0]": {
      type: "error.platform.auditMachine.loading:invocation[0]"
      data: unknown
    }
    "xstate.init": { type: "xstate.init" }
    "": { type: "" }
  }
  invokeSrcNameMap: {
    loadAuditLogsAndCount: "done.invoke.auditMachine.loading:invocation[0]"
  }
  missingImplementations: {
    actions: "updateURL"
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignAuditLogsAndCount: "done.invoke.auditMachine.loading:invocation[0]"
    displayApiError: "error.platform.auditMachine.loading:invocation[0]"
    assignError: "error.platform.auditMachine.loading:invocation[0]"
    updateURL: "UPDATE_PAGE"
    assignFilter: "FILTER"
    sendResetPage: "FILTER"
    assignPaginationRef: "xstate.init"
    clearPreviousAuditLogs: "" | "UPDATE_PAGE"
    clearError: "" | "UPDATE_PAGE"
  }
  eventsCausingServices: {
    loadAuditLogsAndCount: "" | "UPDATE_PAGE"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates: "startPagination" | "loading" | "idle"
  tags: never
}
