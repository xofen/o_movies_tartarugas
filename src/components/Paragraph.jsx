import PropTypes from "prop-types";

function Paragraph(props) {
  return (
    <p
      style={{
        color: props.cor,
        fontSize: props.tamanho,
        fontWeight: "bold",
      }}
    >
      {props.children}
    </p>
  );
}

Paragraph.propTypes = {
  children: PropTypes.any,
  tamanho: PropTypes.string,
  cor: PropTypes.string,
};

export default Paragraph;
