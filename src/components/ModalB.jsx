import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

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
const Modal2 = () => {
  const [contacts, setContacts] = useState([]);
  const [count, setCount] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [page,setPage] = useState(1)

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
      getContacts('https://contact.mediusware.com/api/country-contacts/United%20States/');
  }, []); 

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

   
    return (
        <div >
        <h2 className='text-center'>Modal-2</h2>
        

        <div className='mt-4'>
          <Link to='/allContacts' className="btn btn-outline-info mx-4">All Contacts</Link>
          <button  className='btn btn-success mx-4'>Us Contacts</button>
          <Link to='/problem-2' className='btn btn-outline-danger mx-4'>Close <span><IoCloseCircleSharp /></span></Link>
        </div>
      <br />
        <div>
            <h2>US Contact Information</h2>
            <p>Count: {count}</p>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4'>
                
                {contacts.map((contact) => {
                  return (
                    <div key={contact.id}>
                      <div>
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

            <p className='mt-4 text-center'>
            <button onClick={handlePreviousPage} disabled={!previousPage}><FaArrowAltCircleLeft /> Previous Page</button>
            <span className='mx-4'>Page {page}</span> 
            <button onClick={handleNextPage} disabled={!nextPage}>Next Page <FaArrowAltCircleRight /></button>
             </p>

        </div>
      {/* </Modal> */}
      {/* <Modal1 modal1IsOpen={modal1IsOpen} closeModal1={closeModal1}></Modal1> */}
        </div>
    );
};

export default Modal2;