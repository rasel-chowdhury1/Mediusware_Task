import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';

const Problem1 = () => {

    const [show, setShow] = useState('all');
    const { register, handleSubmit, reset } = useForm();
    const [formData,setFormData] = useState([])

    const handleClick = (val) =>{
        setShow(val);
    }

    //this function set data from localStorage in formData state
    const getUserData = () =>{
        const storedUserData = JSON.parse(localStorage.getItem("userData"));
        setFormData(storedUserData)
    }
    
    //this useEffect execute one time for each component render
    useEffect(()=>{
        getUserData();
    }, [])

    //when user clicked submit button then execute this code
    const onSubmit = (data) => {
        const userFromData = {
            name: data.name,
            status: data.status
        };
    
        if (!formData) {
            setFormData(userFromData);
            localStorage.setItem('userData', JSON.stringify([userFromData]));
            getUserData();
            reset();
        } else {   
            formData.push(userFromData)
            localStorage.setItem('userData', JSON.stringify(formData));
            getUserData();
            reset();
        }
    };
    
    
    //this sort function building for custom order
    function customSort(x, y) {
        const str1 = x.status.toLowerCase();
        const str2 = y.status.toLowerCase();
        const isActiveX = /^active/i.test(str1);
        const isActiveY = /^active/i.test(str2);
        const isCompletedX = /^completed/i.test(str1);
        const isCompletedY = /^completed/i.test(str2);
    
        if (isActiveX && !isActiveY) {
            return -1;
        } 
        else if (!isActiveX && isActiveY) {
            return 1;
        }
        else if (isCompletedX && !isCompletedY) {
            return -1;
        } 
        else if (!isCompletedX && isCompletedY) {
            return 1;
        }
        else if(str1 < str2) {
            return 1;
          }
        else if (str1 > str2) {
            return -1;
          }
        else{
            return 0;
        }
    }

    const activeStatusData = formData && formData.filter((user) => user.status.toLowerCase() === 'active')
    const completedStatusData = formData && formData.filter((user) => user.status.toLowerCase() === 'completed')

    let status;
    if(show === 'all'){
        status = formData && formData.sort(customSort);
    }else if(show === 'active'){
        status = activeStatusData;
    }else if(show === 'completed'){
        status = completedStatusData;
    }

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form onSubmit={handleSubmit(onSubmit)} className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input {...register("name", {required: true})} type="text" className="form-control" placeholder="Name"/>
                        </div>
                        <div className="col-auto">
                            <input {...register("status", {required: true})} type="text" className="form-control" placeholder="Status"/>
                        </div>
                        <div className="col-auto">
                            <input type="submit" value="Submit" className="btn btn-primary" />
                        </div>
                    </form>
                </div>

                <div className="col-8 ">
                    <div>
                        <ul className="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
                            <li className="nav-item">
                                <button  className={`nav-link ${show==='all' && 'active'}`} type="button" onClick={()=>handleClick('all')}>All</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${show==='active' && 'active'}`} type="button" onClick={()=>handleClick('active')}>Active</button>
                            </li>
                            <li className="nav-item">
                                <button  className={`nav-link ${show==='completed' && 'active'}`} type="button" onClick={()=>handleClick('completed')}>Completed</button>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content"></div>
                    <table className="table table-striped border px-4">
                        <thead className='text-center'>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody className='text-center'>
                        {
                            status && status.map((user) => (
                            <tr key={user.name} className='mx-20'>
                            <td scope="col">{user.name}</td>
                            <td scope="col">{user.status}</td>
                        </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default Problem1;