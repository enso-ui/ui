import styled from 'vue-styled-components';

const styleProps = {
    isRTL: Boolean,
};

const SBookmarks = styled('div', styleProps)`
  .bookmarks {
    position: fixed;
    top: 52px;
    width: 100vw;
    display: flex;
    padding: 0.2em;
    box-shadow: 0 1px 1px rgba(10, 10, 10, 0.2);
    // margin-left: 0;
    ${props => (props.isRTL ? 'margin-right' : 'margin-left')}: 0;
    // transition: margin-left .5s, width .5s;
    transition: ${props => (props.isRTL ? 'margin-right' : 'margin-left')} .5s, width .5s;
    z-index: 2;
  }
  .bookmarks.with-menu {
    // margin-left: 180px;
    ${props => (props.isRTL ? 'margin-right' : 'margin-left')}: 180px;
    width: calc(100vw - 180px);
  }
  .bookmarks.with-menu.menu-collapsed {
    // margin-left: 56px;
    ${props => (props.isRTL ? 'margin-right' : 'margin-left')}: 56px;
    width: calc(100vw - 56px);
  }
  .bookmarks a.tag:hover {
    text-decoration: none;
  }
  .bookmarks .tag.check {
    // margin-left: 0.1em;
    ${props => (props.isRTL ? 'margin-right' : 'margin-left')}: 0.1em;
  }
  .bookmarks .bookmark-items {
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
  }
  .bookmarks .bookmark-items .control:not(:last-child) {
    // margin-right: .25em;
    ${props => (props.isRTL ? 'margin-left' : 'margin-right')}: .25em;
  }
`;

export default SBookmarks;
