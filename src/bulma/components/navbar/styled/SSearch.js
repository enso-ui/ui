import styled from 'vue-styled-components';

const styleProps = {
    isRTL: Boolean,
};

const SSearch = styled('div', styleProps)`
  .navbar-item.search {
    position: absolute;
  }
  @media screen and (min-width: 1024px) {
    .navbar-item.search {
      width: 34em;
    ${props => (props.isRTL ? 'right' : 'left')}: calc(50% - 17em);
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    .navbar-item.search {
      width: 24em;
    ${props => (props.isRTL ? 'right' : 'left')}: calc(50% - 13em);
    }
  }
  @media screen and (max-width: 767px) {
    .navbar-item.search {
      width: 22em;
    ${props => (props.isRTL ? 'right' : 'left')}: calc(50% - 11em);
    }
  }
  .navbar-item.search .tag {
    padding: 0.5em;
    height: 1.6em;
    opacity: .7;
    -webkit-box-shadow: 0 1px 1px rgba(10, 10, 10, 0.2);
    box-shadow: 0 1px 1px rgba(10, 10, 10, 0.2);
  }
  .navbar-item.search .tag.control-list:hover {
    text-decoration: none;
  }
  .navbar-item.search .tag.control-list:not(:first-child) {
    ${props => (props.isRTL ? 'margin-right' : 'margin-left')}: .5em;
  }
  .navbar-item.search .route-controls {
    position: absolute;
    ${props => (props.isRTL ? 'left' : 'right')}: 1em;
    margin-top: .15em;
  }
  .navbar-item.search .route-controls .route-control {
    z-index: 4;
    opacity: 0.8;
    cursor: pointer;
    ${props => (props.isRTL ? 'margin-left' : 'margin-right')}: 0.2em;
  }
  .navbar-item.search .route-controls .route-control:hover {
    opacity: 1;
  }
`;

export default SSearch;