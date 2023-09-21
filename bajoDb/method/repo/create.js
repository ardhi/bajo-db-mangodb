async function create (schema) {
  const { importPkg } = this.bajo.helper
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const { reduce } = await importPkg('lodash-es')
  await instance.db.createCollection(schema.repoName)
  const coll = instance.db.collection(schema.repoName)
  for (const p of schema.properties) {
    if (p.index || p.unique) await coll.createIndex(p.name, p.unique ? { unique: true } : undefined)
  }
  for (const idx of schema.indexes ?? []) {
    const fields = reduce(idx.fields, (obj = {}, i) => { obj[i] = 1; return obj }, {})
    await coll.createIndex(fields, idx.unique ? { unique: true } : undefined)
  }
}

export default create
