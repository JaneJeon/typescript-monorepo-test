import Hashids from 'hashids'
import { PATHNAME_MIN_LENGTH } from '../constants.js'

export const hashids = new Hashids('domain', PATHNAME_MIN_LENGTH)
