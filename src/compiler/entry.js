import "../polyfill.js"
import { build as baseBuild } from "./bootstrap"

/**
 * @returns {*}
 */
export function build(...args) {
  return baseBuild(...args)
}
