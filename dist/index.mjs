// src/index.ts
import { interpret, State } from "xstate";
import { markRaw, ref } from "vue";
function xstate(machine, interpreterOptions, initialState = machine.initialState) {
  const service = interpret(machine, interpreterOptions);
  return () => {
    const state = ref(initialState);
    service.onTransition((nextState) => {
      const initialStateChanged = nextState.changed === void 0 && Object.keys(nextState.children).length;
      if (nextState.changed || initialStateChanged) {
        state.value = nextState;
      }
    }).start(State.create(initialState));
    return {
      state,
      send: markRaw(service.send),
      service: markRaw(service)
    };
  };
}
var src_default = xstate;
export {
  src_default as default
};
