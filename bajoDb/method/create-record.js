import getRecord from './get-record.js'

async function createRecord ({ schema, body, options = {} } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  body._id = body.id
  delete body.id
  const coll = instance.db.collection(schema.collName)
  const resp = await coll.insertOne(body)
  return await getRecord.call(this, { schema, id: resp.insertedId, options })
}

export default createRecord
