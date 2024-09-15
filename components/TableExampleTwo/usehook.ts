// import { useCallback, useState } from 'react';
// import { isFunction } from '../utils';

// export type SetState<S extends Record<string, any>> = <K extends keyof S>(
//   state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | S | null),
// ) => void;

// const useSetState = <S extends Record<string, any>>(
//   initialState: S | (() => S),
// ): [S, SetState<S>] => {
//   const [state, setState] = useState<S>(initialState);

//   const setMergeState = useCallback((patch) => {
//     setState((prevState) => {
//       const newState = isFunction(patch) ? patch(prevState) : patch;
//       return newState ? { ...prevState, ...newState } : prevState;
//     });
//   }, []);

//   return [state, setMergeState];
// };

// export default useSetState;
import { useMemo, useState } from 'react';

export interface Actions<T> {
  setLeft: () => void;
  setRight: () => void;
  set: (value: T) => void;
  toggle: () => void;
}

function useToggle<T = boolean>(): [boolean, Actions<T>];

function useToggle<T>(defaultValue: T): [T, Actions<T>];

function useToggle<T, U>(defaultValue: T, reverseValue: U): [T | U, Actions<T | U>];

function useToggle<D, R>(defaultValue: D = false as unknown as D, reverseValue?: R) {
  const [state, setState] = useState<D | R>(defaultValue);

  const actions = useMemo(() => {
    const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue) as D | R;

    const toggle = () => setState((s) => (s === defaultValue ? reverseValueOrigin : defaultValue));
    const set = (value: D | R) => setState(value);
    const setLeft = () => setState(defaultValue);
    const setRight = () => setState(reverseValueOrigin);

    return {
      toggle,
      set,
      setLeft,
      setRight,
    };
    // useToggle ignore value change
    // }, [defaultValue, reverseValue]);
  }, []);

  return [state, actions];
}



export interface Actions1 {
  setTrue: () => void;
  setFalse: () => void;
  set: (value: boolean) => void;
  toggle: () => void;
}

export default function useBoolean(defaultValue = false): [boolean, Actions1] {
  const [state, { toggle, set }] = useToggle(!!defaultValue);

  const actions: Actions1 = useMemo(() => {
    const setTrue = () => set(true);
    const setFalse = () => set(false);
    return {
      toggle,
      set: (v: any) => set(!!v),
      setTrue,
      setFalse,
    };
  }, []);

  return [state, actions];
}



