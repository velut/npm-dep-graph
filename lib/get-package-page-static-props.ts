import { GetStaticPropsResult } from "next";
import parseSlugPackages from "./parse-slug-packages";
import resolvePackages from "./resolve-packages";

export interface PackagePageProps {
  [key: string]: unknown;
}

const getPackagePageStaticProps = async (
  slug: string[]
): Promise<GetStaticPropsResult<PackagePageProps>> => {
  const parsedPackages = parseSlugPackages(slug);
  const packages = await resolvePackages(parsedPackages);
  const originalRoute = slug.join("/");
  const canonicalRoute = packages.join(",");
  if (originalRoute !== canonicalRoute) {
    return {
      redirect: {
        destination: `/package/${canonicalRoute}`,
        permanent: false,
      },
    };
  }
  return {
    props: {
      packages,
    },
  };
};

export default getPackagePageStaticProps;
