var kue = require('kue');
var queue = kue.createQueue();

function justTookANap(job,done) {
    console.log('slept for 30 seconds in job :',job.id);
    done();
}

queue.process('email', function(job, done) {  
    console.log('Worker executing Job :',job.id);
    console.log('Job Data :',JSON.stringify(job.data));
    job.progress(3,10,'inp');
    setTimeout(justTookANap, 30000, job,done);
    //sendEmail(job.data, done);
    //done();
});

queue.process('email2', function(job, done) {  
    console.log('Worker executing Job 2 :',job.id);
    console.log('Job 2 Data :',JSON.stringify(job.data));
    //sendEmail(job.data, done);
    done();
});