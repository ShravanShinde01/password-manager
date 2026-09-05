import React from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useState, useEffect, useRef } from 'react'
import add from "../assets/add.gif"
import { v4 as uuidv4 } from 'uuid';




const Manager = () => {

    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const ref = useRef();
    const passwordref = useRef();

    useEffect(() => {
        let password = localStorage.getItem("password");
        let passwordArray;

        if (password) {
            setpasswordArray(JSON.parse(password))
        }

    }, [])


    const showpassword = () => {

        passwordref.current.type = 'text';

        console.log(ref.current.src);

        if (ref.current.src.includes("icons/clEye.png")) {
            ref.current.src = "icons/opEye.png"
            passwordref.current.type = 'text';
        } else {
            ref.current.src = "icons/clEye.png"
            passwordref.current.type = 'password';
        }
    }

    const savepassword = () => {
        if (!form.site || !form.username || !form.password) {
        alert("Please fill all fields");
        return;
    }

        // const updatedArray = [...passwordArray, {...form, id:uuidv4()}];
        setpasswordArray([...passwordArray, {...form, id:uuidv4()}])
        localStorage.setItem("password", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]))

        setform({site: "",username: "",password: ""
});
    }

   const deletepassword = (id) => {

      const confirmDelete = confirm("Are you sure you want to delete this password?");

       if (!confirmDelete) {
           return;
        }

    console.log("Deleting Password with id: " + id);
    const updatedPasswords = passwordArray.filter(item => item.id !== id);
    setpasswordArray(updatedPasswords);
    localStorage.setItem("password", JSON.stringify(updatedPasswords));

    };

 
    const editpassword = (id) => {

        console.log("editing Password with id : " + id );
        setform(passwordArray.filter(item=>item.id===id)[0])
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
        
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copytext = (text) => {
        toast.success('Text Copied', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text);

    }





    return (


        <div>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className=" bg-lime-100 mx-auto max-w-4xl flex flex-col justify-center items-center gap-5 p-10">

                <input value={form.site} name='site' onChange={handlechange} placeholder='Enter Website URL' className='bg-white border rounded-full px-4 w-full' type="text" />

                <div className='flex gap-4'>

                    <input value={form.username} name='username' onChange={handlechange} placeholder='Enter UserName' className='bg-white border px-4 rounded-full w-130' type="text" />

                    <div className="flex relative">
                        <input ref={passwordref} value={form.password} name='password' onChange={handlechange} placeholder='Enter Password' className='bg-white border px-4 rounded-full w-70' type='password' />
                        <span className='absolute right-3 w-6 cursor-pointer' onClick={showpassword}>
                            <img ref={ref} src="icons/clEye.png" alt="" />
                        </span>
                    </div>

                </div>

                <button onClick={savepassword} className='flex items-center  cursor-pointer border border-green-400 w-40 gap-1 rounded-4xl font-bold bg-green-300 hover:bg-green-500'>
                    <img src={add} alt="Add" className='w-10' />
                    Save Password
                </button>
                <div>
                    <h1 className='font-bold pb-2'>Your Passowrds</h1>
                    {passwordArray.length === 0 && <div>kay nay a ikde ja ghari javun zop......😴😴</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-00 bg-green-100">
                        <thead className='bg-green-700 text-white'>
                            <tr>
                                <th>URL</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className=' w-90 border border-gray-400'><div className='flex items-center justify-center relative text-center'><a href={item.site} target='_black'> {item.site}</a> <img className='w-4 cursor-pointer absolute right-4' onClick={() => { copytext(item.site) }} src="icons/copy.png" alt="" /></div></td>
                                    <td className=' w-60 border border-gray-400'><div className='flex items-center justify-center relative text-center'><span>{item.username}</span> <img className='w-4 cursor-pointer absolute right-4' onClick={() => { copytext(item.username) }} src="icons/copy.png" alt="" /></div></td>
                                    <td className=' w-60 border border-gray-400'><div className='flex items-center justify-center relative text-center'><span>{item.password}</span> <img className='w-4 cursor-pointer absolute right-4' onClick={() => { copytext(item.password) }} src="icons/copy.png" alt="" />  </div></td>
                                    <td className='w-40 border border-gray-400' ><div className='flex items-center justify-center gap-4'><span><img className='w-4 m-0.5' onClick={()=>{deletepassword(item.id)}} src="icons/Delete.png" alt="" /></span><span><img className='w-4' onClick={()=>{editpassword(item.id)}} src="icons/edit.png" alt="" /></span></div></td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>
            </div>
        </div>
    )
}

export default Manager
