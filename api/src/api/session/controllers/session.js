'use strict';

/**
 *  session controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::session.session', ({ strapi }) =>  ({

async find(ctx) {
    const {user } = ctx.state;
    ctx.query = { ...ctx.query, filters: {
        users: {
            email: {
                $eq: user.email
            }
        } }
    }
    // some logic here
    const { data, meta } = await super.find(ctx);
    // some more logic

    
    return { data, meta };
  },
  async findOne(ctx) {
    const {user } = ctx.state;
      // some logic here

    ctx.query = { ...ctx.query, filters: {
        users: {
            email: {
                $eq: user.email
            }
        } }
    }
    
    let rusers;
   
    const response = await super.findOne(ctx);
    if (response == null){
        return response;
    }

    rusers = response.data.attributes.users.data;

    for (var i = 0; i < rusers.length; i++){

        if (rusers[i]["attributes"]["username"] === user.username){
            return response;
        }
    }
        return null;
    

  
  }
}));
