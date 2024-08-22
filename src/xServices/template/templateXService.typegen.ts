// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "done.invoke.templateMachine.gettingTemplate:invocation[0]": {
      type: "done.invoke.templateMachine.gettingTemplate:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.refreshTemplate": {
      type: "done.invoke.refreshTemplate"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.templateMachine.gettingTemplate:invocation[0]": {
      type: "error.platform.templateMachine.gettingTemplate:invocation[0]"
      data: unknown
    }
    "done.invoke.templateMachine.initialInfo.activeTemplateVersion.gettingActiveTemplateVersion:invocation[0]": {
      type: "done.invoke.templateMachine.initialInfo.activeTemplateVersion.gettingActiveTemplateVersion:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.templateMachine.initialInfo.templateResources.gettingTemplateResources:invocation[0]": {
      type: "done.invoke.templateMachine.initialInfo.templateResources.gettingTemplateResources:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.templateMachine.initialInfo.templateVersions.gettingTemplateVersions:invocation[0]": {
      type: "done.invoke.templateMachine.initialInfo.templateVersions.gettingTemplateVersions:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.templateMachine.initialInfo.templateDAUs.gettingTemplateDAUs:invocation[0]": {
      type: "done.invoke.templateMachine.initialInfo.templateDAUs.gettingTemplateDAUs:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.templateMachine.initialInfo.templatePermissions.gettingTemplatePermissions:invocation[0]": {
      type: "done.invoke.templateMachine.initialInfo.templatePermissions.gettingTemplatePermissions:invocation[0]"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "xstate.after(5000)#templateMachine.loaded.waiting": {
      type: "xstate.after(5000)#templateMachine.loaded.waiting"
    }
    "xstate.init": { type: "xstate.init" }
    "error.platform.refreshTemplate": {
      type: "error.platform.refreshTemplate"
      data: unknown
    }
  }
  invokeSrcNameMap: {
    getTemplate:
      | "done.invoke.templateMachine.gettingTemplate:invocation[0]"
      | "done.invoke.refreshTemplate"
    getActiveTemplateVersion: "done.invoke.templateMachine.initialInfo.activeTemplateVersion.gettingActiveTemplateVersion:invocation[0]"
    getTemplateResources: "done.invoke.templateMachine.initialInfo.templateResources.gettingTemplateResources:invocation[0]"
    getTemplateVersions: "done.invoke.templateMachine.initialInfo.templateVersions.gettingTemplateVersions:invocation[0]"
    getTemplateDAUs: "done.invoke.templateMachine.initialInfo.templateDAUs.gettingTemplateDAUs:invocation[0]"
    getTemplatePermissions: "done.invoke.templateMachine.initialInfo.templatePermissions.gettingTemplatePermissions:invocation[0]"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignTemplate:
      | "done.invoke.templateMachine.gettingTemplate:invocation[0]"
      | "done.invoke.refreshTemplate"
    assignGetTemplateError: "error.platform.templateMachine.gettingTemplate:invocation[0]"
    assignActiveTemplateVersion: "done.invoke.templateMachine.initialInfo.activeTemplateVersion.gettingActiveTemplateVersion:invocation[0]"
    assignTemplateResources: "done.invoke.templateMachine.initialInfo.templateResources.gettingTemplateResources:invocation[0]"
    assignTemplateVersions: "done.invoke.templateMachine.initialInfo.templateVersions.gettingTemplateVersions:invocation[0]"
    assignTemplateDAUs: "done.invoke.templateMachine.initialInfo.templateDAUs.gettingTemplateDAUs:invocation[0]"
    assignPermissions: "done.invoke.templateMachine.initialInfo.templatePermissions.gettingTemplatePermissions:invocation[0]"
  }
  eventsCausingServices: {
    getTemplate:
      | "xstate.init"
      | "xstate.after(5000)#templateMachine.loaded.waiting"
    getActiveTemplateVersion: "done.invoke.templateMachine.gettingTemplate:invocation[0]"
    getTemplateResources: "done.invoke.templateMachine.gettingTemplate:invocation[0]"
    getTemplateVersions: "done.invoke.templateMachine.gettingTemplate:invocation[0]"
    getTemplateDAUs: "done.invoke.templateMachine.gettingTemplate:invocation[0]"
    getTemplatePermissions: "done.invoke.templateMachine.gettingTemplate:invocation[0]"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates:
    | "gettingTemplate"
    | "initialInfo"
    | "initialInfo.activeTemplateVersion"
    | "initialInfo.activeTemplateVersion.gettingActiveTemplateVersion"
    | "initialInfo.activeTemplateVersion.success"
    | "initialInfo.templateResources"
    | "initialInfo.templateResources.gettingTemplateResources"
    | "initialInfo.templateResources.success"
    | "initialInfo.templateVersions"
    | "initialInfo.templateVersions.gettingTemplateVersions"
    | "initialInfo.templateVersions.success"
    | "initialInfo.templateDAUs"
    | "initialInfo.templateDAUs.gettingTemplateDAUs"
    | "initialInfo.templateDAUs.success"
    | "initialInfo.templatePermissions"
    | "initialInfo.templatePermissions.gettingTemplatePermissions"
    | "initialInfo.templatePermissions.success"
    | "loaded"
    | "loaded.refreshingTemplate"
    | "loaded.waiting"
    | "error"
    | {
        initialInfo?:
          | "activeTemplateVersion"
          | "templateResources"
          | "templateVersions"
          | "templateDAUs"
          | "templatePermissions"
          | {
              activeTemplateVersion?: "gettingActiveTemplateVersion" | "success"
              templateResources?: "gettingTemplateResources" | "success"
              templateVersions?: "gettingTemplateVersions" | "success"
              templateDAUs?: "gettingTemplateDAUs" | "success"
              templatePermissions?: "gettingTemplatePermissions" | "success"
            }
        loaded?: "refreshingTemplate" | "waiting"
      }
  tags: never
}
