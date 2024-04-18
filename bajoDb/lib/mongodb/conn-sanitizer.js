async function connSanitizer (conn) {
  const { fatal } = this.bajo.helper
  const { pick } = this.bajo.helper._
  if (!conn.url) {
    conn.host = conn.host ?? 'localhost'
    conn.port = conn.port ?? 27017
  }
  if (!conn.database) fatal('\'%s@%s\' key is required', 'database', conn.name, { payload: conn })
  const result = pick(conn, ['type', 'name', 'driver', 'host', 'port', 'user', 'password', 'database'])
  return result
}

export default connSanitizer
