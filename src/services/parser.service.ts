import { createRegExp, charNotIn, global, oneOrMore } from "magic-regexp";

function parseParameters(text: string): string[] {
  const parameterRegex = createRegExp(
    oneOrMore(charNotIn(" \t\r\n{{")).before("}}").after("{{"),
    [global],
  );
  const matches = text.matchAll(parameterRegex);

  if (!matches) {
    return [];
  }
  const parameters: string[] = [];
  for (const match of matches) {
    const value = match[0];

    if (!value) {
      continue;
    }

    if (parameters.includes(value.trim())) {
      continue;
    }

    parameters.push(value);
  }

  return parameters;
}

export { parseParameters };
