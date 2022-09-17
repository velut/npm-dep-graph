import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import getPackagePageStaticProps, {
  PackagePageProps,
} from "../../lib/get-package-page-static-props";

const SigmaGraph = dynamic(() => import("../../components/SigmaGraph"), {
  ssr: false,
});

const PackagePage = (props: PackagePageProps) => {
  useEffect(() => {
    console.log(JSON.stringify(props, null, 2));
  }, [props]);

  return (
    <div>
      ok
      <div>
        <SigmaGraph graph={props.graph} />
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
