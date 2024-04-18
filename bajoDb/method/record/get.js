async function get ({ schema, id, options = {} } = {}) {
  const { error } = this.bajo.helper
  const { getInfo } = this.bajoDb.helper
  const { instance } = getInfo(schema)
  const { thrownNotFound = true } = options
  const coll = instance.db.collection(schema.collName)
  const result = await coll.findOne({ _id: id })
  if (!result && thrownNotFound) throw error('Record \'%s@%s\' not found!', id, schema.name, { statusCode: 404 })
  return { data: result }
}

export default get
