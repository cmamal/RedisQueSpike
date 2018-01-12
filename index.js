var kue = require('kue');
var queue = kue.createQueue();

queue.on('ready', () => {
    // If you need to
    console.info('Queue is ready!');
});

queue.on('error', (err) => {
    // handle connection errors here
    console.error('There was an error in the main queue!');
    console.error(err);
    console.error(err.stack);
});

var job1 = queue.create('email', {  
    title: 'Welcome to the site',
    to: 'user@example.com',
    template: 'welcome-email'
}).priority('high').attempts(5).save();

job1.on('complete', function(result){
    console.log('Job completed with data ', result);
  
  }).on('failed attempt', function(errorMessage, doneAttempts){
    console.log('Job failed');
  
  }).on('failed', function(errorMessage){
    console.log('Job failed');
  
  }).on('progress', function(progress, data){
    console.log('\r  job #' + job1.id + ' ' + progress + '% complete with data ', data );
  
  });

var job2 = queue.create('email2', {  
    title: 'Welcome to the site 2',
    to: 'user@example.com',
    template: 'welcome-email 2'
}).priority('high').attempts(5).save();

job2.on('complete', function(result){
    console.log('Job completed with data ', result);
  
  }).on('failed attempt', function(errorMessage, doneAttempts){
    console.log('Job failed');
  
  }).on('failed', function(errorMessage){
    console.log('Job failed');
  
  }).on('progress', function(progress, data){
    console.log('\r  job #' + job1.id + ' ' + progress + '% complete with data ', data );
  
  });


// var redis = require("redis"),
//     client = redis.createClient();


// client.on("error", function (err) {
//     console.log("Error " + err);
// });

// client.set("key1", "string val", redis.print);

// client.get("string key", function(err, reply) {
//     // reply is null when the key is missing 
//     console.log(reply);
// });

// client.get("missing key", function(err, reply) {
//     // reply is null when the key is missing 
//     console.log(reply);
// });

