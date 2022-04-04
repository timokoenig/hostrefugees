import zlib from 'zlib'

const compress = (buf: Buffer): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    zlib.gzip(buf, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
}

export default compress
