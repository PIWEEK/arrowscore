module.exports = {

    
    beforeCreate(event) {
      const { result, params } = event;
  
      var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };
      // do something to the result;
      code = S4().toUpperCase();


      event.params.data.code = code
      event.params.data.apiid = code

    },
  };