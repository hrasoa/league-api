export default function paginate(datas, args) {
  const cursorIndex = datas.findIndex(d => d.id === args.after) + 1;
  const data = datas.slice(
    cursorIndex,
    cursorIndex + (args.first || datas.length)
  );
  const endCursor = data[data.length - 1].id;
  return {
    edges: data.map(d => ({
      cursor: d.id,
      node: d,
    })),
    totalCount: data.length,
    pageInfo: {
      endCursor,
      hasNextPage: endCursor !== datas[datas.length - 1].id,
    },
  };
}
