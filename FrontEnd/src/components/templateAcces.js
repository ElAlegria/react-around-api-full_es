import { Link } from "react-router-dom";
function AccessTemplate(props) {
  const { title,buttonName,description,onSubmit,access } = props;

  return (
    <>
      <section className="access">
        <h2 className="access__title">
          {title}
        </h2>
       {props.children}
        <button className="access__button"
        onClick={onSubmit}
        >
          {buttonName}
        </button>
        <Link className="access__login" to={access ? '/signIn' : 'signUp'}>
          {description}
        </Link>
      </section>
    </>
  );
}

export default AccessTemplate;
