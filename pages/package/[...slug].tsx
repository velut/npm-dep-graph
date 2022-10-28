import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect } from "react";
import PackageGraph from "../../components/PackageGraph";
import RootPackages from "../../components/RootPackages";
import getPackagePageStaticProps, {
  PackagePageProps,
} from "../../lib/get-package-page-static-props";

const PackagePage = (props: PackagePageProps) => {
  useEffect(() => {
    console.log(JSON.stringify(props, null, 2));
  }, [props]);

  return (
    <div>
      <PackageGraph serializedGraph={props.serializedGraph} />
      <div className="px-3 mt-9">
        <RootPackages rootPackages={props.rootPackages} />
      </div>
    </div>
  );
};

export default PackagePage;

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<PackagePageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string[];
  return getPackagePageStaticProps(slug);
};
