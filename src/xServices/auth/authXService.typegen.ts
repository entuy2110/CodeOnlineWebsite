
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.authState.loadingInitialAuthData:invocation[0]": { type: "done.invoke.authState.loadingInitialAuthData:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.authState.signedIn.profile.updatingProfile:invocation[0]": { type: "done.invoke.authState.signedIn.profile.updatingProfile:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.authState.signedIn.profile.updatingProfileV2:invocation[0]": { type: "done.invoke.authState.signedIn.profile.updatingProfileV2:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.authState.signedIn.profile.updatingUserV2:invocation[0]": { type: "done.invoke.authState.signedIn.profile.updatingUserV2:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.forgotPassword": { type: "done.invoke.forgotPassword"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.getServer": { type: "done.invoke.getServer"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.loginBySignUp": { type: "done.invoke.loginBySignUp"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.signIn": { type: "done.invoke.signIn"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.signInWithGoogle": { type: "done.invoke.signInWithGoogle"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.signOut": { type: "done.invoke.signOut"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.authState.loadingInitialAuthData:invocation[0]": { type: "error.platform.authState.loadingInitialAuthData:invocation[0]"; data: unknown };
"error.platform.authState.signedIn.profile.updatingProfile:invocation[0]": { type: "error.platform.authState.signedIn.profile.updatingProfile:invocation[0]"; data: unknown };
"error.platform.forgotPassword": { type: "error.platform.forgotPassword"; data: unknown };
"error.platform.getServer": { type: "error.platform.getServer"; data: unknown };
"error.platform.loginBySignUp": { type: "error.platform.loginBySignUp"; data: unknown };
"error.platform.signIn": { type: "error.platform.signIn"; data: unknown };
"error.platform.signInWithGoogle": { type: "error.platform.signInWithGoogle"; data: unknown };
"error.platform.signOut": { type: "error.platform.signOut"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "forgotPassword": "done.invoke.forgotPassword";
"getServer": "done.invoke.getServer";
"loadInitialAuthData": "done.invoke.authState.loadingInitialAuthData:invocation[0]";
"loginBySignUp": "done.invoke.loginBySignUp";
"signIn": "done.invoke.signIn";
"signInWithGoogle": "done.invoke.signInWithGoogle";
"signOut": "done.invoke.signOut";
"updateProfile": "done.invoke.authState.signedIn.profile.updatingProfile:invocation[0]";
"updateProfileV2": "done.invoke.authState.signedIn.profile.updatingProfileV2:invocation[0]";
"updateUserV2": "done.invoke.authState.signedIn.profile.updatingUserV2:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "assignData": "done.invoke.authState.loadingInitialAuthData:invocation[0]" | "done.invoke.forgotPassword" | "done.invoke.loginBySignUp" | "done.invoke.signIn" | "done.invoke.signInWithGoogle";
"assignError": "error.platform.authState.loadingInitialAuthData:invocation[0]" | "error.platform.forgotPassword" | "error.platform.loginBySignUp" | "error.platform.signIn" | "error.platform.signInWithGoogle" | "error.platform.signOut";
"assignUpdateProfileError": "error.platform.authState.signedIn.profile.updatingProfile:invocation[0]";
"clearData": "done.invoke.signOut";
"clearError": "FORGOT_PASSWORD" | "LOGIN_BY_SIGNUP" | "SIGN_IN" | "SIGN_IN_WITH_GOOGLE" | "done.invoke.authState.loadingInitialAuthData:invocation[0]" | "done.invoke.signOut";
"clearUpdateProfileError": "UPDATE_PROFILE";
"notifySuccessProfileUpdate": "done.invoke.authState.signedIn.profile.updatingProfile:invocation[0]";
"redirect": "done.invoke.signOut";
"updateUser": "done.invoke.authState.signedIn.profile.updatingProfile:invocation[0]";
"updateUser_2": "done.invoke.authState.signedIn.profile.updatingProfileV2:invocation[0]" | "done.invoke.authState.signedIn.profile.updatingUserV2:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "hasRedirectUrl": "done.invoke.signOut";
"isAuthenticated": "done.invoke.authState.loadingInitialAuthData:invocation[0]";
"needSetup": "done.invoke.authState.loadingInitialAuthData:invocation[0]";
        };
        eventsCausingServices: {
          "forgotPassword": "FORGOT_PASSWORD";
"getServer": "done.invoke.authState.loadingInitialAuthData:invocation[0]" | "done.invoke.forgotPassword" | "done.invoke.loginBySignUp" | "done.invoke.signIn" | "done.invoke.signInWithGoogle";
"loadInitialAuthData": "xstate.init";
"loginBySignUp": "LOGIN_BY_SIGNUP";
"signIn": "SIGN_IN";
"signInWithGoogle": "SIGN_IN_WITH_GOOGLE";
"signOut": "SIGN_OUT";
"updateProfile": "UPDATE_PROFILE";
"updateProfileV2": "UPDATE_PROFILE_V2";
"updateUserV2": "UPDATE_USER_V2";
        };
        matchesStates: "configuringTheFirstUser" | "forgotPassword" | "gettingServer" | "loadingInitialAuthData" | "loginingBySignup" | "signedIn" | "signedIn.profile" | "signedIn.profile.idle" | "signedIn.profile.idle.error" | "signedIn.profile.idle.noError" | "signedIn.profile.updatingProfile" | "signedIn.profile.updatingProfileV2" | "signedIn.profile.updatingUserV2" | "signedOut" | "signingIn" | "signingInWithGoogle" | "signingOut" | { "signedIn"?: "profile" | { "profile"?: "idle" | "updatingProfile" | "updatingProfileV2" | "updatingUserV2" | { "idle"?: "error" | "noError"; }; }; };
        tags: never;
      }
  