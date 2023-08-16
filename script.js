const userInput = document.querySelector('.user-name');
const searchtab = document.querySelector('.search-tab');
const submit = document.querySelector('[submit-btn]');
const userName = document.querySelector('[userName]');
const joiningDate = document.querySelector('[joining]');
const userImage = document.querySelector('[user-image');
const userId = document.querySelector('[user-id]');
const desc = document.querySelector('[desc]');
const repoCnt = document.querySelector('[repos]');
const followers = document.querySelector('[followers]');
const following = document.querySelector('[following]');
const userLocation = document.querySelector('[location]');
const blog = document.querySelector('[blog]');
const twitter = document.querySelector('[twitter]');
const company = document.querySelector('[company]');
const error = document.querySelector('[error]');

const theme = document.querySelector('[dark-light]');
console.log(theme);
// theme.textContent = 'LIGHT';

get();

async function get(){
    try{
        const response = await fetch(`https://api.github.com/users/jatin-pandey01`);
        const data = await response.json();
        if(data?.message === "Not Found"){
            throw data;
        }
        else{
            getData(data);
        }
    }
    catch(e){
        error.textContent = "No Search Results";
        error.style.opacity = '1';
        setTimeout(function(){
            error.style.opacity = '0';
        },2000);
    }
}

const monthArray = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

searchtab.addEventListener('submit',async function fetchUserIdentity(e){
    e.preventDefault();
    // console.log('Hello');   
    let name = userInput.value;
    // console.log(name);
    try{
        const response = await fetch(`https://api.github.com/users/${name}`);
        const data = await response.json();
        // console.log(data.name);
        if(data?.message === "Not Found"){
            throw data;
        }
        else{
            getData(data);
        }
        
    }
    catch(e){
        console.log('You have entered wrong name');
        error.textContent = "No Search Results";
        error.style.opacity = '1';
        setTimeout(function(){
            error.style.opacity = '0';
            userInput.value = "";
        },2000);
    }
    
    // getData(data);
});

function getData(data){
    userName.textContent = data?.name;
    const date = new Date(`${data?.created_at}`);
    // console.log(date);
    // console.log(date.getDate() + " " +monthArray[date.getMonth()]+" "+date.getFullYear());
    joiningDate.textContent = "Joined "+date.getDate() + " " +monthArray[date.getMonth()]+" "+date.getFullYear();
    userImage.src = data?.avatar_url;
    userId.href = data?.html_url;
    userId.textContent = "@"+data?.login;
    desc.textContent = data?.bio;
    repoCnt.textContent = data?.public_repos;
    followers.textContent = data?.followers;
    following.textContent = data?.following;

    if(data?.location) 
        userLocation.textContent = data?.location;
    else 
        userLocation.textContent = "Not Available";

    if(data?.blog){
        blog.href = data?.blog;
        blog.textContent = data?.blog;
    }
    else{
        blog.href = '#';
        blog.textContent = "Not Available"
    }

    if(data?.twitter_username){
        twitter.href = `https://twitter.com/${data?.twitter_username}`;
        twitter.textContent = data?.twitter_username;
    }
    else{
        twitter.href = '#';
        twitter.textContent = 'Not Available';
    }
        
    if(data?.company){
        company.textContent = data?.company;
    }
    else{
        company.textContent = 'Not Available'
    }
    // console.log(company.textContent+" company ");
}

