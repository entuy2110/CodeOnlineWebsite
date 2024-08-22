// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.createTemplate.loadingStarterTemplate:invocation[0]": {
      type: "done.invoke.createTemplate.loadingStarterTemplate:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.createTemplate.loadingStarterTemplate:invocation[0]": {
      type: "error.platform.createTemplate.loadingStarterTemplate:invocation[0]"
      data: unknown
    }
    "error.platform.createTemplate.creating.creatingFirstVersion:invocation[0]": {
      type: "error.platform.createTemplate.creating.creatingFirstVersion:invocation[0]"
      data: unknown
    }
    "error.platform.createTemplate.creating.waitingForJobToBeCompleted:invocation[0]": {
      type: "error.platform.createTemplate.creating.waitingForJobToBeCompleted:invocation[0]"
      data: unknown
    }
    "error.platform.createTemplate.creating.checkingParametersAndVariables:invocation[0]": {
      type: "error.platform.createTemplate.creating.checkingParametersAndVariables:invocation[0]"
      data: unknown
    }
    "error.platform.createTemplate.creating.creatingVersionWithParametersAndVariables:invocation[0]": {
      type: "error.platform.createTemplate.creating.creatingVersionWithParametersAndVariables:invocation[0]"
      data: unknown
    }
    "error.platform.createTemplate.creating.creatingTemplate:invocation[0]": {
      type: "error.platform.createTemplate.creating.creatingTemplate:invocation[0]"
      data: unknown
    }
    "error.platform.createTemplate.creating.loadingVersionLogs:invocation[0]": {
      type: "error.platform.createTemplate.creating.loadingVersionLogs:invocation[0]"
      data: unknown
    }
    "error.platform.createTemplate.uploading:invocation[0]": {
      type: "error.platform.createTemplate.uploading:invocation[0]"
      data: unknown
    }
    "done.invoke.createTemplate.uploading:invocation[0]": {
      type: "done.invoke.createTemplate.uploading:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.createTemplate.creating.creatingFirstVersion:invocation[0]": {
      type: "done.invoke.createTemplate.creating.creatingFirstVersion:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.createTemplate.creating.waitingForJobToBeCompleted:invocation[0]": {
      type: "done.invoke.createTemplate.creating.waitingForJobToBeCompleted:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.createTemplate.creating.creatingVersionWithParametersAndVariables:invocation[0]": {
      type: "done.invoke.createTemplate.creating.creatingVersionWithParametersAndVariables:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.createTemplate.creating.checkingParametersAndVariables:invocation[0]": {
      type: "done.invoke.createTemplate.creating.checkingParametersAndVariables:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.createTemplate.creating.creatingTemplate:invocation[0]": {
      type: "done.invoke.createTemplate.creating.creatingTemplate:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.createTemplate.creating.loadingVersionLogs:invocation[0]": {
      type: "done.invoke.createTemplate.creating.loadingVersionLogs:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "": { type: "" }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    loadStarterTemplate: "done.invoke.createTemplate.loadingStarterTemplate:invocation[0]"
    uploadFile: "done.invoke.createTemplate.uploading:invocation[0]"
    createFirstVersion: "done.invoke.createTemplate.creating.creatingFirstVersion:invocation[0]"
    waitForJobToBeCompleted: "done.invoke.createTemplate.creating.waitingForJobToBeCompleted:invocation[0]"
    checkParametersAndVariables: "done.invoke.createTemplate.creating.checkingParametersAndVariables:invocation[0]"
    createVersionWithParametersAndVariables: "done.invoke.createTemplate.creating.creatingVersionWithParametersAndVariables:invocation[0]"
    createTemplate: "done.invoke.createTemplate.creating.creatingTemplate:invocation[0]"
    loadVersionLogs: "done.invoke.createTemplate.creating.loadingVersionLogs:invocation[0]"
  }
  missingImplementations: {
    actions: "onCreate"
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignStarterTemplate: "done.invoke.createTemplate.loadingStarterTemplate:invocation[0]"
    assignError:
      | "error.platform.createTemplate.loadingStarterTemplate:invocation[0]"
      | "error.platform.createTemplate.creating.creatingFirstVersion:invocation[0]"
      | "error.platform.createTemplate.creating.waitingForJobToBeCompleted:invocation[0]"
      | "error.platform.createTemplate.creating.checkingParametersAndVariables:invocation[0]"
      | "error.platform.createTemplate.creating.creatingVersionWithParametersAndVariables:invocation[0]"
      | "error.platform.createTemplate.creating.creatingTemplate:invocation[0]"
      | "error.platform.createTemplate.creating.loadingVersionLogs:invocation[0]"
    assignTemplateData: "CREATE"
    assignFile: "UPLOAD_FILE"
    removeFile:
      | "REMOVE_FILE"
      | "error.platform.createTemplate.uploading:invocation[0]"
    assignUploadResponse: "done.invoke.createTemplate.uploading:invocation[0]"
    displayUploadError: "error.platform.createTemplate.uploading:invocation[0]"
    assignVersion:
      | "done.invoke.createTemplate.creating.creatingFirstVersion:invocation[0]"
      | "done.invoke.createTemplate.creating.waitingForJobToBeCompleted:invocation[0]"
      | "done.invoke.createTemplate.creating.creatingVersionWithParametersAndVariables:invocation[0]"
    assignJobError: "done.invoke.createTemplate.creating.waitingForJobToBeCompleted:invocation[0]"
    assignParametersAndVariables: "done.invoke.createTemplate.creating.checkingParametersAndVariables:invocation[0]"
    onCreate: "done.invoke.createTemplate.creating.creatingTemplate:invocation[0]"
    assignJobLogs: "done.invoke.createTemplate.creating.loadingVersionLogs:invocation[0]"
  }
  eventsCausingServices: {
    loadStarterTemplate: ""
    uploadFile: "UPLOAD_FILE"
    createFirstVersion: "CREATE"
    waitForJobToBeCompleted:
      | "done.invoke.createTemplate.creating.creatingFirstVersion:invocation[0]"
      | "done.invoke.createTemplate.creating.creatingVersionWithParametersAndVariables:invocation[0]"
    checkParametersAndVariables: "done.invoke.createTemplate.creating.waitingForJobToBeCompleted:invocation[0]"
    createVersionWithParametersAndVariables: "CREATE"
    createTemplate: "done.invoke.createTemplate.creating.checkingParametersAndVariables:invocation[0]"
    loadVersionLogs: "done.invoke.createTemplate.creating.waitingForJobToBeCompleted:invocation[0]"
  }
  eventsCausingGuards: {
    isExampleProvided: ""
    isNotUsingExample: "UPLOAD_FILE"
    hasFile: "REMOVE_FILE"
    hasFailed: "done.invoke.createTemplate.creating.waitingForJobToBeCompleted:invocation[0]"
    hasNoParametersOrVariables: "done.invoke.createTemplate.creating.checkingParametersAndVariables:invocation[0]"
  }
  eventsCausingDelays: {}
  matchesStates:
    | "starting"
    | "loadingStarterTemplate"
    | "idle"
    | "uploading"
    | "creating"
    | "creating.creatingFirstVersion"
    | "creating.waitingForJobToBeCompleted"
    | "creating.checkingParametersAndVariables"
    | "creating.promptParametersAndVariables"
    | "creating.creatingVersionWithParametersAndVariables"
    | "creating.creatingTemplate"
    | "creating.created"
    | "creating.loadingVersionLogs"
    | {
        creating?:
          | "creatingFirstVersion"
          | "waitingForJobToBeCompleted"
          | "checkingParametersAndVariables"
          | "promptParametersAndVariables"
          | "creatingVersionWithParametersAndVariables"
          | "creatingTemplate"
          | "created"
          | "loadingVersionLogs"
      }
  tags: "loading" | "submitting"
}
