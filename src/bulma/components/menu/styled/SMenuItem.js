import styled from 'vue-styled-components';

const styleProps = {
    isRTL: Boolean,
};

const SDefault = styled('div', styleProps)`
.menu-item {
  display: flex;
}
.menu-item:hover > div.dropdown-content {
  display: block;
}
.menu-item .menu-hiding-label {
  white-space: nowrap;
}
.menu-item .dropdown-content {
  display: none;
  white-space: nowrap;
  padding-bottom: 0;
  padding-top: 0;
  margin-top: -9px;
  position: fixed;
//   left: 56px;
  ${props => (props.isRTL ? 'right' : 'left')}: 56px;
}
.menu-item .icon.angle.is-small {
//   margin-left: auto;
  ${props => (props.isRTL ? 'margin-right' : 'margin-left')}: auto;
}
`;

export default SDefault;