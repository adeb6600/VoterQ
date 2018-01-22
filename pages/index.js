import React from 'react';
import style from '../styles/style.scss';

const Index = () => (
  <div>
    <style dangerouslySetInnerHTML={{ __html: style }} />

    <div className="container">
      <div className="notification is-success">
        Hello world!
      </div>
    </div>
  </div>
);

export default Index;

