var flag =0;
var id_temp;
var cat= '';

$(document).ready(function () {

    /* data page... */
    $('#data').ready(function () {

        cat = 'data';

        fetchData(cat);

      /*  loadform(); */
        
        $('#save').click(function (e) { 

            submitForm(cat);

        });

    });

    /* data page... */
    $('#literature-page').ready(function () {

        cat = 'lit';

        fetchData(cat);

      /*  loadform(); */
        
        $('#save').click(function (e) { 

            submitForm(cat);

        });

    });




    /* LOAD  DATAAAA */
  function fetchData(category){
        console.log("In fetch");
    // console.log("http://localhost:3000/"+category);
   
        $.get("http://localhost:3000/" + category,  // url
                
        function (data) {  // success callback
            
         //   console.log(data.category);
            console.log(data);
                for(var i=0; i< data.length; i++){
                   /*  console.log(data[i].question); */
                    $('#table').append(` <tr id="row${data[i].id}"> 
                                                <td id="id${data[i].id}"> ${data[i].id}</td><br/>
                                                <td id="question${data[i].id}">${data[i].question}</td><br/>  
                                                <td id="option1${data[i].id}">${data[i].option1}</td><br/>  
                                                <td id="option2${data[i].id}">${data[i].option2}</td><br/>  
                                                <td id="option3${data[i].id}">${data[i].option3}</td><br/> 
                                                <td id="option4${data[i].id}">${data[i].option4}</td><br/> 
                                                <td id="answer${data[i].id}">${data[i].answer}</td><br/> 
                                                <td><button id="${data[i].id}" class="edit" cat=${category} >Edit</button> 
                                                <button id="${data[i].id}" class="delete"  cat=${category}>Delete</button></td> 
                                                <tr/> ` );
                 
    
                }
            
        });
      }

    /*   function loadform(){

          $('#load-form').load('form.html #myform');


        } */

      function submitForm(category){

        console.log(category);
           
         
            var question = $('#que').val();
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

            var url = `http://localhost:3000/${category}/`;
    
           /*     console.log(url); */
    
            /* post data */

            if(flag==0){

                saveData(url,data);
            }
    
            else{
                var url_update = url+id_temp
                 updateData(url_update, data);
                flag=0;
               }
        
    }

    /* POST data */
    function  saveData(url,data){
        $.post(url,
             data,
        function(data, status){
            
            alert(`
                    Status: ${status}`);
        });
    }

      /* Update data */
    function updateData(url,data) {

        $.ajax(
            {     
                type:'PUT',
                url: url,
                data: JSON.stringify(data),
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

    
    /* Populate form  */
    $("#table").on("click",".edit",null,function(){

        var id = $(this).attr("id");
        var cat =$(this).attr("cat");

        console.log(cat);

        id_temp = id;
      
        flag=1;
        
        populateFormData(id,cat);
            
      });


    /* edit and update values */
    function populateFormData(id,cat){

        $("#save").attr('value', 'Save'); //change btn value

            $.get(`http://localhost:3000/${cat}/${id}`,

                function (data, textStatus, jqXHR) {

                $('#que').val(data.question);
                $('#option1').val(data.option1);
                $('#option2').val(data.option2);
                $('#option3').val(data.option3);
                $('#option4').val(data.option4);
                $('#answer').val(data.answer);
    
                }
            
        );
 
        
    }


    //delete from data

    $("#table").on("click",".delete",null,function(){

        var id = $(this).attr("id");
        var cat =$(this).attr("cat");
        console.log("id",id);
         
        deleteData(id,cat);

    });

       //delete function
    function deleteData(id,cat) {

        $.ajax(
            {
               type:'DELETE',

               url: `http://localhost:3000/${cat}/${id}`,

               success: function(data){
                 console.log("Deleted succesfully");
               },
               error:function(){
                  console.log("error");
               }
            }
          );
    }


});

