import { getErrorMessage } from "api/errors"
import dayjs from "dayjs"
import { workspaceScheduleBannerMachine } from "xServices/workspaceSchedule/workspaceScheduleBannerXService"
import { assign, createMachine, send } from "xstate"
import * as API from "../../api/api"
import * as Types from "../../api/types"
import * as TypesGen from "../../api/typesGenerated"
import {
  displayError,
  displaySuccess,
} from "../../components/GlobalSnackbar/utils"
import { context } from "msw"

const latestBuild = (builds: TypesGen.WorkspaceBuild[]) => {
  // Cloning builds to not change the origin object with the sort()
  return [...builds].sort((a, b) => {
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  })[0]
}

const moreBuildsAvailable = (
  context: WorkspaceContext,
  event: {
    type: "REFRESH_TIMELINE"
    checkRefresh?: boolean
    data?: TypesGen.ServerSentEvent["data"]
  },
) => {
  // No need to refresh the timeline if it is not loaded
  if (!context.builds) {
    return false
  }

  if (!event.checkRefresh) {
    return true
  }

  // After we refresh a workspace, we want to check if the latest
  // build was updated before refreshing the timeline so as to not over fetch the builds
  const latestBuildInTimeline = latestBuild(context.builds)
  return event.data.latest_build.updated_at !== latestBuildInTimeline.updated_at
}

const Language = {
  getTemplateWarning:
    "Error updating workspace: latest template could not be fetched.",
  getTemplateParametersWarning:
    "Error updating workspace: template parameters could not be fetched.",
  buildError: "Workspace action failed.",
}

type Permissions = Record<keyof ReturnType<typeof permissionsToCheck>, boolean>

export interface WorkspaceContext {
  // our server side events instance
  eventSource?: EventSource
  workspace?: TypesGen.Workspace
  template?: TypesGen.Template
  build?: TypesGen.WorkspaceBuild
  getWorkspaceError?: Error | unknown
  getTemplateWarning: Error | unknown
  getTemplateParametersWarning: Error | unknown
  // Builds
  builds?: TypesGen.WorkspaceBuild[]
  getBuildsError?: Error | unknown
  missingParameters?: TypesGen.TemplateVersionParameter[]
  // error creating a new WorkspaceBuild
  buildError?: Error | unknown
  cancellationMessage?: Types.Message
  cancellationError?: Error | unknown
  // permissions
  permissions?: Permissions
  checkPermissionsError?: Error | unknown
  // applications
  applicationsHost?: string
}

export type WorkspaceEvent =
  | { type: "GET_WORKSPACE"; workspaceName: string; username: string }
  | { type: "REFRESH_WORKSPACE"; data: TypesGen.ServerSentEvent["data"] }
  | { type: "START" }
  | { type: "STOP" }
  | { type: "ASK_DELETE" }
  | { type: "DELETE" }
  | { type: "CANCEL_DELETE" }
  | { type: "UPDATE"; buildParameters?: TypesGen.WorkspaceBuildParameter[] }
  | { type: "CANCEL" }
  | {
      type: "REFRESH_TIMELINE"
      checkRefresh?: boolean
      data?: TypesGen.ServerSentEvent["data"]
    }
  | { type: "EVENT_SOURCE_ERROR"; error: Error | unknown }
  | { type: "INCREASE_DEADLINE"; hours: number }
  | { type: "DECREASE_DEADLINE"; hours: number }

export const checks = {
  readWorkspace: "readWorkspace",
  updateWorkspace: "updateWorkspace",
} as const

const permissionsToCheck = (workspace: TypesGen.Workspace) => ({
  [checks.readWorkspace]: {
    object: {
      resource_type: "workspace",
      resource_id: workspace.id,
      owner_id: workspace.owner_id,
    },
    action: "read",
  },
  [checks.updateWorkspace]: {
    object: {
      resource_type: "workspace",
      resource_id: workspace.id,
      owner_id: workspace.owner_id,
    },
    action: "update",
  },
})

export const workspaceMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QHcD2AnA1rADgQwGMwBlAFz1LAGIBxAUQBUB9AdQHkAlAaWIAUBBAMJ0A2gAYAuolA5UsAJal5qAHbSQAD0QAWAEwAaEAE9EANgCsAdgB0505YDMATl0WAjKdMOAHAF9fhmhYuIQk5JTWMKRKKlAsGNj4RFQQqmDW8ioAbqiY6VHxwUlg4lJIILIKSqrqWggODmLWTpbmYrpiDWLmbubehiYI2qbazW6OTg5uTi1O3k7+gQkhRGQU+WDRmXHLxVRg6OgY1jgANhQAZhgAtpGbhYmhpeqVispq5XUO9tZTuuY9cwdKbaFoDRBuPQOazDSyWUxiSzaBzabymXSLEBBR6rcIbLaxBhga5ndYpNIZbK5fFEknnSjPcqvaofUBfbRNFptYGNQH9YwQnq2cYNFpiNy6DpibSY7ErMLrO4EqC00mUfaHY5qq7oW5RVX0kqSF5yN41T5mAwChASjzWVzw-5OMSI0zeSyy3ahNYRKIxKC8A7XeSwBSqWDklTpTI5PLWAgACzABEwgd1IbDKlgjJkppZtR0bm8MPd5imRbETnsVsGVfM1jc41BQJmIwWASxXtxir92zTwdD7wjByO6BO9J1t0TydTQYzQ5zFTz7wLQyLJda5e8ler4JtYndwtaqMsc0llj8HblxR96QIeBUa3QpEj0apcfvj-Iz8XzJXFoQOwnGsSw3AcXRtDLbcnCgvcLGhTpLDELxkO8c83E9IpvTxeMHyfF9UijSlYzvPDv1IEQ3DKXMqn-NlEDsUZ3Qg50ZgvHptD3cxIOaTdvEbNpWnFTCcQVCJ0DAABHABXOB-Xw19iOpaxYHIh55V-ZdzXohBvH4kC+kRf5WjhCU9zcA8bB6VpdFA3QixskT5VvawJJkuTtgUkctQnG4VLUrsjWopdaO0zRECrNxrHsHpEXmdpuj3GDTAbEyqwcAFEUgpybxwiS8AgIxrFOENKBUbYlX9OgsjAFRSAjDg6AAMUa4gAAlWE4HgBGETTQtZcKbV0FFrG8OxvhdStQK4lpfjaHw3VMcZWgwq9Apc-LCuK0raoq3tYmq2r6qoOgADU6AAOWYYg2AAVQ4YQmDoDgOE4PqzQGupIU8aL-gldFkXmN09zhaEfB8P67HGeYcuwxVNqKkrVN22JrG89AqA0VTFTwC5KHQAAKKUxAASioa84fEsACsRnbytR9H3vzADeiRaxxVcFFJhdDl+UGSx-lG7wHCRHwwKsLxYe7KmaesAAjaT5FOCAMggU5qGIBh+A4BgmbowbpmRED-ilU89BmBxzOmFKpWddFhtMFopbE9IEflxXldV9WqE1theD1sKvqcI2BaBF0zd0C3zLLFKEUhCHXW0aZnY26mtoVpWVfkNXqH4YguCYAAROgABlGFEY0mS0z6IWD6FQ9N4PI8mczI5sDpG0lJPujLValiw6XXbToqM897Pvdu3hC-4BgK+Cv9A9rkOTfDpuo+tQ3i2daZenMKtHHhFO8uH93M696hBH4C7hBLgOa5tOvjbDxE15bjft2hGDxk6dxtFPI-4Yn1HirPAsBMDbELmAdW6pi5l1nnfVckoyyjW5CidowxERJTsKNF0e9pSuARMLABMt04exAWAiBUDNgXyvjfIupdy4IIAvZFwvwTa6D0hYGCjhW7DBAuKcUyJxgSnMMQoestgGuSkrJVS2xbo4AgGSQib4SLWApoPKREiyFSPcrI2I8jFGUAQDGVA94WSlCYTpeyVhRomwaNMVwQJOIbxmMBDkHQHbbwsDKNaA8XaaNIWfNyMj-QGLJOjcclw-LqP8W7SRwSPL6IUesYxVIzHvAsZXGiH1VyG3rivF+5s36DElN4JiQIJTHmmNwsRASR7aISXoqAYT1QRO1NE9ax8tFBOkYk5pySjEmPSaoCxVETT9UQd0JoDQ4SWT3j0GC5kxqjEgkWRsSJQSIlqXE7RoDwGxCahgAAshmSAAAhMhvA8DoDwNcah6AIyX2vqXSxBsATASQR4YYHInBrOjjxaY5ZkR-wPO0bZQDdkUIOcc05EALmZyuTcu5+MIyT2nvArJIUcks3efaP6IwRiVj+daeyIwGwJUcM2Dh4xwXdM9o0+S5FFImLjNjZ86liivLqPZAWo0RaOBGACbQehTBW3FAZUFw1QJonsLSwJ9LelNK8pqMc7TdT+WuaQDlTxMUL3vjy6EndQIXnRHHcy4dfgukdmNKU3wHByvqT03RjLUA4GZe+dIqlXXaqIFyxABqGyVOhqa8U5lhW6AbD0BoyIAT8V6A60+CrnWeVIK6jUo5ImkEnP5b1gU-UIADT4UGelhbujQuZFENgkISl5J0OYEoE3xMVf6SB0DqDKKUnGCAVDKA+qCuM7FOld4fPxd8ol-Ew1tBAsiARVLQSXn7qJVOdKVYMsoW29NPkonqu7W2vt+bh14p6ASn5xLBjixti4O2IwUSG0bQ05t2xBAPiIKcd1qjPyvv3bq6uiCwIRobjWtiAs+YQjdFFAEHg2i9Eji6e1vil1dPlaux9sRn0qFfZu1Vvl1Wfqgd++ev7mG9GLBZdokI971ulNHQ8FlejDEaBZD0CHnJIaKkoO5JUiL7SgPC5WEYO0svSDE5dW0ONQMyPif0fGICwFSTkYZKhMmEYmSzJOoxO7ohbI7Gye5vj1kgp0Izll1kJvE1xqT2wZPDhVZm7NIm2PWHM5JyqVmyFyaGRQDJkgD3qcDa4E2VYuQ1n9aBdmLpqm9DdPxEWZn5CcZc6cVABVznuaoI1FqdB2pMAYAASSOaXXLF054DuZkOvzmnAs6aBHuSUTQ2gul+chFEZZYssdyoA2WeAcBnHkIp2ArnYj8B6yVfrbU5AEQpEJtRnTOtbW671-rg2oDDcW158M43VLydMetpTPmf2qfK+ie0IsvCogce0WrqJizbklEtJEwsmMJoW6N3bA2eOrdeyyWAm2XxtJw7cBzc2iovb6295bn2wffd+9txTynSv6y+sMCNUqzv8RcJdklfRoR2IsAiQRYFano1oIwTq3A+BCBK1XQ7g1vg2D+JBsOIIwQbxFhG-eFhHG4LQv4DsKhUDdvgOUIHlAEeLwQAAWlFdaCXSdmiuJdBwpaXCqy1PHmAMX989C1dYXvKVSJ0RGZGLUnjfbNerisBW7iIFlqITaKWnxi7WM9k2P6A06xzcAW1+-GwlYHa2W3IrvQJvXd9jnIOcMnudJwiSqwqYK1QLcSvX3TsfiXKfnwlHwaZYPlgVBTKyUIM0S-D-qXtEYFHCiPa5TIeybYiZ+p4OwaN6GxaasPbpaNXrQwQjchISWU2i-IXanxDwOs9fUbG4v6kJE+uD3DxBrlZuJ6CZwCBNSMyrbHHxCcYEaV+Nj-jB6XgxB8oM6GiILLZpTr7pntUPB0ap1SF9ksrBs6swmn4foEx+zAzBwd0JsEYGddsJ3DrEhWmZGemKANGFVbfG0R2JoWyKNAWJOFoFEEGb4ZoasdoB7DoRwe9TOOAxsH4ffGfI-PcC-S1boZ0MsZEdEeDUAmvOpRNLOHOIg0GBsApREPoUCZxc9Wg0aNZDKBEFERoUwAgz2PZddahOA4aKsWwd0UWDhaUNA1ueYNhZXC8PvKwR3EfZ3cAlgnREJORAZDXRvV-blZwFKHgpQ7cUEHhElYaKKC2MaIEVoU1CQ8hfZKAQ5dAE5UMVLBFa5W5e5Z-LFCwiEJA6KU1JOaYMtYpf1DwGwCyeyHlJEOYYOTwowvpBvF-RHf1KwhQuEZEZQ+wy2DeA-dmVoGCW7IERoXQkXcRZDbIpVVNHAWQwomwkouw1QjeSCFZeEP+QEHwbcKvRgjRHZJ1Yw2IVtGQ8w-IoaXoD-HoMg7-CtVwECewbhIybiOELItdNDF9KBDo+Qro8CHohw89JCCNcCewYVOYA8PSDEavCYk+ZzKMIgpI5Yg-WfH-G0BocLRrd0ZCWIsYvQsApo9jeLCTbje-XjdzIg6xb41Yufa0DKesOEXud0b5YfRo5g949IJLFLOFBE+Y8XcYa3f4cUUCCweZWyHXesYLSOSUf4biBg8Epgt2UHfrT4kgz-X4q7cVRoO7IsOwEEho2bAw7k8HD7EbKHIcX7REpY0gr-VEkpbkdmWyRoMtcjTwZ7OUpbdGdg8VTTPBaxOnWrBEAYpEHedHX5fUtbb7FSaSAgIgUMY0qKU050c0+wWrWKTUxwYgjwGZBNWAacCAaSdWT4saZE1Uv42ycYfhCCR2VZFoSEInWAsk++FvDwVkoScvLvc9Vk9mewTwIlCyJOZjfwIAA */
    id: "workspaceState",
    predictableActionArguments: true,
    tsTypes: {} as import("./workspaceXService.typegen").Typegen0,
    schema: {
      context: {} as WorkspaceContext,
      events: {} as WorkspaceEvent,
      services: {} as {
        getWorkspace: {
          data: TypesGen.Workspace
        }
        getTemplate: {
          data: TypesGen.Template
        }
        getTemplateParameters: {
          data: TypesGen.TemplateVersionParameter[]
        }
        updateWorkspace: {
          data: TypesGen.WorkspaceBuild
        }
        startWorkspace: {
          data: TypesGen.WorkspaceBuild
        }
        stopWorkspace: {
          data: TypesGen.WorkspaceBuild
        }
        deleteWorkspace: {
          data: TypesGen.WorkspaceBuild
        }
        cancelWorkspace: {
          data: Types.Message
        }
        listening: {
          data: TypesGen.ServerSentEvent
        }
        getBuilds: {
          data: TypesGen.WorkspaceBuild[]
        }
        checkPermissions: {
          data: TypesGen.AuthorizationResponse
        }
        getApplicationsHost: {
          data: TypesGen.AppHostResponse
        }
      },
    },
    initial: "idle",
    on: {
      GET_WORKSPACE: {
        target: ".gettingWorkspace",
        internal: false,
      },
    },
    states: {
      idle: {
        tags: "loading",
      },

      gettingWorkspace: {
        entry: ["clearContext"],
        invoke: {
          src: "getWorkspace",
          id: "getWorkspace",
          onDone: [
            {
              actions: ["assignWorkspace", "clearGetWorkspaceError"],
              target: "gettingTemplate",
            },
          ],
          onError: [
            {
              actions: "assignGetWorkspaceError",
              target: "error",
            },
          ],
        },
        tags: "loading",
      },

      gettingTemplate: {
        invoke: {
          src: "getTemplate",
          id: "getTemplate",
          onDone: [
            {
              actions: ["assignTemplate", "clearGetTemplateWarning"],
              target: "gettingPermissions",
            },
          ],
          onError: [
            {
              actions: [
                "assignGetTemplateWarning",
                "displayGetTemplateWarning",
              ],
              target: "error",
            },
          ],
        },
        tags: "loading",
      },

      gettingPermissions: {
        invoke: {
          src: "checkPermissions",
          id: "checkPermissions",
          onDone: [
            {
              actions: ["assignPermissions", "clearGetPermissionsError"],
              target: "canStart",
            },
          ],
          onError: [
            {
              actions: "assignGetPermissionsError",
              target: "error",
            },
          ],
        },
        tags: "loading",
      },

      canStart: {
        invoke: {
          src: "canStart",
          id: "canStart",
          onDone: [
            {
              target: 'requestingStart',
              cond: 'canStart',
            },
            {
              target: 'ready',
            }
          ],
        }
      },

      requestingStart: {
        entry: ["clearBuildError", "updateStatusToPending"],

        invoke: {
          src: "startWorkspace",
          id: "startWorkspace",
          onDone: {
            actions: ["assignBuild"],
            target: "ready"
          },
          onError: [
            {
              actions: "assignBuildError",
              target: "ready",
            },
          ],
        }
      },

      ready: {
        type: "parallel",
        states: {
          listening: {
            initial: "gettingEvents",
            states: {
              gettingEvents: {
                entry: ["initializeEventSource"],
                exit: "closeEventSource",
                invoke: {
                  src: "listening",
                  id: "listening",
                },
                on: {
                  REFRESH_WORKSPACE: {
                    actions: ["refreshWorkspace"],
                  },
                  EVENT_SOURCE_ERROR: {
                    target: "error",
                  },
                },
              },
              error: {
                entry: "logWatchWorkspaceWarning",
                after: {
                  "2000": {
                    target: "gettingEvents",
                  },
                },
              },
            },
          },
          build: {
            initial: "idle",
            states: {
              idle: {
                on: {
                  START: "requestingStart",
                  STOP: "requestingStop",
                  ASK_DELETE: "askingDelete",
                  UPDATE: "requestingUpdate",
                  CANCEL: "requestingCancel",
                },
              },
              askingDelete: {
                on: {
                  DELETE: {
                    target: "requestingDelete",
                  },
                  CANCEL_DELETE: {
                    target: "idle",
                  },
                },
              },
              requestingUpdate: {
                entry: ["clearBuildError"],
                invoke: {
                  src: "updateWorkspace",
                  onDone: {
                    target: "idle",
                    actions: ["assignBuild"],
                  },
                  onError: [
                    {
                      target: "askingForMissedBuildParameters",
                      cond: "isMissingBuildParameterError",
                      actions: ["assignMissingParameters"],
                    },
                    {
                      target: "idle",
                      actions: ["assignBuildError"],
                    },
                  ],
                },
              },
              askingForMissedBuildParameters: {
                on: {
                  CANCEL: "idle",
                  UPDATE: "requestingUpdate",
                },
              },
              requestingStart: {
                entry: ["clearBuildError", "updateStatusToPending"],
                invoke: {
                  src: "startWorkspace",
                  id: "startWorkspace",
                  onDone: [
                    {
                      actions: ["assignBuild"],
                      target: "idle",
                    },
                  ],
                  onError: [
                    {
                      actions: "assignBuildError",
                      target: "idle",
                    },
                  ],
                },
              },
              requestingStop: {
                entry: ["clearBuildError", "updateStatusToPending"],
                invoke: {
                  src: "stopWorkspace",
                  id: "stopWorkspace",
                  onDone: [
                    {
                      actions: ["assignBuild"],
                      target: "idle",
                    },
                  ],
                  onError: [
                    {
                      actions: "assignBuildError",
                      target: "idle",
                    },
                  ],
                },
              },
              requestingDelete: {
                entry: ["clearBuildError", "updateStatusToPending"],
                invoke: {
                  src: "deleteWorkspace",
                  id: "deleteWorkspace",
                  onDone: [
                    {
                      actions: ["assignBuild"],
                      target: "idle",
                    },
                  ],
                  onError: [
                    {
                      actions: "assignBuildError",
                      target: "idle",
                    },
                  ],
                },
              },
              requestingCancel: {
                entry: [
                  "clearCancellationMessage",
                  "clearCancellationError",
                  "updateStatusToPending",
                ],
                invoke: {
                  src: "cancelWorkspace",
                  id: "cancelWorkspace",
                  onDone: [
                    {
                      actions: [
                        "assignCancellationMessage",
                        "displayCancellationMessage",
                      ],
                      target: "idle",
                    },
                  ],
                  onError: [
                    {
                      actions: "assignCancellationError",
                      target: "idle",
                    },
                  ],
                },
              },
            },
          },
          timeline: {
            initial: "gettingBuilds",
            states: {
              gettingBuilds: {
                invoke: {
                  src: "getBuilds",
                  onDone: [
                    {
                      actions: ["assignBuilds", "clearGetBuildsError"],
                      target: "loadedBuilds",
                    },
                  ],
                  onError: [
                    {
                      actions: "assignGetBuildsError",
                      target: "loadedBuilds",
                    },
                  ],
                },
              },
              loadedBuilds: {
                on: {
                  REFRESH_TIMELINE: {
                    target: "#workspaceState.ready.timeline.gettingBuilds",
                    cond: "moreBuildsAvailable",
                  },
                },
              },
            },
          },
          applications: {
            initial: "gettingApplicationsHost",
            states: {
              gettingApplicationsHost: {
                invoke: {
                  src: "getApplicationsHost",
                  onDone: {
                    target: "success",
                    actions: ["assignApplicationsHost"],
                  },
                  onError: {
                    target: "error",
                    actions: ["displayApplicationsHostError"],
                  },
                },
              },
              error: {
                type: "final",
              },
              success: {
                type: "final",
              },
            },
          },
          schedule: {
            invoke: {
              id: "scheduleBannerMachine",
              src: workspaceScheduleBannerMachine,
              data: {
                workspace: (context: WorkspaceContext) => context.workspace,
              },
            },
          },
        },
      },

      error: {
        on: {
          GET_WORKSPACE: {
            target: "gettingWorkspace",
          },
        },
      }
    },
  },
  {
    actions: {
      // Clear data about an old workspace when looking at a new one
      clearContext: () =>
        assign({
          workspace: undefined,
          template: undefined,
          build: undefined,
          permissions: undefined,
          eventSource: undefined,
        }),
      assignWorkspace: assign({
        workspace: (_, event) => event.data,
      }),
      assignGetWorkspaceError: assign({
        getWorkspaceError: (_, event) => event.data,
      }),
      clearGetWorkspaceError: (context) =>
        assign({ ...context, getWorkspaceError: undefined }),
      assignTemplate: assign({
        template: (_, event) => event.data,
      }),
      assignPermissions: assign({
        // Setting event.data as Permissions to be more stricted. So we know
        // what permissions we asked for.
        permissions: (_, event) => event.data as Permissions,
      }),
      assignGetPermissionsError: assign({
        checkPermissionsError: (_, event) => event.data,
      }),
      clearGetPermissionsError: assign({
        checkPermissionsError: (_) => undefined,
      }),
      assignBuild: assign({
        build: (_, event) => event.data,
      }),
      assignBuildError: assign({
        buildError: (_, event) => event.data,
      }),
      clearBuildError: assign({
        buildError: (_) => undefined,
      }),
      assignCancellationMessage: assign({
        cancellationMessage: (_, event) => event.data,
      }),
      clearCancellationMessage: assign({
        cancellationMessage: (_) => undefined,
      }),
      displayCancellationMessage: (context) => {
        if (context.cancellationMessage) {
          displaySuccess(context.cancellationMessage.message)
        }
      },
      assignCancellationError: assign({
        cancellationError: (_, event) => event.data,
      }),
      clearCancellationError: assign({
        cancellationError: (_) => undefined,
      }),
      // SSE related actions
      // open a new EventSource so we can stream SSE
      initializeEventSource: assign({
        eventSource: (context) =>
          context.workspace && API.watchWorkspace(context.workspace.id),
      }),
      closeEventSource: (context) =>
        context.eventSource && context.eventSource.close(),
      refreshWorkspace: assign({
        workspace: (_, event) => event.data,
      }),
      logWatchWorkspaceWarning: (_, event) => {
        console.error("Watch workspace error:", event)
      },
      assignGetTemplateWarning: assign({
        getTemplateWarning: (_, event) => event.data,
      }),
      displayGetTemplateWarning: () => {
        displayError(Language.getTemplateWarning)
      },
      clearGetTemplateWarning: assign({
        getTemplateWarning: (_) => undefined,
      }),
      // Timeline
      assignBuilds: assign({
        builds: (_, event) => event.data,
      }),
      assignGetBuildsError: assign({
        getBuildsError: (_, event) => event.data,
      }),
      clearGetBuildsError: assign({
        getBuildsError: (_) => undefined,
      }),
      // Applications
      assignApplicationsHost: assign({
        applicationsHost: (_, { data }) => data.host,
      }),
      displayApplicationsHostError: (_, { data }) => {
        const message = getErrorMessage(
          data,
          "Error getting the applications host.",
        )
        displayError(message)
      },
      // Optimistically update. So when the user clicks on stop, we can show
      // the "pending" state right away without having to wait 0.5s ~ 2s to
      // display the visual feedback to the user.
      updateStatusToPending: assign({
        workspace: ({ workspace }) => {
          if (!workspace) {
            throw new Error("Workspace not defined")
          }

          return {
            ...workspace,
            latest_build: {
              ...workspace.latest_build,
              status: "pending" as TypesGen.WorkspaceStatus,
            },
          }
        },
      }),
      assignMissingParameters: assign({
        missingParameters: (_, { data }) => {
          if (!(data instanceof API.MissingBuildParameters)) {
            throw new Error("data is not a MissingBuildParameters error")
          }
          return data.parameters
        },
      }),
    },
    guards: {
      moreBuildsAvailable,
      isMissingBuildParameterError: (_, { data }) => {
        return data instanceof API.MissingBuildParameters
      },
      canStart: (context) => {
        return context.workspace?.latest_build.status === 'running' ? false : true;
      }
    },
    services: {
      getWorkspace: async (_, event) => {
        return await API.getWorkspaceByOwnerAndName(
          event.username,
          event.workspaceName,
          {
            include_deleted: true,
          },
        )
      },
      getTemplate: async (context) => {
        if (context.workspace) {
          return await API.getTemplate(context.workspace.template_id)
        } else {
          throw Error("Cannot get template without workspace")
        }
      },
      updateWorkspace:
        ({ workspace }, { buildParameters }) =>
        async (send) => {
          if (!workspace) {
            throw new Error("Workspace is not set")
          }
          const build = await API.updateWorkspace(workspace, buildParameters)
          send({ type: "REFRESH_TIMELINE" })
          return build
        },
      startWorkspace: (context) => async (send) => {
        if (context.workspace) {
          const startWorkspacePromise = await API.startWorkspace(
            context.workspace.id,
            context.workspace.latest_build.template_version_id,
          )
          send({ type: "REFRESH_TIMELINE" })
          return startWorkspacePromise
        } else {
          throw Error("Cannot start workspace without workspace id")
        }
      },
      stopWorkspace: (context) => async (send) => {
        if (context.workspace) {
          const stopWorkspacePromise = await API.stopWorkspace(
            context.workspace.id,
          )
          send({ type: "REFRESH_TIMELINE" })
          return stopWorkspacePromise
        } else {
          throw Error("Cannot stop workspace without workspace id")
        }
      },
      deleteWorkspace: async (context) => {
        if (context.workspace) {
          const deleteWorkspacePromise = await API.deleteWorkspace(
            context.workspace.id,
          )
          send({ type: "REFRESH_TIMELINE" })
          return deleteWorkspacePromise
        } else {
          throw Error("Cannot delete workspace without workspace id")
        }
      },
      cancelWorkspace: (context) => async (send) => {
        if (context.workspace) {
          const cancelWorkspacePromise = await API.cancelWorkspaceBuild(
            context.workspace.latest_build.id,
          )
          send({ type: "REFRESH_TIMELINE" })
          return cancelWorkspacePromise
        } else {
          throw Error("Cannot cancel workspace without build id")
        }
      },
      listening: (context) => (send) => {
        if (!context.eventSource) {
          send({ type: "EVENT_SOURCE_ERROR", error: "error initializing sse" })
          return
        }

        context.eventSource.addEventListener("data", (event) => {
          // refresh our workspace with each SSE
          send({ type: "REFRESH_WORKSPACE", data: JSON.parse(event.data) })
          // refresh our timeline
          send({
            type: "REFRESH_TIMELINE",
            checkRefresh: true,
            data: JSON.parse(event.data),
          })
        })

        // handle any error events returned by our sse
        context.eventSource.addEventListener("error", (event) => {
          send({ type: "EVENT_SOURCE_ERROR", error: event })
        })

        // handle any sse implementation exceptions
        context.eventSource.onerror = () => {
          send({ type: "EVENT_SOURCE_ERROR", error: "sse error" })
        }
      },
      getBuilds: async (context) => {
        if (context.workspace) {
          // For now, we only retrieve the last month of builds to minimize
          // page bloat. We should add pagination in the future.
          return await API.getWorkspaceBuilds(
            context.workspace.id,
            dayjs().add(-30, "day").toDate(),
          )
        } else {
          throw Error("Cannot get builds without id")
        }
      },
      checkPermissions: async (context) => {
        if (context.workspace) {
          return await API.checkAuthorization({
            checks: permissionsToCheck(context.workspace),
          })
        } else {
          throw Error("Cannot check permissions workspace id")
        }
      },
      getApplicationsHost: async () => {
        return API.getApplicationsHost()
      },
      canStart: async () => {
        return 
      }
    },
  },
)
