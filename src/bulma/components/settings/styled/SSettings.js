import styled from 'vue-styled-components';

const styleProps = {
    isRTL: Boolean,
};

const SSettings = styled('div', styleProps)`
.settings-wrapper {
    ${props => (props.isRTL ? 'left' : 'right')}: 0;
    overflow-y: auto;
  }
  .settings-wrapper .settings-item .level-item {
    padding: 6px;
    ${props => (props.isRTL ? 'margin-left' : 'margin-right')}: unset;
  }
`;

export default SSettings;
