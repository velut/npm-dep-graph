import { GetStaticPropsResult } from "next";
import parseSlugPackages from "./parse-slug-packages";
import resolvePackageIds from "./resolve-package-ids";
import uniquePackages from "./unique-packages";

export interface PackagePageProps {
  [key: string]: unknown;
}

const getPackagePageStaticProps = async (
  slug: string[]
): Promise<GetStaticPropsResult<PackagePageProps>> => {
  const route = slug.join("/");
  const parsedPackages = parseSlugPackages(slug);
  const resolvedPackages = await resolvePackageIds(parsedPackages);
  const packages = uniquePackages(resolvedPackages);
  const canonicalRoute = packages.join(",");
  if (route !== canonicalRoute) {
    return {
      redirect: {
        destination: `/package/${canonicalRoute}`,
        permanent: false,
      },
    };
  }
  return { props: { slug, parsedPackages, packages, route, canonicalRoute } };
};

export default getPackagePageStaticProps;
