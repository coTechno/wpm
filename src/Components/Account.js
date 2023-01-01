import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
function Account() {
    const handleAccountIconClick = () => {

    }
  return (
    <div>
        <AccountCircleIcon sx={{cursor:'pointer'}} onClick={handleAccountIconClick} />
    </div>
  )
}

export default Account