async function sanitizer (conn) {
  const { importPkg, fatal } = this.bajo.helper
  const { pick } = await importPkg('lodash-es')
  if (!conn.url) {
    conn.host = conn.host ?? 'localhost'
    conn.port = conn.port ?? 27017
  }
  if (!conn.database) fatal('\'%s@%s\' key is required', 'database', conn.name, { payload: conn })
  const result = pick(conn, ['type', 'name', 'driver', 'host', 'port', 'user', 'password', 'database'])
  return result
}

export default sanitizer
