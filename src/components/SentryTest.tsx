import React, { useEffect, useState } from 'react';

export const SentryTest = () => {
  const [state, setState] = useState({
    raiseErrorInUseEffectHook: null,
  });

  useEffect(() => {
    if (state.raiseErrorInUseEffectHook) {
      throw new Error('Error in useEffect Hook');
    }
  }, [state.raiseErrorInUseEffectHook]);

  return (
    <button
      onClick={() =>
        setState(current => ({
          ...current,
          raiseErrorInUseEffectHook: '1',
        }))
      }
    >
      Raise an error
    </button>
  );
};
