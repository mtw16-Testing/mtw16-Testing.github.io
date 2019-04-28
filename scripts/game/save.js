var startTime = 0;

//Save File information
function SaveFile(data){
	this.name = data.name,
	this.location = data.location,
	this.hours = data.hours,
	this.minutes = data.minutes,
	this.seconds = data.seconds
}

var saveFiles = new Array();

function saveGame(){
	var oldTime;
	var endTime = new Date();
	var timeElapsed = (endTime.getTime() - startTime.getTime())/1000;
	
	startTime = endTime;
	
	
	var timeHours = Math.floor(timeElapsed / 3600);
	var timeMinutes = Math.floor(timeElapsed / 60);
	var timeSeconds = Math.floor(timeElapsed % 60);
	
	var user = firebase.auth().currentUser;
	
	console.log("User: " + user);
	
	db.collection('SaveFile').doc(user.uid).get().then(doc=> {
		oldTime = doc.data().time;
            }).catch(function(error) {
                alert("Unknown error, unable to get save data.");
            });
	
	db.collection('SaveFile').doc(user.uid).update({
		hours: timeHours,
                minutes: timeMinutes,
		seconds: timeSeconds,
		location: sceneHandler.scene.name
        }).catch(function(error) {
                alert("Unknown error, unable to save.");
        });
	
	db.collection('SaveFile').doc(user.uid).get().then(doc=> {	
		saveFiles[0] = new SaveFile();
            }).catch(function(error) {
                alert("Unknown error, unable to get save data.");
            });
}
