import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import '../../css/StreamList.css';

import { fetchStreams, pubMedSearchWithHistory } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
    // TODO: encode URIs
    this.props.pubMedSearchWithHistory('ganoderma');
  }

  renderList() {
    const results = Object.values(_.get(this.props, 'summaries.response.result', {}));
    return results.map((summary) => {
      const title = {
        __html: _.get(summary, 'title', 'Title Not Found'),
      };
      const authors = _.get(summary, 'authors', []);
      return (
        <div className="item" key={summary.uid}>
          <i className="large middle aligned" />
          <div className="title">
            <Link 
              dangerouslySetInnerHTML={title}
              to={`/result/${summary.uid}`} 
              className="header" 
            />
          </div>
          <ul className ="authors">
            {authors.map((author, index) => 
              <li className="author" key={index}>{author.name}</li>
            )}
          </ul>
        </div>
      );
    });
  }

  renderLink() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">Create Stream</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Results</h2>
        <div className="ui celled list"> {this.renderList()} </div>
        {this.renderLink()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    streams: Object.values(state.streams),
    summaries: state.searchReducer,
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { fetchStreams, pubMedSearchWithHistory })(StreamList);