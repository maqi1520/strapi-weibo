'use strict';

/**
 * topic service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::topic.topic');
