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
