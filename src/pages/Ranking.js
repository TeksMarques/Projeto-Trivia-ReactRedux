import React from 'react';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  render() {
    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Ranking
        </h1>
      </div>
    );
  }
}

export default connect()(Ranking);
