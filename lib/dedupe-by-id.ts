const dedupeById = <T extends { id: string }>(ts: T[]): T[] => {
  const seenIds = new Set<string>();
  return ts.flatMap((t) => {
    const { id } = t;
    if (seenIds.has(id)) {
      return [];
    }
    seenIds.add(id);
    return t;
  });
};

export default dedupeById;
