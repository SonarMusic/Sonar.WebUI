import React from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

const NavbarCategory = ({title, children}) => {
    const id = generateUniqueID();
    return (
        <li className="mb-1">
            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse"
                    data-bs-target={`#${id}`} aria-expanded="true">
                {title}
            </button>
            <div className="collapse show" id={id}>
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    {children}
                </ul>
            </div>
        </li>
    );
};

export default NavbarCategory;