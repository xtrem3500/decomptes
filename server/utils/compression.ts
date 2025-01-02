import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'
import { createGzip } from 'zlib'

export async function compressFile(filepath: string): Promise<void> {
  const source = createReadStream(filepath)
  const destination = createWriteStream(`${filepath}.gz`)
  const gzip = createGzip()

  await pipeline(source, gzip, destination)
}