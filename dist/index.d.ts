import { StateMachine, Interpreter, InterpreterOptions, State } from 'xstate';
import { Ref } from 'vue';

type Store<M> = M extends StateMachine<infer Context, infer Schema, infer Event, infer State, infer _A, infer _B, infer _C> ? {
    state: Ref<Interpreter<Context, Schema, Event, State>['state']>;
    send: Interpreter<Context, Schema, Event, State>['send'];
    service: Interpreter<Context, Schema, Event, State>;
} : never;
declare function xstate<M extends StateMachine<any, any, any, any, any, any, any>>(machine: M, interpreterOptions?: InterpreterOptions, initialState?: State<any, any, any, any, any>): () => Store<M>;

export { Store, xstate as default };
