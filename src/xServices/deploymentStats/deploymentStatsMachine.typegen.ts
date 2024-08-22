// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.deploymentStatsMachine.stats:invocation[0]": {
      type: "done.invoke.deploymentStatsMachine.stats:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.deploymentStatsMachine.stats:invocation[0]": {
      type: "error.platform.deploymentStatsMachine.stats:invocation[0]"
      data: unknown
    }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    getDeploymentStats: "done.invoke.deploymentStatsMachine.stats:invocation[0]"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignDeploymentStats: "done.invoke.deploymentStatsMachine.stats:invocation[0]"
    assignDeploymentStatsError: "error.platform.deploymentStatsMachine.stats:invocation[0]"
  }
  eventsCausingServices: {
    getDeploymentStats: "xstate.init" | "RELOAD"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates: "stats" | "idle"
  tags: "loading"
}
