import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCouch,faUser} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'


class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar className='latar' color light expand="md">
          <NavbarBrand className='putih logo' href="/"><FontAwesomeIcon icon={faCouch} className='mr-1'/>SeatforYou</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} className='putih' navbar>
            <Nav className="ml-auto putih" navbar>
              <NavItem >
                <NavLink className='putih' href="/manage">Manage</NavLink>
              </NavItem>
              <NavItem>
              {this.props.user.username===''?
                 <NavLink href='/login'className='text-white ' style={{textDecoration:'none'}}><div className='header-login rounded-pill text-center'>Login</div></NavLink>
                :null }
              </NavItem>
              <UncontrolledDropdown nav>
                <DropdownToggle className='putih' nav>
                {this.props.user.username===''?null: <NavLink className='text-white user p-0'><FontAwesomeIcon icon={faUser} className=''/> {this.props.user.username}</NavLink> } 
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option
                  </DropdownItem>
                  <DropdownItem>
                     Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                     LogOut
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
      user:state.user
  }
}
export default connect(mapStateToProps)(Header);