import squash from "just-squash";

/**
 * @param slug the slug list parsed by Next.js
 * @returns a sorted list of unique package names and/or package version IDs
 */
const parseSlugPackageIds = (slug: string[]): string[] => {
  return Array.from(
    new Set(
      slug
        // The slug contains packages already split by `/`
        // if scoped packages like `@foo/bar` are present.
        // We also split by `,`, which is used to separate multiple packages.
        // For example, `aaa,@foo/bbb` becomes `['aaa', '@foo', 'bbb']`,
        // resulting in a list of either bare names (`aaa`), scopes (`@foo`)
        // or scoped names (`bbb`).
        .flatMap((part) => part.split(","))
        // Rebuild package names from their parts.
        .flatMap((rawPart, index, parts) => {
          const part = squash(rawPart, true);
          // Ignore empty parts or scopes (`@foo`), which we add below.
          if (part === "" || part.startsWith("@")) {
            return [];
          }
          // If this bare name (`bbb`) is preceded by a scope (`@foo`),
          // then return the scoped package name (`@foo/bbb`).
          const prevPart = squash(parts[index - 1] ?? "", true);
          if (prevPart.startsWith("@")) {
            return `${prevPart}/${part}`;
          }
          // Return the bare package name (`aaa`).
          return part;
        })
    )
  ).sort((a, b) => a.localeCompare(b));
};

export default parseSlugPackageIds;
