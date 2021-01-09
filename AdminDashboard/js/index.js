var flag = 0; //either post or put
var id_temp;
let DATA_URL = "http://localhost:3000/";


$(document).ready(function () {
   
    var categories =["html","js"];

    /* fetch data  */

    $.each(categories, function (key, value) { 
            
             var url = DATA_URL + value;


             /* GET data on load. */
        $.get(url,
            (data, textStatus, jqXHR) => {
                
             

               var tables = ""+'<h3 class="capitalise">'+ value +'</h3>'; 

                tables += '<table id="'+value+'" class="table table-hover"><thead class="thead-dark w-100"><tr><th scope="col">Id</th> <th scope="col">Question</th>   <th scope="col">Answer</th> <th scope="col">Option 1</th>  <th scope="col">Option 2</th>     <th scope="col">Option 3</th> <th scope="col">Option 4</th>   <th scope="col">Operations</th> </tr></thead> <tbody>';
 
                for(var i=0; i< data.length; i++){

                    tables += `<tr id="row${data[i].id}"> 
                    <td id="id${data[i].id}"> ${data[i].id}</td>
                    <td id="name${data[i].id}">${data[i].question}</td> 
                    <td id="name${data[i].id}">${data[i].answer}</td> 
                    <td id="name${data[i].id}">${data[i].option1}</td>  
                    <td id="name${data[i].id}">${data[i].option2}</td>  
                    <td id="name${data[i].id}">${data[i].option3}</td>  
                    <td id="name${data[i].id}">${data[i].option4}</td> 
                    <td><button id="${data[i].id}" class="btn btn-warning edit" cat=${value}>Edit</button> 
                    <button id="${data[i].id}" class=" btn btn-danger delete"  cat=${value}>Delete</button></td> 
                    <tr/>`;
                }

                tables += '</tbody></table><br/>';

                $('#allTables').append(tables);  
            }
        );


    });

    /* POST data */

    $('#submit').on('click', function () {
           
        /* fetch user values */
     
        var cat = $('#category :selected').attr('value');
        var question = $('#question').val();
        var answer =  $('#answer').val();
        var option1 = $('#option1').val();
        var option2 = $('#option2').val();
        var option3 = $('#option3').val();
        var option4 = $('#option4').val();

        var data ={
            "question": question,
            "answer": answer,
            "option1": option1,
            "option2": option2,
            "option3": option3,
            "option4": option4,
        };

        submitForm(cat,data);

    });

        /* submit form */
function submitForm(cat,data) {

   // console.log(cat,data);

    var url = DATA_URL + cat;

     /* post */
        if(flag == 0) {

            $.post(url, data,
            
                function(data, status){
               
               alert(`
                       Status: ${status}`);
           });
    
        }
        /* update */
        else{

           var url_update = url +'/'+id_temp;
           updateQuestion(url_update , data);
           flag= 0;

        }
}   

    $('#allTables').on("click",".edit",null,function(){

        var id = $(this).attr("id");
        var cat =$(this).attr("cat");

        id_temp = id;
      
        flag=1;
        
        $('.dropdown').addClass('dropdown-showhide');
        $('#question').focus();

        populateFormData(id,cat);
            
      });

      /* populate form */
    function populateFormData(id,cat){

        var url = DATA_URL+cat+'/'+id;

           $(".form").find("#submit").text('Save').addClass(".btn-color-chnage");

           $.get(url,function (data, textStatus, jqXHR) {

                //    console.log(data);
              //   $('#category').val(cat);

                $('#question').val(data.question);
                 $('#option1').val(data.option1);
                 $('#option2').val(data.option2);
                 $('#option3').val(data.option3);
                 $('#option4').val(data.option4);
                 $('#answer').val(data.answer); 
            }
        ); 
    }
    
  function updateQuestion(url,data) {
       
      /*   console.log(url);
      console.log('in update data');
       console.log(data);
 */
       $.ajax(
            {     
                type:'PUT',
                url: url,
                data: JSON.stringify(data),
                contentType:'application/json',
                success:function(data){
                  //  console.log('in update sucess');
                    alert("Data Updated!");
                },
                error:function(e){
                    console.log(e);
                }
                }
        );  
   }



   $('#allTables').on("click",".delete",null,function(){

        var id = $(this).attr("id");
        var cat =$(this).attr("cat");

    /*     console.log(cat);
        console.log(id);
 */
        deleteData(id,cat);
         
   });


   function deleteData(id,cat) {

        $.ajax(
            {
               type:'DELETE',

               url: `http://localhost:3000/${cat}/${id}`,

               success: function(data){
                 alert("Deleted succesfully");
               },
               error:function(){
                  console.log("error");
               }
            }
          );
    }


});