function parseParameters(text: string): string[] {
  const parameterRegex = /{{([^\s{}]+)}}/g;
  const matches = text.matchAll(parameterRegex);

  if (!matches) {
    return [];
  }
  const parameters: string[] = [];
  for (const match of matches) {
    const value = match[1].trim();

    if (parameters.includes(value)) {
      continue;
    }

    parameters.push(value);
  }

  return parameters;
}

export { parseParameters };
