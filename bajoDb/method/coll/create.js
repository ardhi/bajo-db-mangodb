async function create (schema) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  await instance.db.createCollection(schema.collName)
}

export default create
