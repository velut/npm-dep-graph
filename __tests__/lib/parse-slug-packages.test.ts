import parseSlugPackages from "../../lib/parse-slug-packages";

const slug = (s: string): string[] => {
  return s.split("/");
};

describe("parseSlugPackages", () => {
  it("empty array", () => {
    expect(parseSlugPackages([])).toEqual([]);
  });
  it("empty slug", () => {
    expect(parseSlugPackages(slug(""))).toEqual([]);
  });
  it("wrong slugs", () => {
    expect(parseSlugPackages(slug(" "))).toEqual([]);
    expect(parseSlugPackages(slug("/"))).toEqual([]);
    expect(parseSlugPackages(slug("///"))).toEqual([]);
    expect(parseSlugPackages(slug("@aaa/@aaa"))).toEqual([]);
    expect(parseSlugPackages(slug("@aaa/@aaa,bbb"))).toEqual(["@aaa/bbb"]);
    expect(parseSlugPackages(slug("aaa/aaa"))).toEqual(["aaa"]);
    expect(parseSlugPackages(slug("aaa/aaa@1.0.0/bbb"))).toEqual([
      "aaa",
      "aaa@1.0.0",
      "bbb",
    ]);
    expect(parseSlugPackages(slug("aaa/bbb"))).toEqual(["aaa", "bbb"]);
    expect(parseSlugPackages(slug("aaa/@bbb"))).toEqual(["aaa"]);
    expect(parseSlugPackages(slug("aaa/@bbb/ccc"))).toEqual([
      "@bbb/ccc",
      "aaa",
    ]);
    expect(parseSlugPackages(slug("aaa@,@bbb/ccc@"))).toEqual([
      "@bbb/ccc@",
      "aaa@",
    ]);
  });
  it("bare package", () => {
    expect(parseSlugPackages(slug("foobar"))).toEqual(["foobar"]);
  });
  it("bare package with version", () => {
    expect(parseSlugPackages(slug("foobar@1.0.0"))).toEqual(["foobar@1.0.0"]);
  });
  it("bare package with spaces around version prefix", () => {
    expect(parseSlugPackages(slug("foobar @ 1.0.0"))).toEqual(["foobar@1.0.0"]);
  });
  it("bare package with version prefix but missing version", () => {
    expect(parseSlugPackages(slug("foobar@"))).toEqual(["foobar@"]);
  });
  it("scoped package", () => {
    expect(parseSlugPackages(slug("@foo/bar"))).toEqual(["@foo/bar"]);
  });
  it("scoped package with version", () => {
    expect(parseSlugPackages(slug("@foo/bar@1.0.0"))).toEqual([
      "@foo/bar@1.0.0",
    ]);
  });
  it("scoped package with spaces around version prefix", () => {
    expect(parseSlugPackages(slug("@foo/bar @ 1.0.0"))).toEqual([
      "@foo/bar@1.0.0",
    ]);
  });
  it("scoped package with version prefix but missing version", () => {
    expect(parseSlugPackages(slug("@foo/bar@"))).toEqual(["@foo/bar@"]);
  });
  it("multiple bare packages", () => {
    expect(
      parseSlugPackages(slug("aaa,bbb,ccc,ddd.js,eee-ts,fff_v2,2022,123go"))
    ).toEqual([
      "123go",
      "2022",
      "aaa",
      "bbb",
      "ccc",
      "ddd.js",
      "eee-ts",
      "fff_v2",
    ]);
  });
  it("multiple bare packages with spacing", () => {
    expect(
      parseSlugPackages(slug("  aaa, bbb, ccc ,  ddd  ,eee,fff  "))
    ).toEqual(["aaa", "bbb", "ccc", "ddd", "eee", "fff"]);
  });
  it("multiple bare packages with version", () => {
    expect(parseSlugPackages(slug("aaa@1.0.0,bbb@2.0.0,ccc@3.0.0"))).toEqual([
      "aaa@1.0.0",
      "bbb@2.0.0",
      "ccc@3.0.0",
    ]);
  });
  it("multiple bare packages, some with version", () => {
    expect(parseSlugPackages(slug("aaa@1.0.0,bbb,ccc@3.0.0,ddd"))).toEqual([
      "aaa@1.0.0",
      "bbb",
      "ccc@3.0.0",
      "ddd",
    ]);
  });
  it("multiple bare packages with spacing, some with version", () => {
    expect(
      parseSlugPackages(slug("aaa@1.0.0 , bbb  ,  ccc@3.0.0, ddd"))
    ).toEqual(["aaa@1.0.0", "bbb", "ccc@3.0.0", "ddd"]);
  });
  it("multiple scoped packages", () => {
    expect(
      parseSlugPackages(
        slug(
          "@foo/aaa,@foo/bbb,@foo/ccc,@foo/ddd.js,@foo/eee-ts,@foo/fff_v2,@foo/123go,@foo/2022"
        )
      )
    ).toEqual([
      "@foo/123go",
      "@foo/2022",
      "@foo/aaa",
      "@foo/bbb",
      "@foo/ccc",
      "@foo/ddd.js",
      "@foo/eee-ts",
      "@foo/fff_v2",
    ]);
  });
  it("multiple scoped packages with spacing", () => {
    expect(
      parseSlugPackages(slug("  @foo/aaa, @foo/bbb  ,  @foo/ccc  "))
    ).toEqual(["@foo/aaa", "@foo/bbb", "@foo/ccc"]);
  });
  it("multiple scoped packages with version", () => {
    expect(
      parseSlugPackages(slug("@foo/aaa@1.0.0,@foo/bbb@2.0.0,@foo/ccc@3.0.0"))
    ).toEqual(["@foo/aaa@1.0.0", "@foo/bbb@2.0.0", "@foo/ccc@3.0.0"]);
  });
  it("multiple scoped packages, some with version", () => {
    expect(
      parseSlugPackages(slug("@foo/aaa@1.0.0,@foo/bbb,@foo/ccc@3.0.0,@foo/ddd"))
    ).toEqual(["@foo/aaa@1.0.0", "@foo/bbb", "@foo/ccc@3.0.0", "@foo/ddd"]);
  });
  it("multiple scoped packages with spacing, some with version", () => {
    expect(
      parseSlugPackages(
        slug("  @foo/aaa@1.0.0 , @foo/bbb,   @foo/ccc@3.0.0,@foo/ddd  ")
      )
    ).toEqual(["@foo/aaa@1.0.0", "@foo/bbb", "@foo/ccc@3.0.0", "@foo/ddd"]);
  });
  it("mixed bare and scoped packages", () => {
    expect(parseSlugPackages(slug("aaa,@foo/aaa,bbb,@foo/bbb"))).toEqual([
      "@foo/aaa",
      "@foo/bbb",
      "aaa",
      "bbb",
    ]);
    expect(parseSlugPackages(slug("@foo/aaa,bbb,@foo/bbb,aaa"))).toEqual([
      "@foo/aaa",
      "@foo/bbb",
      "aaa",
      "bbb",
    ]);
    expect(
      parseSlugPackages(slug(" aaa , bbb   ,  @foo/aaa,@foo/bbb  "))
    ).toEqual(["@foo/aaa", "@foo/bbb", "aaa", "bbb"]);
  });
  it("mixed bare and scoped packages, some with version", () => {
    expect(
      parseSlugPackages(slug("aaa@1.0.0,@foo/aaa,bbb,@foo/bbb@2.0.0"))
    ).toEqual(["@foo/aaa", "@foo/bbb@2.0.0", "aaa@1.0.0", "bbb"]);
    expect(
      parseSlugPackages(slug("@foo/aaa,bbb,@foo/bbb@2.0.0,aaa@1.0.0"))
    ).toEqual(["@foo/aaa", "@foo/bbb@2.0.0", "aaa@1.0.0", "bbb"]);
    expect(
      parseSlugPackages(slug(" aaa@1.0.0 , bbb   ,  @foo/aaa,@foo/bbb@2.0.0  "))
    ).toEqual(["@foo/aaa", "@foo/bbb@2.0.0", "aaa@1.0.0", "bbb"]);
  });
  it("identical packages, some with version", () => {
    expect(
      parseSlugPackages(
        slug("aaa,@foo/aaa,bbb@1.0.0,@foo/bbb@2.0.0,aaa,@foo/aaa,ccc,ccc@3.0.0")
      )
    ).toEqual([
      "@foo/aaa",
      "@foo/bbb@2.0.0",
      "aaa",
      "bbb@1.0.0",
      "ccc",
      "ccc@3.0.0",
    ]);
  });
});
