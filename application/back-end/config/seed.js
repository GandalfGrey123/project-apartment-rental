var models = require('../models');

models.Chat.create({
	
	userOneEmail:'frodo@yahoo.com',
	userTwoEmail:'gandalf@yahoo.com',
  ListingPostId: 1,

}).then((chat)=>{

  models.UserChat.bulkCreate([
  	{
 	   UserId: 1,
 	   ChatId: chat.id,
    },

    {
 	   UserId: 2,
 	   ChatId: chat.id,
    },
  ]).then(()=>{

  	models.Message.bulkCreate([
  		  {
  	  		userEmail:'frodo@yahoo.com',
  	  		message:'Hello gandalf',
  	  		UserId: 1,
  	  		ChatId: chat.id,
  	  	},

  	  	{
  	  		userEmail:'gandalf@yahoo.com',
  	  		message:'Hey Frodo',
  	  		UserId: 2,
  	  		ChatId: chat.id,
  	  	},

  	]);
  });
});
