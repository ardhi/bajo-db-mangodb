async function create (schema) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  await instance.db.createCollection(schema.repoName)
  const coll = instance.db.collection(schema.repoName)
  for (const p of schema.properties) {
    if (p.index || p.unique) await coll.createIndex(p.name, p.unique ? { unique: true } : undefined)
  }
}

export default create
