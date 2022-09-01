const parseSlugPackages = (slug: string[]) => {
  return (
    slug
      // The slug contains packages already split by `/`,
      // this happens when scoped packages like `@foo/bar` are present.
      // Now we also split by `,`, which is used to separate multiple packages,
      // for example `@foo/bar,baz`.
      // The result is a list of either bare names (`baz`), scopes (`@foo`)
      // or scoped names (`bar`).
      .flatMap((part) => part.split(","))
      // Rebuild package names from their parts.
      .flatMap((part, index, parts) => {
        // Ignore scopes, we add them later with the name.
        if (part.startsWith("@")) {
          return [];
        }
        // If this bare name (`bar`) was preceded by a scope (`@foo`),
        // then return the scoped package name (`@foo/bar`).
        const prevPart = parts[index - 1];
        const isScopedName = prevPart?.startsWith("@") ?? false;
        if (isScopedName) {
          return `${prevPart}/${part}`;
        }
        // Return the normal package name (`baz`).
        return part;
      })
      .sort((a, b) => a.localeCompare(b))
  );
};

export default parseSlugPackages;
