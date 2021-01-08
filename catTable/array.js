$(document).ready(function () {

    var categories =["html", "js","php"];


    $.each(categories, function (key, value) { 
        
        // console.log(value);
        
             var url = "http://localhost:3000/" + value;

        //  console.log(url);
        $.get(url,
            (data, textStatus, jqXHR) => {
                var tables = ""; 

                console.log(value);
                console.log(data);

                tables += '<table class="table table-hover"><thead class="thead-dark w-100"><tr><th scope="col">Id</th>   <th scope="col">name</th>      <th scope="col">Operations</th> </tr></thead> <tbody>';


                for(var i=0; i< data.length; i++){

                    // $('#html').append( ` <tr id="row${data[i].id}"> 
                    //                             <td id="id${data[i].id}"> ${data[i].id}</td><br/>
                    //                             <td id="name${data[i].id}">${data[i].name}</td><br/>  
                    //                             <td><button id="${data[i].id}" class="btn btn-warning edit" cat=${value} >Edit</button> 
                    //                             <button id="${data[i].id}" class=" btn btn-danger delete"  cat=${value}>Delete</button></td> 
                    //                             <tr/> ` 
                    // );

                    tables += `<tr id="row${data[i].id}"> 
                    <td id="id${data[i].id}"> ${data[i].id}</td><br/>
                    <td id="name${data[i].id}">${data[i].name}</td><br/>  
                    <td><button id="${data[i].id}" class="btn btn-warning edit" cat=${value} >Edit</button> 
                    <button id="${data[i].id}" class=" btn btn-danger delete"  cat=${value}>Delete</button></td> 
                    <tr/>`;
                }
                tables += '</tbody></table>';
                $('#allTables').append(tables);

                
            }
           
            
        );
    });
});