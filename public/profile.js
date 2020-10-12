const addInfo = (res) => {
    const gallery = document.querySelector(".profile");
    let html = "";
      html += `
      <div class="w3-card w3-round w3-white">
        <div class="w3-container">
         <p class="w3-center"><img src="${res.profile_image.medium}" class="w3-circle" style="height:106px;width:106px" alt="Avatar"></p>
         <h2>${res.username}</h2>
         <hr>
         <p><i class='fas fa-user-alt' style='font-size:24px'></i>${res.followers_count} Follow</p>
         <p><i class='fas fa-user-friends' style='font-size:24px'></i>${res.following_count} Following</p>
        </div>
      </div>
      `;
    gallery.innerHTML = html;
  };
  const callAPI = async (username) => {
    try {
      console.log("Username --> ", username);
      const response = await fetch("/api/searchUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const res = await response.json();
      //check response return from our API
      console.log("response ----> ", res);
  //6. Add images to gallery
      addInfo(res);
    } catch (error) {
      console.log("message error --->", error);
    }
  };
  
  const main = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const username = urlParams.get('username')
  console.log(username);
  if(urlParams.has('username')){
      callAPI(username);
  }
  else{
      console.log("Plase input username");
  }
  //console.log(queryString);
  };
  main();