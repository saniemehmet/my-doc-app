$(document).ready(function() {
    $(".doctor-specialties").hide();
    $(".doctor-experience").hide();
    $(".doctor-location").hide();
    $(".doctor-overview").hide();
    $(".doctor-contacts").hide();
});

var $usertype = $( "input:radio[name=userType]" );
$usertype.on( "change", function() {
    if($(this).val() == "doctor"){
        $(".doctor-specialties").show();
        $(".doctor-experience").show();
        $(".doctor-location").show();
        $(".doctor-overview").show();
        $(".doctor-contacts").show();
    }else{
        $(".doctor-specialties").hide();
        $(".doctor-experience").hide();
        $(".doctor-location").hide();
        $(".doctor-overview").hide();
        $(".doctor-contacts").hide();
    }
});

function initDatePickers() {
    const $date = $("#date");
    $date.datepicker({
        minDate:0,
        dateFormat: 'dd/mm/yy'
    });
    $date.datepicker('setDate', new Date());
    
    const $scheduleDate = $("#schedule-date");
    $scheduleDate.datepicker({
        minDate:0,
        dateFormat: 'dd/mm/yy'
    });
    $scheduleDate.datepicker('setDate', new Date());
}

function getDateRangeObject() {
    let date = $("#date").val();
    
    date = moment(date).format('DD/MM/YYYY');
    return {
        'date': date
    }
}

$('#register').click(function(){
	let data = {};
	let userType = $('#userType:checked').val();
	if(userType == "doctor"){
		data = {
			name: $('#fullname').val(),
			email: $('#email').val(),
			password: $('#password').val(),
			repeatPassword: $('#repeatPassword').val(),
			age: $('#age').val(),
			userType: userType,
			specialty: $('#specialty').val(),
			experience: $('#experience').val(),
			location: $('#location').val(),
			overview: $('#description').val(),
			contactDetails: $('#contactDetails').val()
		};
	}else{
		data = {
			name: $('#fullname').val(),
			email: $('#email').val(),
			password: $('#password').val(),
			repeatPassword: $('#repeatPassword').val(),
			age: $('#age').val(),
			userType: userType
		};
	}
	$.ajax({
		url:"register",
		method: "POST",
		data:{
			data: JSON.stringify(data)
		},
		success: function(data){
			console.log(data);
			window.location.href="index.html";
			alert("Registration was successfull");
		},
		fail:function(){
			alert("Registration is not successfull");
		}
	});	
});

$('#login').click(function(){
	$.ajax({
		url:"login",
		method: "POST",
		data:{
			email: $('#loginEmail').val(),
			password: $('#loginPassword').val()
		},
		success: function(userType){
			console.log(userType);
			if(userType == null || userType == ""){
				alert("Invalid username or password");
			}
			else{
				switch(userType.toLowerCase()){
				case "doctor": 
					window.location.href = "schedule.html";
					break;
				case "patient":
					window.location.href = "profile.html";
					break
				default: 
					alert("Invalid usertype has been detected!");
					break;
				}	
			}
		},
		fail:function(){
			alert("Invalid username or password");
		}
	});
});

// $('#add').click(function(){
//     alert("add btn clicked");
// });

initDatePickers();
getDateRangeObject();