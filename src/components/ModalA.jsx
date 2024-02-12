import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root'); 
const ModalA = () => {
  const [contacts, setContacts] = useState([]);
  const [all,setAll] = useState(false)
  const [count, setCount] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [showEvenIds, setShowEvenIds] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [page,setPage] = useState(1)
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);


  const getContacts = (url) => {
      fetch(url)
          .then(res => res.json())
          .then(data => {
              setCount(data.count);
              setNextPage(data.next);
              setPreviousPage(data.previous);
              setContacts(data.results);
          })
          .catch(error => console.error('Error fetching contacts:', error));
  };

  useEffect(() => {
      getContacts('https://contact.mediusware.com/api/contacts/');
  }, [all]); 

  const handleNextPage = () => {
      if (nextPage) {
          getContacts(nextPage);
          setPage(page+1)
      }
  };

  const handlePreviousPage = () => {
      if (previousPage) {
          getContacts(previousPage);
          setPage(page-1)
      }
  };


    const handleCheckboxChange = () => {
      setShowEvenIds(!showEvenIds);
    };
   
    const onSubmit = (data) => {
      const query = data.searchQuery.toLowerCase();
      
      const result = contacts.filter((contact) => {
        const text = contact.country.name.toLowerCase();
        const phone = contact.phone
        // console.log('this text is - ',text)
        if(text.search(`${query}`) >= 0){
          // console.log(contact)
          return true;
        }
        else if(phone.search(`${query}`) >= 0){
          return true
        }
      })
      
      setContacts(result)
      reset()
      console.log('result array ',result)
    }

    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }
    
    return (
        <div >

          <h2 className='text-center'>Modal-1</h2>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="row gy-2 gx-3 align-items-center mb-4">
                <div className="col-auto">
                    <input {...register("searchQuery", {required: true})} type="text" className="form-control" placeholder="Search Contact"/>
                </div>
                <div className="col-auto">
                    
                    <input type="submit" value="Search" className="btn btn-primary" />
                </div>
            </form>
          </div>

          <div className='mt-4  justify-content-center'>
            <button onClick={() =>setAll(!all)} className='btn btn btn-success mx-4'>All Contacts</button>
            <Link to="/usContacts" className="btn btn-outline-info mx-4">Us Contacts</Link>
            <Link to='/problem-2' className='btn btn-outline-danger mx-4' >Close <span><IoCloseCircleSharp /></span></Link>
          </div>
          <br />
          <div>

              <h2>All Contact Information</h2>
              <p>Count: {count}</p>

              <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4'>

                {contacts.map((contact) => {
                  if (showEvenIds && contact.id % 2 !== 0) {
                    return null;
                  }
                  return (
                    <div key={contact.id}>
                      <div onClick={openModal}>
                        <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body">
                      <h5 className="card-title">Contact Id : {contact.id}</h5>
                      <h6 className="card-subtitle mb-2 text-body-secondary">Country Name: <span className='fw-bold'>{contact.country.name}</span></h6>
                      <p>Phone : {contact.phone}</p>
                    </div>
                        </div>
                      </div>
                  </div>
                    
                  );
                })}

              </div>

              <label className='my-4'>
                Show All Even IDs Contact - 
                <input
                  type='checkbox'
                  checked={showEvenIds}
                  onChange={handleCheckboxChange}
                  className=''
                />
              </label>
              

              <p className='mt-4 text-center'>
            <button onClick={handlePreviousPage} disabled={!previousPage}><FaArrowAltCircleLeft /> Previous Page</button>
            <span className='mx-4'>Page {page}</span> 
            <button onClick={handleNextPage} disabled={!nextPage}>Next Page <FaArrowAltCircleRight /></button>
             </p>

          </div>
          
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
            
            <div>I am a modal</div>
            <div class="card">
            <div class="card-header text-center ">
                Country 
            </div>
            <div class="card-body">
                <h4 class="card-title">Country Name </h4>
                <h5 class="card-title">Phone </h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content...</p>
                
            </div>

            <button onClick={closeModal}>close X</button>
           </div>
          </Modal>

        </div>        
    );
};

export default ModalA;