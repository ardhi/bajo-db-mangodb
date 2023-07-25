import getRecord from './get-record.js'

async function updateRecord ({ schema, id, body, options } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const { thrownNotFound = true } = options
  const old = await getRecord.call(this, { schema, id, options: { thrownNotFound } })
  const coll = instance.db.collection(schema.collName)
  await coll.updateOne({ _id: old._id }, { $set: body })
  const result = await getRecord.call(this, { schema, id, options: { thrownNotFound } })
  return { old, new: result }
}

export default updateRecord
