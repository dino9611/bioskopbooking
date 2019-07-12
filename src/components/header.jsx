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
import {Link,Redirect} from 'react-router-dom'
import {onLogout} from './../redux/actions/auth'

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      Redirect:false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  onBtnLogoutClick=()=>{
    this.props.onLogout()
    localStorage.removeItem('terserah')
    this.setState({Redirect:true})
  }
  render() {
    return (
      <div>
        <Navbar className='latar putih' color='' light expand="md" >
          <NavbarBrand className='putih logo'><Link to='/' className='putih logo' style={{textDecoration:'none'}}><FontAwesomeIcon icon={faCouch} className='mr-1'/>{this.props.user.admin===true?'SeatforYou admin':'Seatforyou'}</Link></NavbarBrand>
          <NavbarToggler onClick={this.toggle} color='white' className='putih' />
          <Collapse isOpen={this.state.isOpen} className='putih' navbar>
            <Nav className="ml-auto putih" navbar>
            {
              this.props.user.role!=='user'?null:
                <NavItem>
                <NavLink><Link className='putih' style={{textDecoration:'none'}} to='/history'>History</Link> </NavLink> 
              </NavItem>
            }
              {
                this.props.user.role==='admin' ? <NavItem >
                <NavLink><Link className='putih' style={{textDecoration:'none'}} to='/manage'>Manage</Link></NavLink>
              </NavItem>
              :     
              this.props.user.role!=='user'?null:<NavItem >
                
                <NavLink><Link className='putih' style={{textDecoration:'none'}} to='/cart'>Cart {this.props.user.cart.length} </Link></NavLink>
              </NavItem>
            }
        
              <NavItem>
              {this.props.user.username===''?
                 <NavLink className=' '><Link to='/register'style={{textDecoration:'none'}} className=' text-center text-white'><div className="header-login register rounded">Join Now</div></Link> </NavLink>
                :null }
              </NavItem>
              <NavItem>
              {this.props.user.username===''?
                 <NavLink className=' '><Link to='/login'style={{textDecoration:'none'}} className='  text-center text-white'><div className="header-login rounded-pill">Login</div></Link> </NavLink>
                :null }
              </NavItem>
              <UncontrolledDropdown nav>
                <DropdownToggle className='putih' nav>
                {this.props.user.username===''?null: <NavLink className='text-white user p-0'><FontAwesomeIcon icon={faUser} className=''/> {this.props.user.username}</NavLink> } 
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                  <Link to='/gantipass'style={{textDecoration:'none'}} className='  text-center text-dark'>Settings</Link>
                  </DropdownItem>
                  <DropdownItem>
                     Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.onBtnLogoutClick}>
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
export default connect(mapStateToProps,{onLogout})(Header);