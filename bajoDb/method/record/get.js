async function recordGet ({ schema, id, options = {} } = {}) {
  const { getInfo } = this.app.bajoDb
  const { instance } = getInfo(schema)
  const { thrownNotFound = true } = options
  const coll = instance.db.collection(schema.collName)
  const result = await coll.findOne({ _id: id })
  if (!result && thrownNotFound) throw this.error('Record \'%s@%s\' not found!', id, schema.name, { statusCode: 404 })
  return { data: result }
}

export default recordGet
