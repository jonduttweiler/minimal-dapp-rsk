const StringifiedObject = ({ object }) => {
  if (!object) {
    return null;
  }

  const stringified = JSON.stringify(object, 3, null)
    .replaceAll('\\"', '"')
    .replaceAll(",", ",\n")
    .replaceAll("{", "{\n")
    .replaceAll('\n"', '\n "')
    ;
  

  return <pre>{stringified}</pre>;
};

export default StringifiedObject;
