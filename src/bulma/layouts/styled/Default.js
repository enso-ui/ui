import styled from 'vue-styled-components';

const styleProps = {
    isRTL: Boolean,
};

const SDefault = styled('div', styleProps)`
  .main-content.is-collapsed {
    // margin-left: 56px;
    ${props => (props.isRTL ? 'margin-right' : 'margin-left')}: 56px;
  }
  
  .main-content.is-expanded {
    // margin-left: 180px;
    ${props => (props.isRTL ? 'margin-right' : 'margin-left')}: 180px;
  }
  
  @media screen and (max-width: 1023px) {
    .main-content.is-expanded, .main-content.is-collapsed {
      // margin-left: 0;
      ${props => (props.isRTL ? 'margin-right' : 'margin-left')}: 0;
    }
  }
`;

export default SDefault;
/*
.app-main {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  opacity: 1;
  transition: all .15s ease;
}

.app-main.lights-off {
  opacity: 0;
}

.main-content {
  flex: 1;
  z-index: 1;
  margin-top: 52px;
  transition: margin .5s;
}

.main-content.with-bookmarks {
  margin-top: 82px;
}

.main-content.is-collapsed {
  margin-left: 56px;
}

.main-content.is-expanded {
  margin-left: 180px;
}

@media screen and (max-width: 1023px) {
  .main-content.is-expanded, .main-content.is-collapsed {
    margin-left: 0;
  }
}

.wrapper.page-content {
  padding: 1.2em;
  margin-top: 0;
}

*/