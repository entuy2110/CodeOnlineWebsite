// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "xstate.init": { type: "xstate.init" }
    "done.invoke.getAppearance": {
      type: "done.invoke.getAppearance"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "done.invoke.setAppearance": {
      type: "done.invoke.setAppearance"
      data: unknown
      __tip: "See the XState TS docs to learn how to strongly type this."
    }
    "error.platform.getAppearance": {
      type: "error.platform.getAppearance"
      data: unknown
    }
    "error.platform.setAppearance": {
      type: "error.platform.setAppearance"
      data: unknown
    }
  }
  invokeSrcNameMap: {
    getAppearance: "done.invoke.getAppearance"
    setAppearance: "done.invoke.setAppearance"
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    clearGetAppearanceError: "SET_PREVIEW_APPEARANCE" | "xstate.init"
    clearSetAppearanceError: "SET_PREVIEW_APPEARANCE" | "SAVE_APPEARANCE"
    assignPreviewAppearance: "SET_PREVIEW_APPEARANCE"
    assignAppearance: "done.invoke.getAppearance" | "done.invoke.setAppearance"
    assignGetAppearanceError: "error.platform.getAppearance"
    notifyUpdateAppearanceSuccess: "done.invoke.setAppearance"
    assignSetAppearanceError: "error.platform.setAppearance"
  }
  eventsCausingServices: {
    getAppearance: "xstate.init"
    setAppearance: "SAVE_APPEARANCE"
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates: "idle" | "gettingAppearance" | "savingAppearance"
  tags: never
}
