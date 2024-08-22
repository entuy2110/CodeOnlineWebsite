
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.starterProject.changingPermission:invocation[0]": { type: "done.invoke.starterProject.changingPermission:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.starterProject.loading:invocation[0]": { type: "done.invoke.starterProject.loading:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.starterProject.loading:invocation[0]": { type: "error.platform.starterProject.loading:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "changePermission": "done.invoke.starterProject.changingPermission:invocation[0]";
"loadProject": "done.invoke.starterProject.loading:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "assignError": "error.platform.starterProject.loading:invocation[0]";
"assignIsPublic": "CHANGEPERMISSION";
"assignProject": "done.invoke.starterProject.loading:invocation[0]";
"showChangeSuccess": "done.invoke.starterProject.changingPermission:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "changePermission": "CHANGEPERMISSION";
"loadProject": "done.invoke.starterProject.changingPermission:invocation[0]" | "xstate.init";
        };
        matchesStates: "changingPermission" | "idle" | "idle.error" | "idle.ok" | "loading" | "waiting" | { "idle"?: "error" | "ok"; };
        tags: never;
      }
  