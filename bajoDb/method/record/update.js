import getRecord from './get.js'

async function update ({ schema, id, body, options } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { noResult } = options
  const { instance } = await getInfo(schema)
  const old = noResult ? undefined : await getRecord.call(this, { schema, id })
  const coll = instance.db.collection(schema.collName)
  await coll.updateOne({ _id: id }, { $set: body })
  if (noResult) return
  const result = await getRecord.call(this, { schema, id })
  return { oldData: old.data, data: result.data }
}

export default update
