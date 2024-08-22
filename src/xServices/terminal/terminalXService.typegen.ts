// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.getApplicationsHost": {
      type: "done.invoke.getApplicationsHost"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.getWorkspace": {
      type: "done.invoke.getWorkspace"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.getWorkspace": {
      type: "error.platform.getWorkspace"
      data: unknown
    }
    "done.invoke.getWorkspaceAgent": {
      type: "done.invoke.getWorkspaceAgent"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.getWorkspaceAgent": {
      type: "error.platform.getWorkspaceAgent"
      data: unknown
    }
    "done.invoke.connect": {
      type: "done.invoke.connect"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.connect": { type: "error.platform.connect"; data: unknown }
    "xstate.init": { type: "xstate.init" }
    "error.platform.getApplicationsHost": {
      type: "error.platform.getApplicationsHost"
      data: unknown
    }
  }
  invokeSrcNameMap: {
    getApplicationsHost: "done.invoke.getApplicationsHost"
    getWorkspace: "done.invoke.getWorkspace"
    getWorkspaceAgent: "done.invoke.getWorkspaceAgent"
    connect: "done.invoke.connect"
  }
  missingImplementations: {
    actions: "readMessage"
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignApplicationsHost: "done.invoke.getApplicationsHost"
    clearApplicationsHostError: "done.invoke.getApplicationsHost"
    assignWorkspace: "done.invoke.getWorkspace"
    clearWorkspaceError: "done.invoke.getWorkspace"
    assignWorkspaceError: "error.platform.getWorkspace"
    assignWorkspaceAgent: "done.invoke.getWorkspaceAgent"
    clearWorkspaceAgentError: "done.invoke.getWorkspaceAgent"
    assignWorkspaceAgentError: "error.platform.getWorkspaceAgent"
    assignWebsocket: "done.invoke.connect"
    clearWebsocketError: "done.invoke.connect"
    assignWebsocketError: "error.platform.connect"
    sendMessage: "WRITE"
    readMessage: "READ"
    disconnect: "DISCONNECT"
    assignConnection: "CONNECT"
  }
  eventsCausingServices: {
    getApplicationsHost: "xstate.init"
    getWorkspace: "xstate.init"
    getWorkspaceAgent: "done.state.terminalState.setup" | "CONNECT"
    connect: "done.invoke.getWorkspaceAgent"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates:
    | "setup"
    | "setup.getApplicationsHost"
    | "setup.getApplicationsHost.gettingApplicationsHost"
    | "setup.getApplicationsHost.success"
    | "setup.getWorkspace"
    | "setup.getWorkspace.gettingWorkspace"
    | "setup.getWorkspace.success"
    | "gettingWorkspaceAgent"
    | "connecting"
    | "connected"
    | "disconnected"
    | {
        setup?:
          | "getApplicationsHost"
          | "getWorkspace"
          | {
              getApplicationsHost?: "gettingApplicationsHost" | "success"
              getWorkspace?: "gettingWorkspace" | "success"
            }
      }
  tags: never
}
