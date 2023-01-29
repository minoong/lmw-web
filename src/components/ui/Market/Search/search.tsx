import { useAtom } from 'jotai'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoIosClose } from 'react-icons/io'
import { searchState } from '~/stores/atoms/searchState'

function Search() {
 const [search, setSearch] = useAtom(searchState)

 function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
  setSearch(e.target.value)
 }

 function handleOnkeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key === 'Escape') {
   setSearch('')
  }
 }

 function handleCloseOnClick() {
  setSearch('')
 }

 return (
  <div className="w-full flex items-center p-1 border-b relative bg-white">
   <input
    className="flex-1 outline-none border-0 p-1 text-[#333] font-bold text-xs pr-9"
    type="text"
    placeholder="코인명/심볼검색"
    value={search}
    onChange={handleOnChange}
    onKeyDown={handleOnkeyDown}
   />
   {search && (
    <button className="absolute right-[34px]" onClick={handleCloseOnClick}>
     <IoIosClose size={24} />
    </button>
   )}
   <AiOutlineSearch size={24} fill="#1261c4" />
  </div>
 )
}

export default React.memo(Search)
