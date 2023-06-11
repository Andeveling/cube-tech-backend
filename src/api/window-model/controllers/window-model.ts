/**
 * window-model controller
 */

import { factories } from "@strapi/strapi"

export default factories.createCoreController("api::window-model.window-model", ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params
    const sanitizedQueryParams = await this.sanitizeQuery(ctx)
    const entity = await strapi.service("api::window-model.window-model").findOne(id, sanitizedQueryParams)

    const sanitizedResults = await this.sanitizeOutput(entity, ctx)

    // console.log(sanitizedQueryParams)

    if (sanitizedResults.hardware_kit) {
      if (sanitizedResults.hardware_kit.cremona_quantities)
        sanitizedResults.hardware_kit.total += sanitizedResults.hardware_kit.cremona_quantities.reduce(
          (total, item) => total + item.quantity * item.cremona.price,
          2
        )

      // Add Strikers to total
      if (sanitizedResults.hardware_kit.striker_quantities)
        sanitizedResults.hardware_kit.total += sanitizedResults.hardware_kit.striker_quantities.reduce(
          (total, item) => total + item.quantity * item.striker.price,
          0
        )

      // Add mullions to total
      if (sanitizedResults.hardware_kit.mullion_quantities)
        sanitizedResults.hardware_kit.total += sanitizedResults.hardware_kit.mullion_quantities.reduce(
          (total, item) => total + item.quantity * item.mullion.price,
          0
        )
      // Add etc to total
      if (sanitizedResults.hardware_kit.etc_quantities)
        sanitizedResults.hardware_kit.etc_quantities.forEach((etc) => {
          sanitizedResults.hardware_kit.total += etc.quantity * etc.etc_accessory.price
        })

      // console.log(sanitizedResults.hardware_kit.etc_quantities)
    }

    return this.transformResponse(sanitizedResults)
  },
}))
