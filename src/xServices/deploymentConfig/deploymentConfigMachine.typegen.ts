// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.deploymentConfigMachine.config:invocation[0]": {
      type: "done.invoke.deploymentConfigMachine.config:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.deploymentConfigMachine.config:invocation[0]": {
      type: "error.platform.deploymentConfigMachine.config:invocation[0]"
      data: unknown
    }
    "done.invoke.deploymentConfigMachine.daus:invocation[0]": {
      type: "done.invoke.deploymentConfigMachine.daus:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.deploymentConfigMachine.daus:invocation[0]": {
      type: "error.platform.deploymentConfigMachine.daus:invocation[0]"
      data: unknown
    }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    getDeploymentValues: "done.invoke.deploymentConfigMachine.config:invocation[0]"
    getDeploymentDAUs: "done.invoke.deploymentConfigMachine.daus:invocation[0]"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignDeploymentValues: "done.invoke.deploymentConfigMachine.config:invocation[0]"
    assignGetDeploymentValuesError: "error.platform.deploymentConfigMachine.config:invocation[0]"
    assignDeploymentDAUs: "done.invoke.deploymentConfigMachine.daus:invocation[0]"
    assignGetDeploymentDAUsError: "error.platform.deploymentConfigMachine.daus:invocation[0]"
  }
  eventsCausingServices: {
    getDeploymentValues: "xstate.init"
    getDeploymentDAUs:
      | "done.invoke.deploymentConfigMachine.config:invocation[0]"
      | "error.platform.deploymentConfigMachine.config:invocation[0]"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates: "config" | "daus" | "done"
  tags: "loading"
}
