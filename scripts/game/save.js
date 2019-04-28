var startTime = 0;

//Save File information
function SaveFile(data){
	this.name = data.name,
	this.location = data.location,
	this.time = data.time
}

var saveFiles = new Array();

function saveGame(){
	var oldTime;
	var endTime = new Date();
	var timeElapsed = (endTime.getTime() - startTime.getTime())/1000;
	
	startTime = endTime;
	
	var timeMinutes = Math.floor(timeElapsed / 60);
	var timeSeconds = timeElapsed % 60;
	
	db.collection('SaveFile').doc(user.uid).get().then(doc=> {
		oldTime = doc.data().time;
            }).catch(function(error) {
                alert("Unknown error, unable to save.");
            });
	
	db.collection('SaveFile').doc(firebase.auth().currentUser.uid).set({
                minutes: timeMinutes,
		seconds: timeSeconds,
		location: sceneHandler.scene.name
        });
}
