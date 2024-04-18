async function drop (schema) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = getInfo(schema)
  await instance.db.dropCollection(schema.collName)
}

export default drop
