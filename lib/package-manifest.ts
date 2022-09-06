import { z } from "zod";

export const packageManifestSchema = z
  .object({
    _id: z.string(),
    name: z.string(),
    version: z.string(),
    description: z.string().optional(),
    dependencies: z.record(z.string()).optional().default({}),
    devDependencies: z.record(z.string()).optional().default({}),
  })
  .transform((manifest) => {
    const { _id, ...rest } = manifest;
    return {
      id: manifest._id,
      ...rest,
    };
  });

export type PackageManifest = z.infer<typeof packageManifestSchema>;
