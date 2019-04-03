import styled from 'vue-styled-components';

const styleProps = {
    isRTL: Boolean,
};

const SNavbar = styled('div', styleProps)`
.navbar {
  z-index: 3;
  -webkit-box-shadow: 0 1px 1px rgba(10, 10, 10, 0.35);
  box-shadow: 0 1px 1px rgba(10, 10, 10, 0.35);
}
.navbar .fa-bars {
  transition: transform .300s;
}
.navbar .fa-bars.rotate {
  transform: rotate(90deg);
}
.navbar .is-pulled-right {
  ${props => (props.isRTL ? 'margin-right' : 'margin-left')}: auto;
}
`;

export default SNavbar;