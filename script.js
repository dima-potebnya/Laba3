const MongoClient = require("mongodb").MongoClient;
   
const url = "mongodb+srv://dima_potebnya:1706gnom1972@cluster1.lfdb5jo.mongodb.net/?retryWrites=true&w=majority";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true });
 
mongoClient.connect(function(err, client){
      
    const db = client.db("lab3");
    const collection = db.collection("students");
    let user = {name: "Rob", average_rating: 81};
	let users = [{
      name: "Rob", 
      average_rating: 75
    }, 
    {
      name: "Kate", 
      average_rating: 89
    }, 
    {
      name: "John", 
      average_rating: 66
    }];
	
    collection.insertOne(user, function(err, result){
        if(err) return console.log(err);
        console.log("insertOne", result);
    });	  
	
	collection.insertMany(users, function(err, results){    
        if(err) return console.log(err);    
        console.log("insertMany", results);
    });
	
	collection.find().toArray(function(err, results){    
	    if(err) return console.log(err);
        console.log("find()", results);
    });
	
	collection.find({name: "Rob"}).toArray(function(err, results){
        if(err) return console.log(err);		
        console.log("find({name: 'Rob'})", results);
    });
	
	collection.find({name: "Rob", average_rating: 81}).toArray(function(err, results){   
        if(err) return console.log(err);	
        console.log("find({name: 'Rob', average_rating: 81})", results);
    });
	
	collection.findOne(function(err, doc){
		if(err) return console.log(err);
        console.log("findOne", doc);
    });
	
	collection.findOne({name: "John"}, function(err, doc){
		if(err) return console.log(err);
        console.log("findOne({name: 'John'}", doc);	
    });
	
	collection.findOneAndUpdate(
    {
      average_rating: 75
    }, // критерий выборки
    { 
      $set: 
      {
        average_rating: 95
      }
    }, // параметр обновления
    function(err, result){
        if(err) return console.log(err);
		console.log(result);
    }
    );
  
    collection.findOneAndUpdate(
    {
      name: "John"
    },              // критерий выборки
    { 
      $set: 
      {
        name: "Don"
      }
    },     // параметр обновления
    {                           // доп. опции обновления    
      returnOriginal: false
    },
    function(err, result){
		if(err) return console.log(err);
        console.log(result);	    
    }
    );
	
	collection.updateOne(
    {
      name: "Rob"
    }, 
    { 
      $set: 
      {
        name: "Rob Pilot", 
        average_rating: 99
      }
    },
    function(err, result){
		if(err) return console.log(err);
        console.log(result);
    }
    );
	
	collection.deleteMany({name: "Rob"}, function(err, result){
        if(err) return console.log(err);		
        console.log(result);	    
    });
	
	collection.deleteOne({name: "Kate"}, function(err, result){
		if(err) return console.log(err);
        console.log(result);
    });
	
	collection.findOneAndDelete({average_rating: 66}, function(err, result){       
        if(err) return console.log(err);
	    console.log(result);
    });
	
	collection.drop(function(err, result){  
        if(err) return console.log(err);	
        console.log(result);
	    client.close();
    });
  
});