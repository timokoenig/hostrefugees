import zlib from 'zlib'

const compress = (encoding: string, buf: Buffer): Promise<{ data: Buffer; encoding: string }> => {
  return new Promise((resolve, reject) => {
    if (encoding.includes('br')) {
      zlib.brotliCompress(buf, (err, result) => {
        if (err) {
          reject(err)
          return
        }
        resolve({ data: result, encoding: 'br' })
      })
    } else if (encoding.includes('gzip')) {
      zlib.gzip(buf, (err, result) => {
        if (err) {
          reject(err)
          return
        }
        resolve({ data: result, encoding: 'gzip' })
      })
    } else {
      resolve({ data: buf, encoding: '' })
    }
  })
}

export default compress
