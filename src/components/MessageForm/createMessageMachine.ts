import {createMachine} from 'xstate'

export const createMessageMachine = createMachine({
  id: 'createMessage',
  initial: 'idle',
  states: {
    idle: {
      on: {
        SUBMIT: `waitingForConfirmation`,
      },
    },
    waitingForConfirmation: {
      invoke: {
        id: 'confirm',
        onDone: 'waitingForTransaction',
        src: 'confirmTransaction',
      },
      meta: {
        loadingText: 'Waiting for confirmation',
      },
    },
    waitingForTransaction: {
      invoke: {
        id: 'confirm',
        onDone: {
          actions: 'resetForm',
          target: 'idle',
        },
        src: 'confirmMined',
      },
      meta: {
        loadingText: 'Waiting transaction to be mined',
      },
    },
  },
})
