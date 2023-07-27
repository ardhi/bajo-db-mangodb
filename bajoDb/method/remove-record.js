import getRecord from './get-record.js'

async function removeRecord ({ schema, id, options = {} } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const rec = await getRecord.call(this, { schema, id })
  const coll = instance.db.collection(schema.collName)
  await coll.deleteOne({ _id: rec._id })
  return { old: rec }
}

export default removeRecord
