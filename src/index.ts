import { interpret, State } from 'xstate'
import type { StateMachine, Interpreter, InterpreterOptions } from 'xstate'
import { markRaw, ref } from 'vue'

export type StoredService<M> = M extends StateMachine<
  infer Context,
  infer Schema,
  infer Event,
  infer State,
  infer _A,
  infer _B,
  infer _C
>
  ? Interpreter<Context, Schema, Event, State>
  : never

function xstate<M extends StateMachine<any, any, any, any, any, any, any>>(
  machine: M,
  interpreterOptions?: InterpreterOptions,
  initialState = machine.initialState,
) {
  const service = interpret(machine, interpreterOptions)
  return () => {
    const state = ref(initialState)
    service
      .onTransition((nextState) => {
        const initialStateChanged =
          nextState.changed === undefined &&
          Object.keys(nextState.children).length

        if (nextState.changed || initialStateChanged) {
          state.value = nextState
        }
      })
      .start(State.create(initialState))
    return markRaw(service) as StoredService<M>
  }
}

export default xstate
