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
