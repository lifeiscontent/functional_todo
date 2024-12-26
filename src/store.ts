export type Store<State, Action> = {
  getState: () => Readonly<State>;
  subscribe: (dispatch: (action: Action) => void) => void;
};
