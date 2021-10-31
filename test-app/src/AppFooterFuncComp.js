import React, {Fragment} from 'react';
import './AppFooter.css';

export default function AppFooterFuncComp(props) {
    const currentYear = new Date().getFullYear();
    return (
        <Fragment>
            <hr />
            <p className="footer">Copyright &copy; {currentYear} {props.companyName}</p>
        </Fragment>
    );
}