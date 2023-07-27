async function findRecord ({ schema, filter = {}, options = {} } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const { prepPagination } = this.bajoDb.helper
  const { limit, skip, query, sort, page } = await prepPagination(filter, schema)
  const criteria = query ? query.toJSON() : {}
  const coll = instance.db.collection(schema.collName)
  const count = await coll.countDocuments(criteria)
  const cursor = coll.find(criteria).limit(limit).skip(skip)
  if (sort) cursor.sort(sort)
  const results = []
  for await (const r of cursor) {
    results.push(r)
  }
  return { data: results, page, limit, count, pages: Math.ceil(count / limit) }
}

export default findRecord
