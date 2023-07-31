async function create (schema) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  await instance.db.createCollection(schema.collName)
  const coll = instance.db.collection(schema.collName)
  for (const p of schema.properties) {
    if (p.index || p.unique) await coll.createIndex(p.name, p.unique ? { unique: true } : undefined)
  }
}

export default create
