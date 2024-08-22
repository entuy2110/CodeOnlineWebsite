import { getTemplateExamples, getUser } from "api/api"
import { JoinWorkspaceResponse, TemplateExample, Workspace } from "api/typesGenerated"
import { assign, createMachine } from "xstate"
import { useMe } from "hooks/useMe"

export interface WorkspacePageContext {
  joinWorkspaces: JoinWorkspaceResponse[] | unknown
  user_id: string
  error?: unknown
}

export const workspacePageMachine = createMachine(
  {
    id: "starterTemplate",
    schema: {
      context: {} as WorkspacePageContext,
      services: {} as {
        loadStarterTemplate: {
          data: any
        }
      },
    },
    tsTypes: {} as import("./workspacePageXService.typegen").Typegen0,
    initial: "loading",
    states: {
      loading: {
        invoke: {
          src: "loadUser",
          onDone: {
            actions: ["assignUser"],
            target: "idle.ok",
          },
          onError: {
            actions: ["assignError"],
            target: "idle.error",
          },
        },
      },
      idle: {
        initial: "ok",
        states: {
          ok: { type: "final" },
          error: { type: "final" },
        },
      },
    },
  },
  {
    services: {
      loadUser: async () => {
        const user = await getUser()
        return user.joins
      },
    },
    actions: {
      assignError: assign({
        error: (_, { data }) => data,
      }),
      assignUser: assign({
        joinWorkspaces: (_, { data }) => data,
      }),
    },
  },
)
