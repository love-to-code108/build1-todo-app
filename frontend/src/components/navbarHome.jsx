import {NavLink} from "react-router-dom"

const NavbarHomePage = () => {




    return(
        <div>

            {/* calander */}
            <NavLink>Calander</NavLink>

            {/* Inbox */}
            <NavLink>Inbox</NavLink>

            {/* Guest */}
            <NavLink>Guest</NavLink>        

            {/* Vehicle Status */}
            <NavLink>Vehicle Status</NavLink>


        </div>
    );
}


export default NavbarHomePage