export default function paginate(datas, args) {
  const cursorIndex = datas.findIndex(node => node.id === args.after) + 1;
  const data = datas.slice(
    cursorIndex,
    cursorIndex + (args.first || datas.length)
  );
  const endCursor = data[data.length - 1].id;
  return {
    edges: data.map(node => ({
      cursor: node.id,
      node,
    })),
    totalCount: data.length,
    pageInfo: {
      endCursor,
      hasNextPage: endCursor !== datas[datas.length - 1].id,
    },
  };
}
