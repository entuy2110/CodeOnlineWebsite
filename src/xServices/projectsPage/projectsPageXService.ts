import { deleteProject, getUser, joinProject } from "api/api"
import { User_2 } from "api/typesGenerated"
import { displaySuccess } from "components/GlobalSnackbar/utils"
import { assign, createMachine } from "xstate"

export interface ProjectsPageContext {
  user_data: User_2
  user_id: string
  error?: unknown
  access_code: string
  project_id: string
  project_name?: string
  message: string
}

export const projectsPageMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5SwC4EMBOKwYCpgFsAHAGzWwDoSB7NCASwDsoBiCaxsCpgN2oGsuqTNjyFS5LjTpMoCXtQDG5ehwDaABgC6mrYlBFqseilWN9IAB6IATAGYAHBTsA2GwFYAjABZvnhzbe7gCcNgA0IACeiP42FO7eGkl2niEudikAvpkRwlg4+MRklNIMzCw4GNQYFBIoAGbVBBR5ooV1UrRlcgrKpurauhaGxv3mSFa2js5uXr6xQaER0Qh2AOxxa8FJLg6eNjb7vtm56PliRZIUAO5oJrIsAFIA8gCSAHIACgBKz48AogBhXBDCYje4cCzWBDucJRRBrXzxVIabawgIuY45ECtAriYpcDiPahMRiyT5VABWYEUKDYHC4CkELTObXxVyJJMYZOYFOo1Np8kYfD6Zl0oIMRgh41A0Lcy0QLmCawoGhRDl2AQ162y2MY1AgcAsuIuHWGUrGUMQAFoXAqEMF3Kq7MFXW73cFvCccay8ZcSl1ZObRmYrQhvHCVnZvMEKD5koiHAlEZjvSb2gSbndTMxg9Kwy7vBQXO5kq4AtGY-abBonWrSxobA41lt7Em077TZnOaTyVSaSg85aJtD7J4KDY1qXAm4tu4XJ57WsUvFl94lVOI947O4OyI-R0KGBGBAh6GR4h1rGURoMrt7L5gtWgsjS541esbKEHA49+cM1cx4QBQAhnpCF7hpOcYNneFaPvaGR2KqKIeGODgaGsDheti6bspQQFHhgVQYGBMqTJBsYlmW96Vk+8KrJ6yGlvOtbLjuawuLqmRAA */
    id: "starterTemplate",
    schema: {
      context: {} as ProjectsPageContext,
      events: {} as
          | { type: "JOINPROJECT", access_code: string }
          | { type: "DELETEPROJECT", project_id: string, message: string},
      services: {} as {
        loadStarterTemplate: {
          data: any
        },
        loadUser: {
          data: User_2
        },
        joinProject: {
          data: string
        },
      },
    },
    tsTypes: {} as import("./projectsPageXService.typegen").Typegen0,
    initial: "loading",
    states: {
      loading: {
        invoke: {
          src: "loadUser",
          onDone: {
            actions: ["assignUser"],
            target: "waiting",
          },
          onError: {
            actions: ["assignError"],
            target: "end.error",
          },
        },
      },
      waiting: {
        on: {
          JOINPROJECT: {
            target: "onJoinningProject",
            actions: ["assignAccessCode"]
          },
          DELETEPROJECT: {
            target: "onDeletingProject",
            actions: ["assignProjectId"]
          },
        },
      },
      onJoinningProject: {
        invoke: {
          src: "joinProject",
          onDone: {
            actions: ["assignProjectName"],
            target: "end.joined",
          },
        }
      },
      onDeletingProject: {
        invoke: {
          src: "deleteProject",
          onDone: {
            target: "loading",
          },
        }
      },
      end: {
        initial: "ok",
        states: {
          ok: { type: "final" },
          error: { type: "final" },
          joined: { type: "final" }
        },
      },
    },
  },
  {
    services: {
      loadUser: async () => {
        const user = await getUser()
        return user
      },
      joinProject: async ({access_code, user_id}) => {
        const project_name = await joinProject(access_code, user_id)
        return project_name
      },
      deleteProject: async ({project_id, message}, _) => {
        await deleteProject(project_id)
        displaySuccess(message)
      }
    },
    actions: {
      assignError: assign({
        error: (_, { data }) => data,
      }),
      assignUser: assign({
        user_data: (_, event) => event.data,
      }),
      assignAccessCode: assign({
        access_code: (_, event) => event.access_code,
      }),
      assignProjectId: assign({
        project_id: (_, event) => event.project_id,
        message: (_, event) => event.message,
      }),
      assignProjectName: assign({
        project_name: (_, event) => event.data,
      }),
    },
  },
)
