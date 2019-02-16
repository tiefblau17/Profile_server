import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/spinner';
import { Link } from "react-router-dom"

class Dashboard extends Component {

  componentWillMount(){
    this.props.getCurrentProfile();
  }

  render() {

    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile.profile;

    let dashboardContent;

    if(profile === null || loading){
      dashboardContent = <Spinner />;
    }
    else{
      if(Object.keys(profile).length > 0){
        dashboardContent = <h4>display</h4>
      }
      else{
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome { user.name }</p>
            <p>You have not setup a profile, get started now!</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
          </div>
        )
      }

    }


    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.protoTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);