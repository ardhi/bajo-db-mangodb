import getRecord from './get.js'

async function create ({ schema, body, options = {} } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  body._id = body.id
  delete body.id
  const coll = instance.db.collection(schema.collName)
  const resp = await coll.insertOne(body)
  return await getRecord.call(this, { schema, id: resp.insertedId })
}

export default create
