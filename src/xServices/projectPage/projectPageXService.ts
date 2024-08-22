import { getProjectbyName, changePermissionProject } from "api/api"
import { Project } from "api/typesGenerated"
import { displayError, displayMsg } from "components/GlobalSnackbar/utils"
import { actions, assign, createMachine } from "xstate"

export interface ProjectPageContext {
  project_data: Project
  project_name: string
  error?: unknown
  timeoutOpenWindow?: NodeJS.Timeout
  is_public: boolean
  refetch: () => void
}

export const projectPageMachine = createMachine(
  {
    id: "starterProject",
    schema: {
      context: {} as ProjectPageContext,
      events: {} as
      | { type: "CHANGEPERMISSION", is_public: boolean },
      services: {} as {
        loadStarterTemplate: {
          data: any
        },
        loadProject: {
          data: Project
        }
      },
    },
    tsTypes: {} as import("./projectPageXService.typegen").Typegen0,
    initial: "loading",
    states: {
      loading: {
        invoke: {
          src: "loadProject",
          onDone: {
            actions: ["assignProject"],
            target: "waiting",
          },
          onError: {
            actions: ["assignError"],
            target: "idle.error",
          },
        },
      },
      waiting: {
        on: {
          CHANGEPERMISSION: {
            target: "changingPermission",
            actions: ["assignIsPublic"]
          },
        },
      },
      changingPermission: {
        invoke: {
          src: "changePermission",
          onDone: {
            target: "loading",
            actions: ['showChangeSuccess']
          },
        }
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
      loadProject: async ({project_name}) => {
        const project = await getProjectbyName(project_name)
        return project
      },
      changePermission: async ({project_data, is_public, refetch}) => {
        const response = await changePermissionProject(project_data.id, is_public)
        refetch()
        return response
      },
    },
    actions: {
      assignError: assign({
        error: (_, { data }) => data,
      }),
      assignProject: assign({
        project_data: (_, event) => event.data,
        is_public: (_, event) => event.data.me ? event.data.me.is_public : event.data.owner.is_public,
      }),
      assignIsPublic: assign({
        is_public: (_, event) => event.is_public,
      }),
      showChangeSuccess: async (context, _) => {
        displayMsg("Đã thay đổi link codespace")
        const project = await getProjectbyName(context.project_name)
        if (context.timeoutOpenWindow) {
          clearTimeout(context.timeoutOpenWindow)
        }
        context.timeoutOpenWindow = setTimeout(() => {
          window.open(`${project.me ? project.me.code_path : project.owner.code_path}`, '_blank');
        }, 2000)
        console.log(+context.timeoutOpenWindow)
      }
    },
  },
)
