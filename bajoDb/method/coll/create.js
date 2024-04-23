async function create ({ schema, options = {} }) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = getInfo(schema)
  const { reduce } = this.bajo.helper._
  await instance.db.createCollection(schema.collName)
  const coll = instance.db.collection(schema.collName)
  for (const p of schema.properties) {
    if (p.index || p.unique) await coll.createIndex(p.name, p.unique ? { unique: true } : undefined)
  }
  for (const idx of schema.indexes ?? []) {
    const fields = reduce(idx.fields, (obj = {}, i) => { obj[i] = 1; return obj }, {})
    await coll.createIndex(fields, idx.unique ? { unique: true } : undefined)
  }
}

export default create
