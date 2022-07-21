module.exports = {
    
  beforeCreate(event) {
    const { result, params } = event;

    var S4 = function() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };

    id = S4().toUpperCase();
    const entries =  strapi.entityService.findMany('api::session.session', {
      fields: ['name'],
      filters: { apiid: id },
    });
    // we make sure there is no collision
    while (entries.length >0){
      id = S4().toUpperCase();
      const entries = strapi.entityService.findMany('api::session.session', {
        fields: ['name'],
        filters: { apiid: id },
    });
    }
      event.params.data.apiid = id

    if (event.params.data.localcreatedAt){
      event.params.data.createdAt = event.params.data.localcreatedAt
    }

    if (event.params.data.localupdatedAt){
      event.params.data.updatedAt = event.params.data.localupdatedAt
    }
  },
};