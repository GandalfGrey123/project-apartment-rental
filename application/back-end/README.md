## Back-End App


***

### Stack

    NodeJS
    Express
    MySql

### Tools

    Sequelize
***

Database ORM Models

 * User
   Users create and own many posts 
 
 * ListingPost
   ListingPost belongs to users 
   A ListingPost has many images
   A ListingPost has only one housing type 
   
 * ListingImage
   A ListingImage belongs to ListingPost
 
 * HousingType
   A HousingType is owned by a ListingPost
   
 
