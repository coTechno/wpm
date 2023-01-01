import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Account = () => {
    const handleAccountIconClick = () => {

    }
  return (
    <div>
        <AccountCircleIcon sx={{cursor:'pointer'}} onClick={handleAccountIconClick} />
    </div>
  )
}

export default Account