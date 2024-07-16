async function collClear ({ schema, options = {} }) {
  const { getInfo } = this.app.bajoDb
  const { instance } = getInfo(schema)
  const coll = instance.db.collection(schema.collName)
  await coll.deleteMany({})
  return true
}

export default collClear
