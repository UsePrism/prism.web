/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';

export const reSizeField = (textAreaRef: any, value: any) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = '0px';

      const { scrollHeight } = textAreaRef;
      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.style.height = `${scrollHeight}px`;
    }
  }, [textAreaRef, value]);
};