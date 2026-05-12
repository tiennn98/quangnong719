import React from 'react';

export const navigationRef = React.createRef<any>();

export function goBack() {
  navigationRef.current?.goBack();
}

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function replace(name: string, params?: any) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name, params}],
  });
}

export function waitForNavigationReady(timeoutMs = 8000): Promise<boolean> {
  return new Promise(resolve => {
    const start = Date.now();
    const tick = () => {
      const ref: any = navigationRef.current;
      const ready =
        !!ref && (typeof ref.isReady === 'function' ? ref.isReady() : true);
      if (ready) {
        resolve(true);
        return;
      }
      if (Date.now() - start > timeoutMs) {
        resolve(false);
        return;
      }
      setTimeout(tick, 100);
    };
    tick();
  });
}
