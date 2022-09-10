import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import getPackagePageStaticProps, {
  PackagePageProps,
} from "../../lib/get-package-page-static-props";

const Mermaid = dynamic(() => import("../../components/Mermaid"), {
  ssr: false,
});

const PackagesPage = (props: PackagePageProps) => {
  useEffect(() => {
    console.log(JSON.stringify(props, null, 2));
    console.log(props.dependenciesDiagram);
    console.log(props.dependenciesDiagram.length);
  }, [props]);

  return (
    <div>
      <Mermaid diagram={props.dependenciesDiagram} />
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
