import { GetStaticPaths, GetStaticProps } from "next";
import getPackagePageStaticProps, {
  PackagePageProps,
} from "../../lib/get-package-page-static-props";

const PackagesPage = (props: PackagePageProps) => {
  return (
    <div>
      <h1 className="font-bold text-center">Packages Page</h1>

      <pre className="mt-12">
        <code>{JSON.stringify(props, null, 2)}</code>
      </pre>
    </div>
  );
};

export default PackagesPage;

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<PackagePageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string[];
  return getPackagePageStaticProps(slug);
};
