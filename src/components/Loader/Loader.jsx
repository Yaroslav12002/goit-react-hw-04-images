import { RotatingLoader, Container } from './Loader.styled';

const Loader = () => {
  return (
    <Container>
      <RotatingLoader
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </Container>
  );
};

export default Loader;
