async function clear ({ schema, options = {} } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const coll = instance.db.collection(schema.collName)
  await coll.deleteMany({})
  return true
}

export default clear
