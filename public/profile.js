const addInfo = (res) => {
    const gallery = document.querySelector(".profile");
    let html = "";
      html += `
      <div class="container">
				<div class="profile">
					<div class="profile-image">
						<img src="${res.profile_image.large}" alt="">
					</div>
					<div class="profile-user-settings">
						<h1 class="profile-user-name">${res.username}</h1>
					</div>
					<div class="profile-stats">
						<ul>
							<li><span class="profile-stat-count">${res.total_photos}</span> photos</li>
							<li><span class="profile-stat-count">${res.followers_count}</span> followers</li>
							<li><span class="profile-stat-count">${res.following_count}</span> following</li>
						</ul>
					</div>
					<div class="profile-bio">
						<p><span class="profile-real-name">${res.name}</span> ${res.bio}</p>
					</div>

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

  const showImg = (res) => {
    const image = document.querySelector(".gallery");
    let html = "";
    res.forEach((element) => {
    html += `
      <div class="gallery-item" tabindex="0">
        <img src="${element.urls.raw}" class="gallery-image" alt="">
        <div class="gallery-item-info">
          <ul>
            <li class="gallery-item-likes"><span> Likes: </span>${element.likes} </li> 
          </ul> 
        </div> 
      </div> 
      `
  ;
    });
  image.innerHTML = html;
  };
  
  const callIMG = async (username) => {
    try {
      console.log("username --> ",username);
      const response = await fetch("/api/showImage", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username
        }),
      });
      const res = await response.json();
      //check response return from our API
      console.log("response ----> ", res);
      //6. Add images to gallery
      showImg(res);
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
      callIMG(username);
  }
  else{
      console.log("Plase input username");
  }
  //console.log(queryString);
  };
  main();