import { z } from "zod";

export const abbreviatedPackumentSchema = z
  .object({
    name: z.string(),
    modified: z.string(),
    "dist-tags": z.object({ latest: z.string() }).catchall(z.string()),
    versions: z.record(
      z
        .object({
          name: z.string(),
          version: z.string(),
          dependencies: z.record(z.string()).optional().default({}),
          devDependencies: z.record(z.string()).optional().default({}),
        })
        .transform((data) => {
          return {
            ...data,
            id: `${data.name}@${data.version}`,
          };
        })
    ),
  })
  .transform((data) => {
    return {
      name: data.name,
      modifiedAt: data.modified,
      distTags: data["dist-tags"],
      versions: data.versions,
    };
  });

export type AbbreviatedPackument = z.infer<typeof abbreviatedPackumentSchema>;
