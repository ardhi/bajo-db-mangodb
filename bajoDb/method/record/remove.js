import getRecord from './get.js'

async function remove ({ schema, id, options = {} } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { noResult } = options
  const { instance } = getInfo(schema)
  const rec = noResult ? undefined : await getRecord.call(this, { schema, id })
  const coll = instance.db.collection(schema.collName)
  await coll.deleteOne({ _id: id })
  if (noResult) return
  return { oldData: rec.data }
}

export default remove
