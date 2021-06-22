import _isEqual from "lodash/isEqual";
import React, { useEffect, useRef } from "react";

export const usePrevious = ({ data, cb = () => {} }) => {
  const prevData = previous(data);
  const mounted = React.useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (!_isEqual(prevData, data)) {
        cb(data);
      }
    }
  });
};

function previous(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
