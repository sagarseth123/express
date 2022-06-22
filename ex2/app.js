function validate()
{
    var user=document.getElementById("mail").value;
    var user2=document.getElementById("mail")
    var re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    var ph_no = document.getElementById('phone');
    var phoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;

    if (re.test(user) && phoneRGEX.test(ph_no.value)) {
        alert("valid details");
         document.getElementById("my_form").submit();
    }
    else if(!re.test(user)) {
        user2.value = "Unvalid Email";
        //user2.style.color="red";
    } else if(!phoneRGEX.test(ph_no.value))
    {
        ph_no.value = "Unvalid Phone Number";
    } else {
        alert("error");
    }
    
}

