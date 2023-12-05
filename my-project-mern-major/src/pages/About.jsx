import React from 'react'


const About = () => {
  return (
    <>
    <div className='flex justify-center'>
      <div className='mt-28'>
      <div className="bg-gray-100 ">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-gray-700 mb-8">
          Welcome to our company! Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nulla facilisi. Vestibulum fermentum purus eu orci dictum, in gravida ex vulputate.
          Nunc vehicula mauris nec libero scelerisque, sit amet malesuada elit interdum.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
              Vestibulum fermentum purus eu orci dictum, in gravida ex vulputate. Nunc vehicula
              mauris nec libero scelerisque, sit amet malesuada elit interdum.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
              Vestibulum fermentum purus eu orci dictum, in gravida ex vulputate. Nunc vehicula
              mauris nec libero scelerisque, sit amet malesuada elit interdum.
            </p>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
    </>
  )
}

export default About