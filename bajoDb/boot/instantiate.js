import { MongoClient } from 'mongodb'
import collCreate from '../method/coll/create.js'
import collExists from '../method/coll/exists.js'

async function instantiate ({ connection, schemas, noRebuild }) {
  const { pick } = this.app.bajo
  this.instances = this.instances ?? []
  const instance = pick(connection, ['name', 'type'])
  let url = connection.url
  if (!url) {
    url = 'mongodb://'
    if (connection.user) url += `${connection.user}:${connection.password}@`
    url += `${connection.host}:${connection.port}`
  }
  instance.client = new MongoClient(url, connection.options ?? {})
  instance.db = instance.client.db(connection.database)
  this.instances.push(instance)
  if (noRebuild) return
  for (const schema of schemas) {
    const exists = await collExists.call(this, schema)
    if (exists) return
    await collCreate.call(this, schema)
  }
}

export default instantiate
