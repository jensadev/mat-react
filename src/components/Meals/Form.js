function Mform(props) {
  const handleChange = (e) => {
    props.onMealChange(e.target.value);
  };
  console.log('Mform: ' + props.meal);
  return <input value={props.meal} onChange={handleChange} />;
}

export default Mform;
