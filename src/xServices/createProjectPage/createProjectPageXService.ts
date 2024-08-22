import { getAllLanguagePrograms, createProject } from "api/api"
import { GetAllLanguageProgramsResponse, CreateProjectRequest } from "api/typesGenerated"
import { assign, createMachine } from "xstate"


type CreateProjectEvent = {
  type: "CREATE_PROJECT"
  request: CreateProjectRequest
}

export interface CreateProjectPageContext {
  languagePrograms?: GetAllLanguageProgramsResponse[] 
  error?: unknown
  createProjectRequest: CreateProjectRequest
}

export const createProjectPageMachine = createMachine(
  {
    id: "starterTemplate",
    schema: {
      context: {} as CreateProjectPageContext,
      events: {} as 
        | CreateProjectEvent,
      services: {} as {
        gettingLanguageProgram: {
          data: any
        }
      },
    },
    tsTypes: {} as import("./createProjectPageXService.typegen").Typegen0,
    initial: "loading",
    states: {
      loading: {
        invoke: {
          src: "gettingLanguageProgram",
          onDone: {
            actions: ["assignLanguageProgram"],
            target: "fillingParams",
          },
          onError: {
            actions: ["assignError"],
            target: "idle.error",
          },
        },
      },
      fillingParams: {
        on: {
          CREATE_PROJECT: {
            actions: ["assignCreateProjectRequest"],
            target: "creatingProject",
          }
        }, 
      },
      creatingProject: {
        invoke: {
          src: "createProject",
          id: "createProject",
          onDone: {
            target: "idle.ok",
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
      gettingLanguageProgram: async () => {
        const languagePrograms = await getAllLanguagePrograms()
        return languagePrograms
      },
      createProject: async (context) => {
        const { createProjectRequest } = context
        return await createProject(createProjectRequest)
      },
    },
    actions: {
      assignError: assign({
        error: (_, { data }) => data,
      }),
      assignLanguageProgram: assign({
        languagePrograms: (_, { data }) => data,
      }),
      assignCreateProjectRequest: assign({
        createProjectRequest: (_, event) => event.request,
      })
    },
  },
)
