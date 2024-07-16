import getRecord from './get.js'

async function recordRemove ({ schema, id, options = {} } = {}) {
  const { getInfo } = this.app.bajoDb
  const { noResult } = options
  const { instance } = getInfo(schema)
  const rec = noResult ? undefined : await getRecord.call(this, { schema, id })
  const coll = instance.db.collection(schema.collName)
  await coll.deleteOne({ _id: id })
  if (noResult) return
  return { oldData: rec.data }
}

export default recordRemove
