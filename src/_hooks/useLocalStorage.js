import React from "react";

const PREFIX = "CHATAPP-";

export default function useLocalStorage(key = "", initialValue = "") {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = React.useState(() => {
    const JsonValue = localStorage.getItem(prefixedKey);

    if (JsonValue !== null) {
      return JSON.parse(JsonValue);
    }

    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  React.useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
