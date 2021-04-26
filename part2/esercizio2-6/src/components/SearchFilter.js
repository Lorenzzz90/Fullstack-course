import React from 'react'

const SearchFilter = ( {filter, handler }) => {

    return (
        <div>
            filter shown with<input
            value={filter}
            onChange={handler}
            />
        </div>
    )
}

export default SearchFilter