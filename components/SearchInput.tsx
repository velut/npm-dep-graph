import { clsx } from "clsx";
import { useAtom } from "jotai";
import { searchInputAtom } from "../lib/search-input-atom";

const SearchInput = () => {
  const [query, setQuery] = useAtom(searchInputAtom);

  return (
    <div>
      <label className="sr-only" htmlFor="search-input">
        Find a package
      </label>

      <input
        className={clsx("h-10 w-full font-mono")}
        id="search-input"
        type="search"
        placeholder="Find a package..."
        spellCheck="false"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
    </div>
  );
};

export default SearchInput;
