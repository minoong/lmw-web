import React from 'react'

function Spinner() {
 return (
  <div className="flex items-center justify-center">
   <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 via-amber-400 to-pink-500 animate-spin">
    <div className="h-3 w-3 rounded-full bg-gray-200" />
   </div>
  </div>
 )
}

export default React.memo(Spinner)
