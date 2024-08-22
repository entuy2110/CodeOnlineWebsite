// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.uploadTar": {
      type: "done.invoke.uploadTar"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.createBuild": {
      type: "done.invoke.createBuild"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.fetchVersion": {
      type: "done.invoke.fetchVersion"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.getResources": {
      type: "done.invoke.getResources"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.cancelBuild": {
      type: "done.invoke.cancelBuild"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.watchBuildLogs": {
      type: "done.invoke.watchBuildLogs"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "xstate.init": { type: "xstate.init" }
    "done.invoke.updateActiveVersion": {
      type: "done.invoke.updateActiveVersion"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.updateActiveVersion": {
      type: "error.platform.updateActiveVersion"
      data: unknown
    }
    "error.platform.cancelBuild": {
      type: "error.platform.cancelBuild"
      data: unknown
    }
    "error.platform.uploadTar": {
      type: "error.platform.uploadTar"
      data: unknown
    }
    "error.platform.createBuild": {
      type: "error.platform.createBuild"
      data: unknown
    }
    "error.platform.watchBuildLogs": {
      type: "error.platform.watchBuildLogs"
      data: unknown
    }
    "error.platform.fetchVersion": {
      type: "error.platform.fetchVersion"
      data: unknown
    }
    "error.platform.getResources": {
      type: "error.platform.getResources"
      data: unknown
    }
  }
  invokeSrcNameMap: {
    updateActiveVersion: "done.invoke.updateActiveVersion"
    cancelBuild: "done.invoke.cancelBuild"
    uploadTar: "done.invoke.uploadTar"
    createBuild: "done.invoke.createBuild"
    watchBuildLogs: "done.invoke.watchBuildLogs"
    fetchVersion: "done.invoke.fetchVersion"
    getResources: "done.invoke.getResources"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignTarReader: "INITIALIZE"
    assignCreateBuild: "CREATE_VERSION"
    assignUploadResponse: "done.invoke.uploadTar"
    assignBuild: "done.invoke.createBuild" | "done.invoke.fetchVersion"
    addBuildLog: "ADD_BUILD_LOG"
    assignResources: "done.invoke.getResources"
  }
  eventsCausingServices: {
    updateActiveVersion: "UPDATE_ACTIVE_VERSION"
    cancelBuild: "CREATE_VERSION" | "CANCEL_VERSION"
    uploadTar: "done.invoke.cancelBuild" | "CREATE_VERSION"
    createBuild: "done.invoke.uploadTar"
    watchBuildLogs: "done.invoke.createBuild"
    fetchVersion: "done.invoke.watchBuildLogs"
    getResources: "done.invoke.fetchVersion"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates:
    | "initializing"
    | "idle"
    | "updatingActiveVersion"
    | "cancelingBuild"
    | "uploadTar"
    | "creatingBuild"
    | "watchingBuildLogs"
    | "fetchingVersion"
    | "fetchResources"
  tags: "loading"
}
