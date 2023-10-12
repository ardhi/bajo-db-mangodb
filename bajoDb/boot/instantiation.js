import { MongoClient } from 'mongodb'
import collCreate from '../method/coll/create.js'
import collExists from '../method/coll/exists.js'

async function instantiation ({ connection, schemas, noRebuild }) {
  const { importPkg } = this.bajo.helper
  const { pick } = await importPkg('lodash-es')
  this.bajoDbMongodb.instances = this.bajoDbMongodb.instances ?? []
  const instance = pick(connection, ['name', 'type'])
  let url = connection.url
  if (!url) {
    url = 'mongodb://'
    if (connection.user) url += `${connection.user}:${connection.password}@`
    url += `${connection.host}:${connection.port}`
  }
  instance.client = new MongoClient(url, connection.options ?? {})
  instance.db = instance.client.db(connection.database)
  this.bajoDbMongodb.instances.push(instance)
  if (noRebuild) return
  for (const schema of schemas) {
    const exists = await collExists.call(this, schema)
    if (exists) return
    await collCreate.call(this, schema)
  }
}

export default instantiation
