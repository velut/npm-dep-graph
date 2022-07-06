import type { NextPage } from "next";
import SearchInput from "../components/SearchInput";

const IndexPage: NextPage = () => {
  return (
    <div className="p-8">
      <SearchInput />
    </div>
  );
};

export default IndexPage;
