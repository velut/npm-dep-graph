import parsePackageId from "../../lib/parse-package-id";

describe("parsePackageId", () => {
  it("empty string", () => {
    expect(parsePackageId("")).toStrictEqual({
      name: "",
      version: "latest",
    });
  });
  it("whitespace string", () => {
    expect(parsePackageId("    ")).toStrictEqual({
      name: "",
      version: "latest",
    });
  });
  it("incomplete versions", () => {
    expect(parsePackageId("foo@")).toStrictEqual({
      name: "foo",
      version: "latest",
    });
    expect(parsePackageId("@foo/bar@")).toStrictEqual({
      name: "@foo/bar",
      version: "latest",
    });
  });
  it("bare names", () => {
    expect(parsePackageId("foo")).toStrictEqual({
      name: "foo",
      version: "latest",
    });
    expect(parsePackageId("foo.js")).toStrictEqual({
      name: "foo.js",
      version: "latest",
    });
    expect(parsePackageId("foo-ts")).toStrictEqual({
      name: "foo-ts",
      version: "latest",
    });
    expect(parsePackageId("123")).toStrictEqual({
      name: "123",
      version: "latest",
    });
  });
  it("bare names with version", () => {
    expect(parsePackageId("foo@1.0.0")).toStrictEqual({
      name: "foo",
      version: "1.0.0",
    });
    expect(parsePackageId("foo.js@1.0.0")).toStrictEqual({
      name: "foo.js",
      version: "1.0.0",
    });
    expect(parsePackageId("foo-ts@1.0.0")).toStrictEqual({
      name: "foo-ts",
      version: "1.0.0",
    });
    expect(parsePackageId("123@1.0.0")).toStrictEqual({
      name: "123",
      version: "1.0.0",
    });
  });
  it("bare names with semver", () => {
    expect(parsePackageId("foo@^1")).toStrictEqual({
      name: "foo",
      version: "^1",
    });
    expect(parsePackageId("foo.js@=1.0.0")).toStrictEqual({
      name: "foo.js",
      version: "=1.0.0",
    });
    expect(parsePackageId("foo-ts@*")).toStrictEqual({
      name: "foo-ts",
      version: "*",
    });
    expect(parsePackageId("123@>=1.0.0")).toStrictEqual({
      name: "123",
      version: ">=1.0.0",
    });
  });
  it("scoped names", () => {
    expect(parsePackageId("@foo/bar")).toStrictEqual({
      name: "@foo/bar",
      version: "latest",
    });
    expect(parsePackageId("@foo/bar.js")).toStrictEqual({
      name: "@foo/bar.js",
      version: "latest",
    });
    expect(parsePackageId("@foo/bar-ts")).toStrictEqual({
      name: "@foo/bar-ts",
      version: "latest",
    });
    expect(parsePackageId("@foo/123")).toStrictEqual({
      name: "@foo/123",
      version: "latest",
    });
  });
  it("scoped names with version", () => {
    expect(parsePackageId("@foo/bar@1.0.0")).toStrictEqual({
      name: "@foo/bar",
      version: "1.0.0",
    });
    expect(parsePackageId("@foo/bar.js@1.0.0")).toStrictEqual({
      name: "@foo/bar.js",
      version: "1.0.0",
    });
    expect(parsePackageId("@foo/bar-ts@1.0.0")).toStrictEqual({
      name: "@foo/bar-ts",
      version: "1.0.0",
    });
    expect(parsePackageId("@foo/123@1.0.0")).toStrictEqual({
      name: "@foo/123",
      version: "1.0.0",
    });
  });
  it("scoped names with semver", () => {
    expect(parsePackageId("@foo/bar@^1")).toStrictEqual({
      name: "@foo/bar",
      version: "^1",
    });
    expect(parsePackageId("@foo/bar.js@=1.0.0")).toStrictEqual({
      name: "@foo/bar.js",
      version: "=1.0.0",
    });
    expect(parsePackageId("@foo/bar-ts@*")).toStrictEqual({
      name: "@foo/bar-ts",
      version: "*",
    });
    expect(parsePackageId("@foo/123@>=1.0.0")).toStrictEqual({
      name: "@foo/123",
      version: ">=1.0.0",
    });
  });
});
