const cl = console.log;

const form = document.getElementById('form')
const loader = document.getElementById('loader')
const username = document.getElementById('username')
const cardcontainer = document.getElementById('cardcontainer')


const BASE_URL = `https://api.github.com/users` 

const snackbar = (msg, i) =>{
    Swal.fire({
        title: msg,
        icon: i,
        timer: 1000
    })
}
const apicall = async(url, method, body) =>{
    try{
        loader.classList.remove('d-none')
      body = body? JSON.stringify(body) : null
        let res = await fetch(url,{
            method: method,
            body: body
        } )
        return res.json()
    }catch(err){
        snackbar(err, 'error')
    }finally{
        loader.classList.add('d-none')
    }

}



const onsubmit = async (e) => {
    try{
        e.preventDefault()
        let userurl = `${BASE_URL}/${username.value}`
        let reposurl = `${BASE_URL}/${username.value}/repos`
        let promisearr = [apicall(userurl ,"GET" ), apicall(reposurl, 'GET')]
let [userdata, repodata] = await Promise.all(promisearr)
let fivearr = repodata.splice(0,5)
cl(userdata)
cl(repodata)
cardcontainer.innerHTML = `<div class="card">
                <div class="card-body">
                    <figure>
                        <div class="logoimg">
                            <img src="${userdata.avatar_url}" alt="">
                        </div>
                    </figure>
                        <h4 class="text-center">${userdata.login}</h4>
                    <div class="info d-flex justify-content-around mt-3">
                        <span>Followers : ${userdata.followers}</span>
                        <span>Following: ${userdata.following}</span>
                        <span>Repos: ${userdata.public_repos}</span>
                    </div>
                    <h6 class="text-center mt-4">
                        Recent Repositories
                    </h6>
                    <div class="repos my-4">
                        <div class="repo3 d-flex justify-content-around">
                         <a target="_blank" href="${fivearr[0].html_url}">${fivearr[0].name}</a>
                         <a target="_blank" href="${fivearr[1].html_url}">${fivearr[1].name}</a>
                         <a target="_blank" href="${fivearr[2].html_url}">${fivearr[2].name}</a>
                    </div>
                       <div class="repo2 d-flex justify-content-around">
                         <a target="_blank" href="${fivearr[3].html_url}">${fivearr[3].name}</a>
                         <a target="_blank" href="${fivearr[4].html_url}">${fivearr[4].name}</a>
                       </div>
                    </div>
                </div>
            </div>`

            form.reset()
    }catch(err){
        snackbar(err,'error')
    }

}

form.addEventListener('submit', onsubmit)