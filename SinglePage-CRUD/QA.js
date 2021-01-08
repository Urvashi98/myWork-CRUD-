var flag =0;
var flag_cat =0;
var id_temp;
var limit = 0;

$(document).ready(function () {
  
    // $('#display-data').click(function (e) { 

     
    //     e.preventDefault();

    //     if(limit == 0 ){

    //         $.get("http://localhost:3000/data",  // url
                
    //         function (data) {  // success callback
        
    //             var cat = data; 
    
    //                 for(var i=0; i< data.length; i++){
    //                    /*  console.log(data[i].question); */
    //                     $('#tableData').append(` <tr id="row${data[i].id}"> 
    //                                                 <td id="id${data[i].id}"> ${data[i].id}</td><br/>
    //                                                 <td id="question${data[i].id}">${data[i].question}</td><br/>  
    //                                                 <td id="option1${data[i].id}">${data[i].option1}</td><br/>  
    //                                                 <td id="option2${data[i].id}">${data[i].option2}</td><br/>  
    //                                                 <td id="option3${data[i].id}">${data[i].option3}</td><br/> 
    //                                                 <td id="option4${data[i].id}">${data[i].option4}</td><br/> 
    //                                                 <td id="answer${data[i].id}">${data[i].answer}</td><br/> 
    //                                                 <td><button id="${data[i].id}" class="edit" >Edit</button> 
    //                                                 <button id="${data[i].id}" class="delete" >Delete</button></td> 
    //                                                 <tr/> ` );
                     
        
    //                 }
                
    //         });

    //         limit= 1;
            
    //     }
   
    // });
    
    /* show data on page load ... */

    $.get("http://localhost:3000/data",  // url
                
    function (data) {  // success callback

        var cat = data; 

            for(var i=0; i< data.length; i++){
               /*  console.log(data[i].question); */
                $('#tableData').append(` <tr id="row${data[i].id}"> 
                                            <td id="id${data[i].id}"> ${data[i].id}</td><br/>
                                            <td id="question${data[i].id}">${data[i].question}</td><br/>  
                                            <td id="option1${data[i].id}">${data[i].option1}</td><br/>  
                                            <td id="option2${data[i].id}">${data[i].option2}</td><br/>  
                                            <td id="option3${data[i].id}">${data[i].option3}</td><br/> 
                                            <td id="option4${data[i].id}">${data[i].option4}</td><br/> 
                                            <td id="answer${data[i].id}">${data[i].answer}</td><br/> 
                                            <td><button id="${data[i].id}" class="edit" >Edit</button> 
                                            <button id="${data[i].id}" class="delete" >Delete</button></td> 
                                            <tr/> ` );
             

            }
        
    });

         /* show LIT questions on page load */

         $.get("http://localhost:3000/lit",  // url
                
         function (lit) {  // success callback
            
            var cat = lit;
 
                 for(var i=0; i< lit.length; i++){
                    /*  console.log(data[i].question); */
                     $('#tableLit').append(` <tr id="row${lit[i].id}"> 
                                                 <td id="id${lit[i].id}"> ${lit[i].id}</td><br/>
                                                 <td id="question${lit[i].id}">${lit[i].question}</td><br/>  
                                                 <td id="option1${lit[i].id}">${lit[i].option1}</td><br/>  
                                                 <td id="option2${lit[i].id}">${lit[i].option2}</td><br/>  
                                                 <td id="option3${lit[i].id}">${lit[i].option3}</td><br/> 
                                                 <td id="option4${lit[i].id}">${lit[i].option4}</td><br/> 
                                                 <td id="answer${lit[i].id}">${lit[i].answer}</td><br/> 
                                                 <td><button id="${lit[i].id}" class="edit-lit" >Edit</button> 
                                                 <button id="${lit[i].id}" class="delete-lit" >Delete</button></td> 
                                                 <tr/> ` );
                  
     
                 }
             
         }); 



    /* POST and UPDATE  */
    $('#submit').click(function (e) { 

       // e.preventDefault();
       /*  alert($('#category :selected').text()); */
        var cat = $('#category :selected').text();
        var question = $('#que').val();
        var answer =  $('#answer').val();
        var option1 = $('#option1').val();
        var option2 = $('#option2').val();
        var option3 = $('#option3').val();
        var option4 = $('#option4').val();
        
        var url = "http://localhost:3000/"+cat;

        console.log(url);

        /* post data */
        if(flag==0){
                    $.post(url,
                    {
                        question: question,
                        answer: answer,
                        option1: option1,
                        option2: option2,
                        option3: option3,
                        option4: option4,
                    },
                function(data, status){
                    
                    alert(`
                            Status: ${status}`);
                });
        }

        else{
                    
            /* update data */

            var myData = { 
                
                "question": question,
                "answer": answer,
                "option1": option1,
                "option2": option2,
                "option3": option3,
                "option4": option4
            };

            if(flag_cat == 0){

                $.ajax(
                    {     
                        type:'PUT',
                        url: 'http://localhost:3000/data/'+id_temp,
                        data: JSON.stringify(myData),
                        contentType:'application/json',
                        success:function(data){
                        
                            console.log(data);
                        },
                        error:function(e){
                            console.log(e);
                        }
                        }
                ); 
            }
            else {
               
                $.ajax(
                    {     
                        type:'PUT',
                        url: 'http://localhost:3000/lit/'+id_temp,
                        data: JSON.stringify(myData),
                        contentType:'application/json',
                        success:function(data){
                        
                            console.log(data);
                        },
                        error:function(e){
                            console.log(e);
                        }
                        }
                ); 
            }
            flag=0;

           }
    });

    /* end submit update */

    /* Populate form  */

    $("#tableData").on("click",".edit",null,function(){

        var id = $(this).attr("id");
        var cat =$(this).attr("")
        id_temp = id;
      
        flag=1;
        
        populateFormData(id);
            
      });

      $("#tableLit").on("click",".edit-lit",null,function(){

        var id = $(this).attr("id");
         //var cat =$(this).attr("")
         id_temp = id;
      
         flag=1;
         flag_cat = 1;

         console.log(id);
         populateFormData(id);

      });


    /* edit and update values */

    function populateFormData(id){

        $("#submit").attr('value', 'Save'); //change btn value

        if(flag_cat==0){

            $.get(`http://localhost:3000/data/${id}`,

            function (data, textStatus, jqXHR) {
             $('#category :selected').text("data");
              $('#que').val(data.question);
              $('#option1').val(data.option1);
              $('#option2').val(data.option2);
              $('#option3').val(data.option3);
              $('#option4').val(data.option4);
              $('#answer').val(data.answer);
 
            }
            
        );
 
        }else{
            
            $.get("http://localhost:3000/lit/"+id,

            function (data, textStatus, jqXHR) {
             $('#category :selected').text("data");
              $('#que').val(data.question);
              $('#option1').val(data.option1);
              $('#option2').val(data.option2);
              $('#option3').val(data.option3);
              $('#option4').val(data.option4);
              $('#answer').val(data.answer);
     
            }
        );
     
        }
    }


    //delete from data

    $("#tableData").on("click",".delete",null,function(){

        var id = $(this).attr("id");

        console.log("id",id);
          $.ajax(
            {
               type:'DELETE',
               url: 'http://localhost:3000/data/'+id,
               success:function(data){
                 console.log("Deleted succesfully");
               },
               error:function(){
                  console.log("error");
               }
            }
          );

      });

      $("#tableLit").on("click",".delete-lit",null,function(){

        var id = $(this).attr("id");

        console.log("id",id);
          $.ajax(
            {
               type:'DELETE',
               url: `http://localhost:3000/lit/${id}`,
               success:function(data){
                   console.log(data);
                 console.log("Deleted succesfully");
               },
               error:function(){
                  console.log("error");
               }
            }
          );

      });


});

