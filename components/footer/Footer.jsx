import React from 'react'
import { AiFillLinkedin, AiOutlineTwitter, AiFillMail } from 'react-icons/ai';

const Footer = () => {
    return (
        <div className='h-[10vh] border-t-2 flex items-center border-[#3CC4FF]'>
            <div className='w-[93%] mx-auto flex justify-between items-center'>
                <div className='text-3xl flex justify-between items-center w-[10%]'>
                    <a href="http://" target="_blank" rel="noopener noreferrer"><AiFillLinkedin /></a>
                    <a href="http://" target="_blank" rel="noopener noreferrer"><AiOutlineTwitter /></a>
                    <a href="http://" target="_blank" rel="noopener noreferrer"><AiFillMail /></a>
                </div>
                <div>
                    <span>&copy; 2023 Cypher Apps | All Rights Reserved</span>
                </div>
            </div>
        </div>
    )
}

export default Footer