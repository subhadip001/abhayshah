import React from 'react'

const Team = () => {
  return (
    <div className='h-[100vh] flex mx-auto'>
      <div className='w-[15%] bg-[#D4FCFF]'>
        <ul className="text-center">
          {[1,2,3,4,5,1,2,3,4,5,].map((d,i)=>{
            return(
              <>
                <li className='h-[calc(1.5rem+1.5vw)] flex items-center justify-center'><span>Firstname Lastname</span></li>
              </>
            )
          })}
        </ul>
      </div>
      <div className='w-[85%]'>
        <div className='h-[30%] relative'>upper
          <div className='block w-[calc(8vw+10rem)] h-[calc(8vw+10rem)] top-[calc(3.5rem-1.5vw)] left-14 bg-[#CECECE] absolute z-30'>pp</div>
        </div>
        <div className='h-[70%] bg-[#E7E7E7]'>lower</div>
      </div>
    </div>
  )
}

export default Team