import bookHalf from "@iconify/icons-bi/book-half";
import filetypeJson from "@iconify/icons-bi/filetype-json";
import squareGit from "@iconify/icons-fa6-brands/square-git";
import npmIcon from "@iconify/icons-file-icons/npm";
import packageIcon from "@iconify/icons-fluent-emoji-high-contrast/package";
import { Package } from "../lib/package";
import IconLink from "./IconLink";

const PackageExternalLinks = ({ pkg }: { pkg: Package }) => {
  return (
    <div className="flex justify-between gap-1">
      <IconLink
        href={`https://www.npmjs.com/package/${pkg.name}/v/${pkg.version}`}
        title={`View package ${pkg.name} on npm`}
        icon={npmIcon}
      />

      <IconLink
        href={`https://github.com/TODO:`}
        title={`View repository for package ${pkg.name}`}
        icon={squareGit}
      />

      <IconLink
        href={`https://www.jsdocs.io/package/${pkg.name}/v/${pkg.version}`}
        title={`View documentation for package ${pkg.name} on jsDocs.io`}
        icon={bookHalf}
      />

      <IconLink
        href={`https://registry.npmjs.org/${pkg.name}/${pkg.version}`}
        title={`View manifest for package ${pkg.name} on npm`}
        icon={filetypeJson}
      />

      <IconLink
        href={`https://unpkg.com/browse/${pkg.id}/`}
        title={`View contents for package ${pkg.name} on unpkg`}
        icon={packageIcon}
      />
    </div>
  );
};

export default PackageExternalLinks;
