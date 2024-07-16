async function recordFind ({ schema, filter = {}, options = {} } = {}) {
  const { getInfo } = this.app.bajoDb
  const { omit } = this.app.bajo
  const { instance } = getInfo(schema)
  const { prepPagination } = this.app.bajoDb
  const { limit, skip, sort, page } = await prepPagination(filter, schema)
  const criteria = filter.query ?? {}
  const coll = instance.db.collection(schema.collName)
  let count = 0
  if (options.count && !options.dataOnly) count = await coll.countDocuments(criteria)
  const cursor = coll.find(criteria).limit(limit).skip(skip)
  if (sort) cursor.sort(sort)
  const results = []
  for await (const r of cursor) {
    results.push(r)
  }
  let result = { data: results, page, limit, count, pages: Math.ceil(count / limit) }
  if (!options.count) result = omit(result, ['count', 'pages'])
  return result
}

export default recordFind
