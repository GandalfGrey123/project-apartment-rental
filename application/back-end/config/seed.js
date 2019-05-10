var models = require('../models');


models.Chat.create({
  
 userOneEmail:'frodo@yahoo.com',
 userTwoEmail:'samwise@yahoo.com',

}).then((chat) => {
  models.UserChat.bulkCreate([
   {
      listingId: 2,
      UserId: 1,
      ChatId: chat.id,
    },

    {
      listingId: 2,
      UserId: 3,
      ChatId: chat.id,
    },
  ]).then(()=>{

  })

});

// models.Chat.create({
	
// 	userOneEmail:'frodo@yahoo.com',
// 	userTwoEmail:'gandalf@yahoo.com',

// }).then((chat)=>{

//   models.UserChat.bulkCreate([
//   	{
//       listingId: 1,
//  	   UserId: 1,
//  	   ChatId: chat.id,
//     },

//     {
//       listingId: 1,
//  	   UserId: 2,
//  	   ChatId: chat.id,
//     },
//   ]).then(()=>{

//   	models.Message.bulkCreate([
//   		{
//   	  		userEmail:'frodo@yahoo.com',
//   	  		message:'Hello gandalf',
//   	  		UserId: 1,
//   	  		ChatId: chat.id,
//   	  	},

//   	  	{
//   	  		userEmail:'gandalf@yahoo.com',
//   	  		message:'Hey Frodo',
//   	  		UserId: 2,
//   	  		ChatId: chat.id,
//   	  	},

//   	]);
//   });
// });
