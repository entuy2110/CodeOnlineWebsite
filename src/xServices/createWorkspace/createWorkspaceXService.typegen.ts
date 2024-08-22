// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.createWorkspaceState.gettingTemplates:invocation[0]": {
      type: "done.invoke.createWorkspaceState.gettingTemplates:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.createWorkspaceState.gettingTemplates:invocation[0]": {
      type: "error.platform.createWorkspaceState.gettingTemplates:invocation[0]"
      data: unknown
    }
    "done.invoke.createWorkspaceState.gettingTemplateSchema:invocation[0]": {
      type: "done.invoke.createWorkspaceState.gettingTemplateSchema:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.createWorkspaceState.gettingTemplateSchema:invocation[0]": {
      type: "error.platform.createWorkspaceState.gettingTemplateSchema:invocation[0]"
      data: unknown
    }
    "done.invoke.createWorkspaceState.gettingTemplateParameters:invocation[0]": {
      type: "done.invoke.createWorkspaceState.gettingTemplateParameters:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.createWorkspaceState.gettingTemplateParameters:invocation[0]": {
      type: "error.platform.createWorkspaceState.gettingTemplateParameters:invocation[0]"
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
    "done.invoke.createWorkspaceState.gettingTemplateGitAuth:invocation[0]": {
      type: "done.invoke.createWorkspaceState.gettingTemplateGitAuth:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.createWorkspaceState.gettingTemplateGitAuth:invocation[0]": {
      type: "error.platform.createWorkspaceState.gettingTemplateGitAuth:invocation[0]"
      data: unknown
    }
    "done.invoke.createWorkspaceState.creatingWorkspace:invocation[0]": {
      type: "done.invoke.createWorkspaceState.creatingWorkspace:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.createWorkspaceState.creatingWorkspace:invocation[0]": {
      type: "error.platform.createWorkspaceState.creatingWorkspace:invocation[0]"
      data: unknown
    }
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {
    getTemplates: "done.invoke.createWorkspaceState.gettingTemplates:invocation[0]"
    getTemplateSchema: "done.invoke.createWorkspaceState.gettingTemplateSchema:invocation[0]"
    getTemplateParameters: "done.invoke.createWorkspaceState.gettingTemplateParameters:invocation[0]"
    checkPermissions: "done.invoke.checkPermissions"
    getTemplateGitAuth: "done.invoke.createWorkspaceState.gettingTemplateGitAuth:invocation[0]"
    createWorkspace: "done.invoke.createWorkspaceState.creatingWorkspace:invocation[0]"
    addDescription: "done.invoke.createWorkspaceState.addingDescription:invocation[0]"
  }
  missingImplementations: {
    actions: "onCreateWorkspace"
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignTemplates: "done.invoke.createWorkspaceState.gettingTemplates:invocation[0]"
    assignSelectedTemplate: "done.invoke.createWorkspaceState.gettingTemplates:invocation[0]"
    assignGetTemplatesError: "error.platform.createWorkspaceState.gettingTemplates:invocation[0]"
    assignTemplateSchema: "done.invoke.createWorkspaceState.gettingTemplateSchema:invocation[0]"
    assignGetTemplateSchemaError: "error.platform.createWorkspaceState.gettingTemplateSchema:invocation[0]"
    assignTemplateParameters: "done.invoke.createWorkspaceState.gettingTemplateParameters:invocation[0]"
    assignGetTemplateParametersError: "error.platform.createWorkspaceState.gettingTemplateParameters:invocation[0]"
    assignPermissions: "done.invoke.checkPermissions"
    assignCheckPermissionsError: "error.platform.checkPermissions"
    assignTemplateGitAuth: "done.invoke.createWorkspaceState.gettingTemplateGitAuth:invocation[0]"
    assignTemplateGitAuthError: "error.platform.createWorkspaceState.gettingTemplateGitAuth:invocation[0]"
    assignCreateWorkspaceRequest: "CREATE_WORKSPACE"
    assignOwner: "CREATE_WORKSPACE" | "SELECT_OWNER"
    onCreateWorkspace: "done.invoke.createWorkspaceState.creatingWorkspace:invocation[0]"
    assignCreateWorkspaceError: "error.platform.createWorkspaceState.creatingWorkspace:invocation[0]"
    clearGetTemplatesError: "xstate.init"
    clearGetTemplateSchemaError: "done.invoke.createWorkspaceState.gettingTemplates:invocation[0]"
    clearGetTemplateParametersError: "done.invoke.createWorkspaceState.gettingTemplateSchema:invocation[0]"
    clearCheckPermissionsError: "done.invoke.createWorkspaceState.gettingTemplateParameters:invocation[0]"
    clearTemplateGitAuthError:
      | "done.invoke.checkPermissions"
      | "REFRESH_GITAUTH"
    clearCreateWorkspaceError: "CREATE_WORKSPACE"
  }
  eventsCausingServices: {
    getTemplates: "xstate.init"
    getTemplateSchema: "done.invoke.createWorkspaceState.gettingTemplates:invocation[0]"
    getTemplateParameters: "done.invoke.createWorkspaceState.gettingTemplateSchema:invocation[0]"
    checkPermissions: "done.invoke.createWorkspaceState.gettingTemplateParameters:invocation[0]"
    getTemplateGitAuth: "done.invoke.checkPermissions" | "REFRESH_GITAUTH"
    createWorkspace: "CREATE_WORKSPACE"
    addDescription: "done.invoke.createWorkspaceState.creatingWorkspace:invocation[0]"
  }
  eventsCausingGuards: {
    areTemplatesEmpty: "done.invoke.createWorkspaceState.gettingTemplates:invocation[0]"
  }
  eventsCausingDelays: {}
  matchesStates:
    | "gettingTemplates"
    | "gettingTemplateSchema"
    | "gettingTemplateParameters"
    | "checkingPermissions"
    | "gettingTemplateGitAuth"
    | "fillingParams"
    | "creatingWorkspace"
    | "addingDescription"
    | "created"
    | "error"
  tags: never
}
