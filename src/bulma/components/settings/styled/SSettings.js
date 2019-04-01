import styled from 'vue-styled-components';

const styleProps = {
    isRTL: Boolean,
};

const SSettings = styled('div', styleProps)`
.settings-wrapper {
    // right: 0;
    ${props => (props.isRTL ? 'left' : 'right')}: 0;
    overflow-y: auto;
  }
  .settings-wrapper .settings-item .level-item {
    padding: 6px;
    // margin-right: unset;
    ${props => (props.isRTL ? 'margin-left' : 'margin-right')}: unset;
  }
`;

export default SSettings;
