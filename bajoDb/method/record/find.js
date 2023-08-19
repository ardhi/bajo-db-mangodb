async function find ({ schema, filter = {}, options = {} } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const { prepPagination } = this.bajoDb.helper
  const { limit, skip, query, sort, page } = await prepPagination(filter, schema)
  const criteria = query ?? {}
  const coll = instance.db.collection(schema.repoName)
  const count = options.dataOnly ? 0 : (await coll.countDocuments(criteria))
  const cursor = coll.find(criteria).limit(limit).skip(skip)
  if (sort) cursor.sort(sort)
  const results = []
  for await (const r of cursor) {
    results.push(r)
  }
  return { data: results, page, limit, count, pages: Math.ceil(count / limit) }
}

export default find
