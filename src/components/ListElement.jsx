import React, {useContext} from 'react';

const ListElement = ({itemTitle, number, children, onClick}) => {

    let className = "list-group-item ";
    if (onClick !== undefined) {
        className += "list-group-item-action";
    }

    return (
        <div onClick={onClick} className={className}>
            <div className="container-fluid">
                <div className="row">
                    {number && <div className="col-1 text-start">{number}</div>}
                    <div className="col-3 text-start">
                        <a>{itemTitle}</a>
                    </div>
                    <div className="col text-end">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListElement;