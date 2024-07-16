async function collExists ({ schema, options = {} }) {
  const { getInfo } = this.app.bajoDb
  const { instance } = getInfo(schema)
  return !!(instance.db.listCollections({ name: schema.collName }).hasNext())
}

export default collExists
