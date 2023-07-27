async function getRecord ({ schema, id, options = {} } = {}) {
  const { error } = this.bajo.helper
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const { thrownNotFound = true, dataOnly = true } = options
  const coll = instance.db.collection(schema.collName)
  const result = await coll.findOne({ _id: id })
  if (!result && thrownNotFound) throw error('Record \'%s@%s\' not found!', id, schema.name)
  return dataOnly ? result : { data: result }
}

export default getRecord
