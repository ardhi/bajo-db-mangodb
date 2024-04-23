async function exists ({ schema, options = {} }) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = getInfo(schema)
  return !!(instance.db.listCollections({ name: schema.collName }).hasNext())
}

export default exists
