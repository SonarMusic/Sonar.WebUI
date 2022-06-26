import React from 'react';

const ItemsList = ({items, title, elementsFactory}) => {
    return (
        <div className="list-group list-group-flush p-1 border">
            {title &&
                <div className="list-group-item">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-1 text-start">№</div>
                            <div className="col-3 text-start">{title}</div>
                        </div>
                    </div>
                </div>
            }
            {items.map((i, num) => elementsFactory(i, num + 1))}
        </div>
    );
};

export default ItemsList;