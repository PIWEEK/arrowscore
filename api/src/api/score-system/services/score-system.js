'use strict';

/**
 * score-system service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::score-system.score-system');
