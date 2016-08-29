var forEach = function(array, callback){
   var currentValue, index;
   for (i = 0; i < array.length; i += 1) {
      if(typeof array[i] == "undefined"){
         currentValue = null;
      } else {
         currentValue = array[i];
      }
      index = i;
      callback(currentValue, i, array);
    }
}

/*
Scrub types
	Alphabetic - spaces ok
	Numeric - spaces ok
	Alphanumeric - spaces ok
	URL
	Directory - Spaces ok
*/
var scrub = function(value, replacement, type, s : Switch )
{
	var inital_length = value.length;
	var scrubbed_value;

	if(type == 'Alphabetic'){
		regex = new RegExp('[^a-z ]');
	} else if(type == 'Numeric'){
		regex = new RegExp('[^0-9 ]');
	} else if(type == 'Alphanumeric'){
		regex = new RegExp('[^a-z0-9 ]');
	} else if(type == 'URL'){
		regex = new RegExp('[^0-9a-zA-Z]');
	} else if(type == 'Directory'){
		regex = new RegExp('[^0-9a-zA-Z _-]');
	} else {
		s.log(3, "Unknown scrub type.");
		return false;
	}

	regex.global = true;
	scrubbed_value = value.replace(regex, replacement);

	s.log(-1, type +" scrubbed "+ (inital_length - scrubbed_value.length) + " characters.");

	return scrubbed_value;
}

var init = function( s : Switch, job : Job, index0 )
{
	var i = index0 + 1;

	var tag = s.getPropertyValue('PrivateDataTag'+i);
	var value = job.getPrivateData(tag);
	var scrub_type = s.getPropertyValue('ScrubType'+i);
	var replacement = s.getPropertyValue('Replacement'+i);

	if(tag){
		s.log(-1, "tag " + i + ": " + tag + ' => ' + value);

		scrubbed_value = scrub(value, replacement, scrub_type, s);

		s.log(-1, "scrubbed_value " + i + ": " + tag + ' => ' + scrubbed_value);

		job.setPrivateData(tag, scrubbed_value);
	}
}

function jobArrived( s : Switch, job : Job )
{
	var property_loop = new Array(3);

	forEach(property_loop, function(loop_item, index0){
		init(s, job, index0);
	});

	job.sendToSingle( job.getPath() );
}
