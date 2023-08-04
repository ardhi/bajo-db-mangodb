async function drop (schema) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  await instance.db.dropCollection(schema.repoName)
}

export default drop
