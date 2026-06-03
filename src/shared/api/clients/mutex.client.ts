import { Mutex } from 'async-mutex'

export const mutexClient = new Mutex()
