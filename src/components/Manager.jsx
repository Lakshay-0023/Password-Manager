import React from 'react'
import { useState } from 'react';
import { useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copytext = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
        navigator.clipboard.writeText(text);
    }


    const showpassword = () => {
        if (ref.current.src.includes("/icons/eye.png")) {
            ref.current.src = "/icons/delete.png"
            passwordref.current.type = "password"
        }
        else {
            ref.current.src = "/icons/eye.png"
            passwordref.current.type = "text"
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    const savepassword = () => {
        if (form.site.length >= 3 && form.username.length >= 3 && form.password.length >= 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })

            toast('Password Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        }
        else{
            toast('Password NOT Saved!', {

            });
        }
    }

    const deletepassword = (id) => {
        console.log("Deleting password for the id :", id);
        let c = confirm("Do you really want to delete this password")
        if (c) {
            setPasswordArray(passwordArray.filter((item) => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item) => item.id !== id)))
            toast('Password deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",


            });
        }
    }

    const editpassword = (id) => {
        console.log("Editing Password for the id :", id)
        setform(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter((i) => i.id !== id))
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <ToastContainer />
            <div>
                <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            </div>
            <div className="p-2 md:mycontainer mx-auto md:w-5/6 ">
                <h1 className='text-4xl font-bold text-center '>
                    <span className="text-green-500">&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own password manager</p>

                <div className="flex flex-col text-black p-4 gap-6 items-center ">
                    <input placeholder='Enter website URL' type="text" value={form.site} onChange={handleChange} className="rounded-full border text-black border-green-500 w-full p-4 py-1" name="site" id="site" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input placeholder='Enter Username' type="text" value={form.username} onChange={handleChange} className="rounded-full border border-green-500 w-full p-4 py-1" name="username" id="username" />
                        <div className='relative'>

                            <input ref={passwordref} placeholder='Enter Password' type="text" value={form.password} onChange={handleChange} className="rounded-full border border-green-500 w-full p-4 py-1" name="password" id="password" />
                            <span className='absolute right-[8px] top-[8px] cursor-pointer' onClick={showpassword}>
                                <img ref={ref} width={19} src="/icons/eye.png" alt="eye" />
                            </span>
                        </div>

                    </div>
                    <button onClick={savepassword} className='flex justify-center gap-2 items-center bg-green-400 hover:bg-green-300 rounded-full px-6 py-1 w-fit border border-green-900' >
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='text-2xl font-bold py-2'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to display</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>

                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className=' text-center  py-2 border-2 border-white'>
                                            <div className='flex md:gap-2 justify-center items-center'>
                                                <span><a href={item.site} target="_blank">{item.site}</a></span>
                                                <img onClick={() => { copytext(item.site) }} className='cursor-pointer' width={20} src="/icons/copy.png" alt="" />
                                            </div>
                                        </td>
                                        <td className='text-center  py-2 border-2 border-white'>
                                            <div className=' flex md:gap-2 justify-center items-center '>
                                                <span>{item.username}</span>
                                                <img onClick={() => { copytext(item.username) }} className='cursor-pointer' width={20} src="/icons/copy.png" alt="" />
                                            </div>
                                        </td>
                                        <td className='text-center  py-2 border-2 border-white'>
                                            <div className='flex md:gap-2 justify-center items-center '>
                                                <span >{item.password}</span>
                                                <img onClick={() => { copytext(item.passowrd) }} className='cursor-pointer' width={20} src="/icons/copy.png" alt="" />
                                            </div>
                                        </td>
                                        <td className=' flex md:gap-2 justify-center items-center text-center  py-2 border-2 border-white'>
                                            <img onClick={() => { editpassword(item.id) }} className='cursor-pointer' width={16} src="/icons/pencil.png" alt="" />
                                            <span onClick={() => { deletepassword(item.id) }} className='cursor-pointer'><lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon></span>
                                        </td>
                                    </tr>

                                })}
                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
