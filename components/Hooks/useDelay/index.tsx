import { useCallback, useState, useRef } from "react";

export type SetState = (state: boolean) => void;

const useDelay = (
  initialState: boolean,
  delay: number,
  immediate: boolean
): [boolean, SetState] => {
  const [state, setState] = useState(!!initialState);
  const timeoutIdRef = useRef<number | null>(null);

  const setDelayState = useCallback(
    (nextState: boolean | ((prevState: boolean) => boolean)) => {
      if (!!nextState) {
        // 如果设置了立即执行且没有正在执行的timeout
        const invokeNow = immediate && !timeoutIdRef.current;
        if (timeoutIdRef.current !== null) {
          // 如果有等待的延迟，取消它
          clearTimeout(timeoutIdRef.current);
        }
        // 设置新的延迟
        timeoutIdRef.current = window.setTimeout(() => {
          // 没有设置立即执行，则不执行
          !invokeNow && setState(!!nextState);
          timeoutIdRef.current = null; // 延迟完成后，清除引用
        }, delay);

        if (invokeNow) {
          console.log("nextState", nextState);

          setState(!!nextState);
        }
      } else {
        console.log("false-nextState", nextState);

        setState(!!nextState);
      }
    },
    [delay, immediate]
  );

  return [state, setDelayState];
};

export default useDelay;
