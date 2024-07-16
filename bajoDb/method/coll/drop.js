async function collDrop ({ schema, options = {} }) {
  const { getInfo } = this.app.bajoDb
  const { instance } = getInfo(schema)
  await instance.db.dropCollection(schema.collName)
}

export default collDrop
