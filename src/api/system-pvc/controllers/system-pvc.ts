/**
 * system-pvc controller
 */

import { factories } from "@strapi/strapi"

export default factories.createCoreController("api::system-pvc.system-pvc", ({ strapi }) => ({
  async find() {},
}))
