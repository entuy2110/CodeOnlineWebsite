// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.getQuota": {
      type: "done.invoke.getQuota"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.getQuota": {
      type: "error.platform.getQuota"
      data: unknown
    }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    getQuota: "done.invoke.getQuota"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignQuota: "done.invoke.getQuota"
    assignGetQuotaError: "error.platform.getQuota"
    clearGetQuotaError: "GET_QUOTA"
  }
  eventsCausingServices: {
    getQuota: "GET_QUOTA"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates: "idle" | "gettingQuotas" | "success"
  tags: never
}
