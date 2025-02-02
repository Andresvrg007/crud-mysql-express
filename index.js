const d=document;
const $usersContainer=d.querySelector(".user-list");
const $bntDelete=d.querySelector(".btn delete");
const $bntSend=d.querySelector(".btnSend");

const $inputName= d.querySelector("#name");
const $lastName= d.querySelector("#lastname");
const $age= d.querySelector("#age");
const $init_date= d.querySelector("#init_date");
const $email= d.querySelector("#email");

let edit=false;
async function getUsers(params) {
    
    await fetch("https://crud-mysql-express-production.up.railway.app/")
    .then(res=>{
        if(!res.ok) throw new Error('Error en la solicitud')
            return res.json()
            
    }).then((res=>{
        let $users=res;
        $usersContainer.innerHTML='';
        $users.forEach(user=> {
            
            $usersContainer.innerHTML+=`
                <div class="user-card">
                <h3>${user.name} ${user.lastname}</h3>
                <p>${user.email}</p>
                <button class="btn update" data-id=${user.users_id}>Update</button>
                <button class="btn delete" data-id=${user.users_id}>Delete</button>
            </div>
            `
            //  card de usuario -->
            
        });


    })).catch((err=>{
        console.log(`ERROR: ${err.status}`)
    }))
}
getUsers()


//EVENTS WHEN YOU CLICK BNT DELETE AND EDIT

d.addEventListener("click",(e=>{
    if(e.target.className === 'btn delete'){
        let id= parseInt(e.target.dataset.id);
        (async () => {
            // Código asíncrono aquí
            try {
                const httpDelete= await fetch(`http://localhost:4000/${id}`,{
                    method:'DELETE'
                }) 
                if(!httpDelete.ok) throw new Error("ERROR EN LA ELIMINACION")
                    getUsers();
                    return;
            } catch (error) {
                console.log(`ERRO ${error.status}`)
            }
            
        })();
    }

    if(e.target.className === 'btn update'){
        let  fullName=e.target.parentNode.querySelector('h3').innerHTML;
        let  email=e.target.parentNode.querySelector('p').innerHTML;
        
        const [name, secondName] = fullName.split(/\s+/);
        
        $inputName.value=name;
        $lastName.value=secondName;
        $email.value=email;
        $bntSend.dataset.id=e.target.dataset.id
        edit=true;


        
    }

    if(e.target  === $bntSend){
        if(edit===false){
            if($inputName.value==='' || $lastName.value==='' || $age.value==='' || $age.value==='undefined' || $init_date.value==='' || $email===''){
                alert("THERE ARE EMPTY INPUTS")
            }else{
                (async () => {
                    try {
                        const pet = await fetch('http://localhost:4000', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                name: $inputName.value,
                                lastname: $lastName.value,
                                age: Number($age.value),
                                init_date: $init_date.value,
                                email: $email.value,
                            }),
                        });
                
                        if (!pet.ok) {
                            console.error('Error en la solicitud POST:', pet.status);
                            throw new Error('ERROR EN LA SOLICITUD');
                        }
                
                        
                        $inputName.value = '';
                        $lastName.value = '';
                        $age.value = '';
                        $init_date.value = '';
                        $email.value = '';
                        await getUsers(); // Llamada a getUsers
                    } catch (error) {
                        console.error('Error:', error.message);
                    }
                })();
            }
        }else{
            
            (async () => {
            // Código asíncrono aquí
            if($inputName.value==='' || $lastName.value==='' || $age.value==='' || $age.value==='undefined' || $init_date.value==='' || $email===''){
                alert("THERE ARE INPUTS EMPTY")
            }else{
                try {
                    const sendId=await fetch(`http://localhost:4000/${e.target.dataset.id}`,{
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: $inputName.value,
                            lastname: $lastName.value,
                            age: Number($age.value),
                            init_date: $init_date.value,
                            email: $email.value,
                        })
                    });
                    if(!sendId.ok){
                        throw Error('Error en la solicitud fetch')
                    }
                    $inputName.value = '';
                        $lastName.value = '';
                        $age.value = '';
                        $init_date.value = '';
                        $email.value = '';
                        edit=false;
                        await getUsers(); // Llamada a getUsers
                        
                   
                } catch (error) {
                    console.log(error)
                }
            }
           
        })();
        
        }
        
        
    }
}))
