
var siteName_field = document.getElementById('siteName');
var siteName_field_warning = document.getElementById('nameWarning');
var siteURL_field = document.getElementById('siteURL');
var siteURL_field_warning = document.getElementById('URLWarning');


let bookmark_list = [];


var bookmark = {
    name :'',
    URL:''
}
var localstorage_key='bookmarkList';
function submitBookmark()
{
    var newBookmark = Object.create(bookmark);

    if(validateInputs())
    {
        newBookmark.name = siteName_field.value;
        newBookmark.URL = siteURL_field.value;

        bookmark_list.push(newBookmark);

        localStorage.setItem(localstorage_key, JSON.stringify(bookmark_list));
        displayElement();
        console.log(bookmark_list);

    }
}

function validateInputs()
{
    var flag = true;

    if(!validateSiteNameField())
    {
        siteName_field_warning.style.setProperty("display","block","important");

        flag= false;
    }
    else 
    {
        siteName_field_warning.style.setProperty("display","none","important");
        flag= true;
    }

    if(!validateSiteURLField())
    {
        siteURL_field_warning.style.setProperty("display","block","important");

        flag= false;

    }

    else 
    {
        siteURL_field_warning.style.setProperty("display","none","important");
        flag= true;
    }

    return flag;
}


function validateSiteNameField()
{
    if(siteName_field.value)
    {
        return true;
    }

    return false;
}

function validateSiteURLField()
{
    if(siteURL_field.value)
    {
        return true;
    }

    return false;
}

function displayElement()
{
    var str= '';
    for(var i=0; i<bookmark_list.length; i++)
    {
        
        str = str + `<div class="bg-light py-4 px-3 d-flex">
            <div class='w-50 d-inline flex-fill'>
             <p class= "d-inline fw-bold fs-4" id ="bookmarkName">${bookmark_list[i].name}</p>
             </div>

             <div class= 'd-inline w-50 text-center flex-fill'>
             <a href="http://${bookmark_list[i].URL}"   target=”_blank” class="rounded-pill btn btn-outline-primary px-5" role="button" id ="bookmarkVisitBtn">Visit</a>
             <button class = 'rounded-pill btn btn-outline-primary px-3' id ="bookmarkDeleteBtn" onclick ="deleteBookmark(${i})">Delete</button>
        
            </div>

    </div>` 


    }

    document.getElementById('bookmarksContainer').innerHTML = str;

}

function deleteBookmark(rowIndex)
{
    bookmark_list.splice(rowIndex,1);
    localStorage.setItem(localstorage_key, JSON.stringify(bookmark_list));


 

    displayElement();

}
window.onload = function()
{
    var localstorageContent = JSON.parse(localStorage.getItem(localstorage_key));
    
    if(localstorageContent!=null)
    {
        bookmark_list =JSON.parse(localStorage.getItem(localstorage_key));
        displayElement(); 
    }
 

}
