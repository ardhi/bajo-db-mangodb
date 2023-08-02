async function count ({ schema, filter = {}, options = {} } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const { prepPagination } = this.bajoDb.helper
  const { query } = await prepPagination(filter, schema)
  const criteria = query ? query.toJSON() : {}
  const coll = instance.db.collection(schema.collName)
  const count = await coll.countDocuments(criteria)
  return { data: count }
}

export default count
