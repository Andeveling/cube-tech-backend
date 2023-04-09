/**
 * hardware-kit controller
 */

import { factories } from "@strapi/strapi"

export default factories.createCoreController("api::hardware-kit.hardware-kit", ({ strapi }) => ({
  async customAction(ctx) {
    try {
      ctx.body = "Hello"
    } catch (error) {
      ctx.body = error
    }
  },

  async findOne(ctx) {
    const { id } = ctx.params
    const sanitizedQueryParams = await this.sanitizeQuery(ctx)
    const entity = await strapi.service("api::hardware-kit.hardware-kit").findOne(id, sanitizedQueryParams)
    const sanitizedResults = await this.sanitizeOutput(entity, ctx)

    // console.log(sanitizedResults)

    // Add cremones to total
    if (sanitizedResults.cremona_quantities)
      sanitizedResults.total += sanitizedResults.cremona_quantities.reduce(
        (total, item) => total + item.quantity * item.cremona.price,
        0
      )

    // Add Strikers to total
    if (sanitizedResults.striker_quantities)
      sanitizedResults.total += sanitizedResults.striker_quantities.reduce(
        (total, item) => total + item.quantity * item.striker.price,
        0
      )

    // Add mullions to total
    if (sanitizedResults.mullion_quantities)
      sanitizedResults.total += sanitizedResults.mullion_quantities.reduce(
        (total, item) => total + item.quantity * item.mullion.price,
        0
      )

    return this.transformResponse(sanitizedResults)
  },
}))
