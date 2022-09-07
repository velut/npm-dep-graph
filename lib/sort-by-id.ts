const sortById = <T extends { id: string }>(ts: T[]): T[] => {
  return ts.sort((a, b) => a.id.localeCompare(b.id));
};

export default sortById;
